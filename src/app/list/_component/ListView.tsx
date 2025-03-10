"use client"
import { statusStyles } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Edit2Icon } from "lucide-react"
import { format } from "date-fns"
import DialogContentEdit from "@/components/DialogContentEdit"
import { Task } from "../page"
import ClickDialogContent from "./ClickDialogContent"
const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "High":
      return {
        badge: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700",
        card: "border-l-4 border-l-red-700 dark:border-l-red-700"
      };
    case "Medium":
      return {
        badge: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700",
        card: "border-l-4 border-l-amber-700 dark:border-l-amber-700"
      };
    case "Low":
      return {
        badge: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-700",
        card: "border-l-4 border-l-emerald-700 dark:border-l-emerald-700"
      };
    default:
      return {
        badge: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700",
        card: "border-l-4 border-l-gray-700 dark:border-l-gray-700"
      };
  }
};
export default function ListView(props: {
  tasks: Task[]
  updateTask: (e: FormData, id: string) => void
  deleteTask: (id: string) => void
}) {
  const UpdateTask = props.updateTask
  const DeleteTask = props.deleteTask
  const tasks = props.tasks
  return (
    <div className="rounded-lg border bg-card m-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task._id}>
              <Dialog>
                <DialogTrigger asChild className="dark:text-white text-black">
                  <TableCell className="font-medium underline cursor-pointer">
                    {task.title}
                  </TableCell>
                </DialogTrigger>
                <ClickDialogContent task={task}/>
              </Dialog>
              <TableCell>
                {task.dueDate ? format(task.dueDate, "PPP") : "N/A"}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                          ${statusStyles(task.status)}
                        `}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                          ${getPriorityStyles(task.priority).badge}
                        `}
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit2Icon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContentEdit
                    task={task}
                    UpdateTask={UpdateTask}
                    DeleteTask={DeleteTask}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
