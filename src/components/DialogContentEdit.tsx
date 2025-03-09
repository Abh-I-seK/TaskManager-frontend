"use client";
import{ 
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Task } from "@/app/list/page";
import { Trash } from "lucide-react";
import { format } from "date-fns";

export default function DialogContentEdit({task,UpdateTask,DeleteTask}:{task : Task, UpdateTask: (formData: FormData, id: string) => void; DeleteTask: (id: string) => void;}) {

    return(
        <DialogContent className="">
        <DialogHeader>
          <div className="flex justify-between items-center p-1">
            <DialogTitle className="text-black dark:text-white">Edit work item</DialogTitle>
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
            UpdateTask(new FormData(e.currentTarget), task._id)
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-black dark:text-white mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={task.title}
              className="w-full px-3 py-2 bg-white dark:bg-black rounded-md text-black dark:text-white border border-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-gray-300 focus:ring-black"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black dark:text-white mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={task.description}
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-black rounded-md text-black dark:text-white border border-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-gray-300 focus:ring-black"
              placeholder="Enter task description"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-black dark:text-white mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={task.status}
              className="w-full px-3 py-2 bg-white dark:bg-black rounded-md text-black dark:text-white border border-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-gray-300 focus:ring-black"
            >
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-black dark:text-white mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue={!task.priority ? "Medium" : task.priority}
              className="w-full px-3 py-2 bg-white dark:bg-black rounded-md text-black dark:text-white border border-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-gray-300 focus:ring-black"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-black dark:text-white mb-1"
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
              className="w-full px-3 py-2 bg-white dark:bg-black rounded-md text-black dark:text-white border border-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-gray-300 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          >
            Update Task
          </button>
        </form>
      </DialogContent>
    )
}