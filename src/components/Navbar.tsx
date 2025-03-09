"use client"
import { AuthContext } from "@/lib/AuthContext"
import { removeCookie } from "@/lib/server"
import { MoonIcon, SunIcon } from "lucide-react"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function Navbar() {
  const { user, loggedIn } = useContext(AuthContext)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode based on user preference
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    setIsDarkMode(prefersDark)

    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="flex justify-between items-center mx-4">
      <h1 className="md:text-3xl text-xl font-bold dark:text-gray-100 text-black">
        <Link href={"/list"}>Task Manager</Link>
      </h1>
      <div className="flex gap-3 items-center">
      <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5 text-black" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      {user ? (
        <div className="flex gap-3 items-center">
          <div className="text-xl text-black dark:text-white">{user}</div>{" "}
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            onClick={async () => {
              await removeCookie()
              window.location.reload()
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link href="/signin">
            <Button variant={"default"}>
              SignIn
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant={"default"}>
              SignUp
            </Button>
          </Link>
        </>
      )}
      </div>
    </div>
  )
}
