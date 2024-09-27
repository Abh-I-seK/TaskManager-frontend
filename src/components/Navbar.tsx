"use client"
import { AuthContext } from "@/lib/AuthContext"
import { removeCookie } from "@/lib/server"
import Link from "next/link"
import { useContext } from "react"
import { useRouter } from "next/navigation"
export const dynamic = "force-dynamic";
export default function Navbar() {
  const { user, loggedIn } = useContext(AuthContext)
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-3xl font-bold text-gray-100"><Link href={"/"}>Task Manager</Link></h1>
      {loggedIn ? (
        <p className="flex gap-3 items-center">
          <p className="text-xl">{user}</p>{" "}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-lg text-white px-2 py-1 rounded-md"
            onClick={() => {
              removeCookie("token")
              window.location.reload();
            }}
          >
            Logout
          </button>
        </p>
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
