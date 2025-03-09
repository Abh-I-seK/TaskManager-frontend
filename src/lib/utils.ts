import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) return parts.pop()?.split(";").shift()
  return null
}

export const getPriorityStyles = (priority: string) => {
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


export const statusStyles = (a: string) => {
  switch (a) {
    case "Completed":
      return "dark:bg-black dark:text-emerald-300 dark:border-emerald-800 bg-emerald-50 text-emerald-700 border-emerald-200"
    case "InProgress":
      return "dark:bg-black dark:text-amber-300 dark:border-amber-800 bg-amber-50 text-amber-700 border-amber-200"
    case "Todo":
      return "dark:bg-black dark:text-blue-300 dark:border-blue-800 bg-blue-50 text-blue-700 border-blue-200"
  }
}

export const priorityStyles = (a: string) => {
  switch (a) {
    case "High":
      return "dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 bg-rose-50 text-rose-700 border-rose-200"
    case "Medium":
      return "dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 bg-amber-50 text-amber-700 border-amber-200"
    case "Low":
      return "dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800 bg-gray-50 text-gray-700 border-gray-200"
  }
}
