"use client"
import { getPriorityStyles, statusStyles } from "@/lib/utils"
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
