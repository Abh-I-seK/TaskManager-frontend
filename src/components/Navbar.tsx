"use client"
import { AuthContext } from "@/lib/AuthContext"
import { removeCookie } from "@/lib/server"
import Link from "next/link"
import { useContext } from "react"

export default function Navbar() {
  const { user, loggedIn } = useContext(AuthContext)
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-3xl font-bold text-gray-100"><Link href={"/"}>Task Manager</Link></h1>
      {user ? (
        <div className="flex gap-3 items-center">
          <div className="text-xl">{user}</div>{" "}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-lg text-white px-2 py-1 rounded-md"
            onClick={async() => {
              await removeCookie()
              window.location.reload()
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/signin">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </Link>
      )}
    </div>
  )
}
