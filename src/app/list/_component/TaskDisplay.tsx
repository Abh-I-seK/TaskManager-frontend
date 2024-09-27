"use client"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Task } from "../page"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import DialogContentEdit from "@/components/DialogContentEdit"

export default function TaskRow({
  task,
  UpdateTask,
  DeleteTask,
}: {
  task: Task
  UpdateTask: (formData: FormData, id: string) => void
  DeleteTask: (id: string) => void
}) {
  return (
    <Dialog>
      <tr
        key={task._id}
        className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
      >
        <DialogTrigger asChild>
          <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-200 underline cursor-pointer">
            {task.title}
          </td>
        </DialogTrigger>
        <td className="px-6 py-4 text-gray-400">
          {task.dueDate ? format(task.dueDate, "PPP") : "N/A"}
        </td>
        <td className="px-6 py-4">
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              task.status === "Todo" && "bg-yellow-900 text-yellow-300 border border-yellow-300",
              task.status === "InProgress" && "bg-blue-900 text-blue-300 border border-blue-300",
              task.status === "Completed" && "bg-green-900 text-green-300 border border-green-300"
            )}
          >
            {task.status}
          </span>
        </td>
        <td className="px-6 py-4 text-semibold">
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              task.priority === "Low" && "bg-gray-800 text-gray-300 border border-gray-300",
              task.priority === "Medium" && "bg-orange-900 text-orange-300 border border-orange-300",
              task.priority === "High" && "bg-red-900 text-red-300 border border-red-300"
            )}
          >
            {task.priority}
          </span>
        </td>
        <td className="px-6 py-4">
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 transition-colors"
            >
              <Edit className="w-4" />
            </Button>
          </DialogTrigger>
          <DialogContentEdit task={task} UpdateTask={UpdateTask} DeleteTask={DeleteTask}/>
        </td>
      </tr>
    </Dialog>
  )
}
