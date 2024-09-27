"use client"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Task } from "@/app/list/page"
import { Trash } from "lucide-react"
import { format } from "date-fns"
import { getCookie } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/router"

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
  } catch (e: any) {
    alert(e.response.data.msg)
  }
  
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
  } catch (e: any) {
    alert(e.response.data.msg)
  }
}

export default function DialogContentEdit({ task }: { task: Task }) {
  // const router = useRouter();
  
  return (
    <DialogContent className="bg-gray-800 text-gray-100">
      <DialogHeader>
        <div className="flex justify-between items-center p-1">
          <DialogTitle>Edit work item</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:bg-red-900/30 transition-colors"
            onClick={() => DeleteTask(task._id)}
          >
            <Trash className="w-4" />
          </Button>
        </div>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          UpdateTask(new FormData(e.currentTarget), task._id);
          window.location.reload();
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task.title}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={task.description}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue={!task.priority ? "Medium" : task.priority}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            defaultValue={
              task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : ""
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Update Task
        </button>
      </form>
    </DialogContent>
  )
}
