import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "../page";
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