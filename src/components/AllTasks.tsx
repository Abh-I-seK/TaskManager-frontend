import { getCookie } from "@/lib/utils"
import { useEffect, useState } from "react"
export interface Task {
  title: string
  description: string
  status: status
  priority: priority
  dueDate: Date
}

export enum priority {
  "Low",
  "Medium",
  "High",
}

export enum status {
  "Todo",
  "InProgress",
  "Completed",
}

export default function AllTasks() {
  const [notes, setNotes] = useState<Task[]>([])
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
        setNotes(data.notes)
      } catch (error) {
        console.error("Failed to fetch notes", error)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((task: Task, index: number) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-white">{task.title}</h1>
          <p className="text-gray-300">{task.description}</p>
          <p
            className={`mt-2 text-sm font-semibold px-2 py-1 rounded-full ${
              task.status === status.Completed
                ? "bg-green-500 text-white"
                : task.status === status.InProgress
                ? "bg-yellow-500 text-gray-800"
                : "bg-red-500 text-white"
            }`}
          >
            {task.status}
          </p>
          <p
            className={`mt-2 text-sm font-semibold px-2 py-1 rounded-full ${
              task.priority === priority.High
                ? "bg-red-500 text-white"
                : task.priority === priority.Medium
                ? "bg-yellow-500 text-gray-800"
                : "bg-green-500 text-white"
            }`}
          >
            {task.priority}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
