"use client"
import { useEffect } from "react"


export default function RedirectPage() {
    useEffect(()=>{
        window.location.href = "/list"
    },[])
    return (
        <div className="size-full flex min-h-screen bg-gradient-to-b from-black to-gray-900 justify-center items-center">
        loading...
      </div>
    )
}