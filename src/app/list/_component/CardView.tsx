"use client"
import { Task } from "../page";
import { statusStyles } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Edit2Icon,
} from "lucide-react"
import { format } from "date-fns"
import DialogContentEdit from "@/components/DialogContentEdit"
import { getPriorityStyles } from "@/lib/utils";


export default function CardView(props:{tasks : Task[],updateTask : (e : FormData, id : string) => void,deleteTask : (id : string) => void}) {
    const UpdateTask = props.updateTask
    const DeleteTask = props.deleteTask
    const tasks = props.tasks
    return(
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-12">
            {tasks.map((task) => (
              <Card key={task._id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span>
                        {task.dueDate ? format(task.dueDate, "PPP") : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant="outline"
                        className={`
                          ${statusStyles(task.status)}}
                        `}
                      >
                        {task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Priority:</span>
                      <Badge
                        variant="outline"
                        className={`
                          ${getPriorityStyles(task.priority).badge}
                        `}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="mt-4 w-full">
                        <Edit2Icon className="mr-2 h-4 w-4" />
                        Edit Task
                      </Button>
                    </DialogTrigger>
                    <DialogContentEdit
                      task={task}
                      UpdateTask={UpdateTask}
                      DeleteTask={DeleteTask}
                    />
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
    )
}