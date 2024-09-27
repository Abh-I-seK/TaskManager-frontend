"use client"
import React, { useEffect, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { getCookie } from "@/lib/utils"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import AddTask from "@/components/AddTask"
import Link from "next/link"
import { Task } from "../list/page"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import DialogContentEdit from "@/components/DialogContentKanban"


const TaskCard: React.FC<{
  task: Task
  moveTask: (_id: string, status: "Todo" | "InProgress" | "Completed") => void
}> = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const dragRef = (element: HTMLDivElement | null) => {
    drag(element)
  }
  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-4 bg-[#171717] border-[#07070758] rounded-md cursor-pointer">
        <Dialog>
          <DialogTrigger asChild>
        <CardContent className="p-4">          
          <h3 className="text-lg text-gray-100 mb-2">
            {task.title}
          </h3>
          <Badge className={cn(
              "px-2 py-1 rounded-full text-xs font-semibold",
              task.priority === "Low" && "bg-gray-800 text-gray-300 border border-gray-300",
              task.priority === "Medium" && "bg-orange-900 text-orange-300 border border-orange-300",
              task.priority === "High" && "bg-red-900 text-red-300 border border-red-300"
            )}>
            {task.priority}
          </Badge>
        </CardContent>
        </DialogTrigger>
        <DialogContentEdit task={task}/>
        </Dialog>
      </Card>
    </div>
  )
}

const Column: React.FC<{
  title: string
  tasks: Task[]
  status: "Todo" | "InProgress" | "Completed"
  moveTask: (id: string, status: "Todo" | "InProgress" | "Completed") => void
}> = ({ title, tasks, status, moveTask }) => {
  const [, drop ,] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => moveTask(item.id, status),
  }))
  const dropRef = (element: HTMLDivElement | null) => {
    drop(element)
  }
  return (
    <div ref={dropRef}
      className="bg-gray-950 border-2 border-gray-800 p-4 rounded-lg shadow-lg flex-1 min-h-[500px]"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-200 text-center">{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          moveTask={moveTask}
        />
      ))}
    </div>
  )
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>()

  const token = getCookie("token")

  useEffect(() => {
    async function handlesubmission() {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res) setTasks(res.data.notes)
      return
    }
    handlesubmission()
  }, [])
  const moveTask = async (
    id: string,
    newStatus: "Todo" | "InProgress" | "Completed") => {
    if (!tasks) return

    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    )

    for (let i = 0; i < tasks?.length; i++) {
      if (tasks[i]._id === id) {
        await axios.put(
          process.env.NEXT_PUBLIC_API_URL + "/api/notes/" + id,
          { ...tasks[i], status: newStatus },
          { headers: { Authorization: "Bearer " + token } }
        )
        break
      }
    }
    
  }
  if (!tasks)
    return (
      <div className="size-full flex min-h-screen bg-gradient-to-b from-black to-gray-900 justify-center items-center">
        loading...
      </div>
    )
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-gradient-to-b h-screen from-black to-gray-900 size-full">
      <Navbar/>
      <div className="mb-3 flex justify-between items-center mt-2">
          <AddTask setTasks={setTasks}/>
           <Link href={"/list"} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
             List View   
           </Link>
         </div>
        <div className="flex space-x-6">
          <Column
            title="To Do"
            tasks={tasks.filter((task) => task.status === "Todo")}
            status="Todo"
            moveTask={moveTask}
          />
          <Column
            title="In Progress"
            tasks={tasks.filter((task) => task.status === "InProgress")}
            status="InProgress"
            moveTask={moveTask}
          />
          <Column
            title="Completed"
            tasks={tasks.filter((task) => task.status === "Completed")}
            status="Completed"
            moveTask={moveTask}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default KanbanBoard

