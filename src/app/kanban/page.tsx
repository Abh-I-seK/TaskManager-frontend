"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '@/lib/utils';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cn } from '@/lib/utils';
import {  
  CalendarDays, 
} from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import ClickDialogContent from '../list/_component/ClickDialogContent';
import { Task } from '../list/page';
import Link from 'next/link';

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

const TaskCard: React.FC<{
  task: Task;
  moveTask: (id: string, status: "Todo" | "InProgress" | "Completed") => void;
}> = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const priorityStyles = getPriorityStyles(task.priority);
  const dragRef = (element: HTMLDivElement | null) => {
    drag(element)
  }
  return (
    <div 
      ref={dragRef} 
      className={cn(
        "transform transition-all duration-200",
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      )}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className={cn(
            "mb-4 bg-white dark:bg-black/40 border-[0.5px] border-gray-200 dark:border-white/[0.1]",
            "rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
            "transform hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-black/60",
            priorityStyles.card
          )}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {task.title}
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium border",
                  priorityStyles.badge
                )}>
                  {/* <AlertCircle className="w-3 h-3 mr-1" /> */}
                  {task.priority}
                </Badge>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs">
                  <CalendarDays className="w-3 h-3 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <ClickDialogContent task={task}/>
      </Dialog>
    </div>
  );
};

const Column: React.FC<{
  title: string;
  tasks: Task[];
  status: "Todo" | "InProgress" | "Completed";
  moveTask: (id: string, status: "Todo" | "InProgress" | "Completed") => void;
}> = ({ title, tasks, status, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const dropRef = (element: HTMLDivElement | null) => {
    drop(element)
  }
  return (
    <div
      ref={dropRef}
      className={cn(
        "bg-gray-50 dark:bg-black/20 border-[0.5px] border-gray-200 dark:border-white/[0.1]",
        "p-4 rounded-xl shadow-lg flex-1 min-h-[600px]",
        "transition-all duration-300 ease-in-out",
        isOver && "bg-gray-100 dark:bg-black/40 scale-[1.02] border-gray-300 dark:border-white/[0.15]"
      )}
    >
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center py-2 border-b border-gray-200 dark:border-white/[0.1]">
        {title} ({tasks?.length || 0})
      </h2>
      <div className="space-y-3">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} moveTask={moveTask} />
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">No tasks</div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = getCookie("token") as string | undefined;

  useEffect(() => {
    const getTasks = async() => {
      if (!token) {
        setError("Authentication token missing");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (res?.data?.notes) {
          // console.log("API Response:", res.data);
          // console.log("Notes array:", res.data.notes);
          // console.log("Notes array type:", typeof res.data.notes);
          // console.log("Notes array length:", res.data.notes.length);
          
          const notesArray = Array.isArray(res.data.notes) ? res.data.notes : [];
          setTasks(notesArray);
        } else {
          console.warn("No notes found in response:", res.data);
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };
    
    getTasks();
  }, [token]);

  const moveTask = async (
    id: string,
    newStatus: "Todo" | "InProgress" | "Completed"
  ) => {
    if (!tasks || tasks.length === 0) return;

    // const updatedTasks = tasks.map((task) =>
    //   task._id === id ? { ...task, status: newStatus } : task
    // );
    // race condition possible
    // setTasks(updatedTasks);

    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    )

    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      
      if (taskToUpdate && token) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`,
          { ...taskToUpdate, status: newStatus },
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
          }
        );
        
        // console.log("Task updated successfully:", response.data);
        // setTasks(response.data.notes);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400 text-xl">Error: {error + " " }{"👉"} <Link href={"/"} className="underline">click me</Link></div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <div className='p-6'>
          <Navbar/>
        </div>
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Column
              title="To Do"
              tasks={tasks.filter((task) => task.status === "Todo")}
              status="Todo"
              moveTask={moveTask}
            />
            <Column
              title="In Progress"
              tasks={tasks.filter((task) => task.status === "InProgress")}
              status="InProgress"
              moveTask={moveTask}
            />
            <Column
              title="Completed"
              tasks={tasks.filter((task) => task.status === "Completed")}
              status="Completed"
              moveTask={moveTask}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}