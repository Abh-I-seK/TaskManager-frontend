"use client"
import { useState, useEffect } from "react"
import { getCookie } from "@/lib/utils"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react"
import axios from "axios"
import { useForm } from "react-hook-form"
import TaskRow from "./_component/TaskDisplay"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { revalidateCache } from "@/lib/server"
import Navbar from "@/components/Navbar"
import AddTask from "@/components/AddTask"
import Link from "next/link"

export type Task = {
  _id: string
  title: string
  description?: string
  status: "Todo" | "InProgress" | "Completed"
  priority: "Low" | "Medium" | "High"
  dueDate?: Date
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

  function StatusSort(a1: Task[]) {
    a1.sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
    return tasks
  }

  function PrioritySort(a1: Task[]) {
    a1.sort(
      (a, b) => priorityPriority[a.priority] - priorityPriority[b.priority]
    )
    return tasks
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const token = getCookie("token")
      if (!token) {
        return
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
  if (!tasks)
    return (
      <div className="size-full flex min-h-screen bg-gradient-to-b from-black to-gray-900 justify-center items-center">
        loading...
      </div>
    )

  return (
    <div className="h-screen text-gray-100 py-8 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar/>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <AddTask setTasks={setTasks}/>
              <Link href={"/kanban"} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">
                Board View   
              </Link>
            </div>
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-md">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs bg-amber-50 border border-zinc-100 text-black rounded-md">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <p className="flex items-center gap-1">
                              Status
                              <ChevronsUpDown className="w-3" />
                            </p>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setTasks(StatusSort(tasks))
                                revalidateCache("/list")
                              }}
                            >
                              Ascending
                              <ChevronUp className="w-4 ml-2" />
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setTasks(StatusSort(tasks).reverse())
                                revalidateCache("/list")
                              }}
                            >
                              Descending
                              <ChevronDown className="w-4 ml-2" />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <p className="flex gap-1 items-center">
                              Priority
                              <ChevronsUpDown className="w-3" />
                            </p>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setTasks(PrioritySort(tasks))
                                revalidateCache("/list")
                              }}
                            >
                              Ascending
                              <ArrowUp className="w-4 ml-2" />
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setTasks(PrioritySort(tasks).reverse())
                                revalidateCache("/list")
                              }}
                            >
                              Descending
                              <ArrowDown className="w-4 ml-2" />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <TaskRow
                        key={task._id}
                        task={task}
                        UpdateTask={UpdateTask}
                        DeleteTask={DeleteTask}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
