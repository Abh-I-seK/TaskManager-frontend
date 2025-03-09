"use client"
import { useState, useEffect } from "react"
import { getCookie } from "@/lib/utils"
import axios from "axios"
import { useForm } from "react-hook-form"
import Navbar from "@/components/Navbar"
import AddTask from "@/components/AddTask"
import { Button } from "@/components/ui/button"
import {
  FilterIcon,
  LayoutGridIcon,
  ListIcon,
  SquareKanban,
} from "lucide-react"
import CardView from "./_component/CardView"
import ListView from "./_component/ListView"
import Link from "next/link"
import LoadingScreen from "@/components/LoadingScreen"

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "Todo" | "InProgress" | "Completed";
  priority: string;
  dueDate: string;
}
const statusPriority = {
  Todo: 1,
  InProgress: 2,
  Completed: 3,
}

const priorityPriority = {
  Low: 1,
  Medium: 2,
  High: 3,
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState("list")
  // function StatusSort(a1: Task[]) {
  //   a1.sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
  //   return tasks
  // }

  // function PrioritySort(a1: Task[]) {
  //   a1.sort(
  //     (a, b) => priorityPriority[a.priority] - priorityPriority[b.priority]
  //   )
  //   return tasks
  // }

  useEffect(() => {
    const fetchNotes = async () => {
      const token = getCookie("token")
      if (!token) {
        setError("Authentication token missing ");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()
        setTasks(data.notes)
      } catch (error) {
        console.error("Failed to fetch notes", error)
      }
    }
    fetchNotes()
  }, [])

  const form = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
    },
  })

  const UpdateTask = async (e: FormData, id: string) => {
    const data = {
      title: e.get("title"),
      description: e.get("description"),
      status: e.get("status"),
      priority: e.get("priority"),
      dueDate: e.get("dueDate"),
    }
    const task = { ...data }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`,
        {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      setTasks(response.data.notes)
    } catch (e: any) {
      alert(e.response.data.msg)
    }
    form.reset()
  }

  const DeleteTask = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      setTasks(response.data.notes)
    } catch (e: any) {
      alert(e.response.data.msg)
    }
  }


  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400 text-xl">Error: {error + " " }{"👉"} <Link href={"/"} className="underline">click me</Link></div>
      </div>
    )
  }

  if (!tasks){
    return (
      <LoadingScreen/>
    )
  }


  return (
    <div className="min-h-screen bg-background text-foreground md:px-8">
      <nav className="p-6">
        <Navbar />
      </nav>
      <main className="container mx-auto">
        <div className="flex items-center justify-between mx-12">
          {/* <h1 className="text-2xl font-bold">My Tasks</h1> */}
          <h1></h1>
          <div className="flex items-center gap-2">
            <AddTask setTasks={setTasks} />
            <div className="flex items-center rounded-md border bg-background p-1">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setView("list")}
              >
                <ListIcon className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setView("grid")}
              >
                <LayoutGridIcon className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Link href={"/kanban"} target="_blank">
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <SquareKanban className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
              </Link>
            </div>
            <Button variant="outline" size="icon" disabled={true}>
              <FilterIcon className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        {view === "list" ? (
          <ListView
            tasks={tasks}
            updateTask={UpdateTask}
            deleteTask={DeleteTask}
          />
        ) : (
          <CardView
            tasks={tasks}
            updateTask={UpdateTask}
            deleteTask={DeleteTask}
          />
        )}
      </main>
    </div>
  )
}
