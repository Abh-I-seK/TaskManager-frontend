import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPriorityStyles } from "@/lib/utils";
import { Task } from "../page";
export default function ClickDialogContent(props: {task : Task}) {
    const task = props.task
    const priorityStyles = getPriorityStyles(task.priority);
    return(
        <DialogContent className="bg-white dark:bg-black/95 text-gray-900 dark:text-white border-gray-200 dark:border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{task.description.length == 0 ? "No description" : task.description}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border",
                priorityStyles.badge
              )}>
                {task.priority} Priority
              </Badge>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
    )
}