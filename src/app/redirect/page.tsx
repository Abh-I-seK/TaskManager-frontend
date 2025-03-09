"use client"
import LoadingScreen from "@/components/LoadingScreen"
import { useEffect } from "react"


export default function RedirectPage() {
    useEffect(()=>{
        window.location.href = "/list"
    },[])
    return (
        <LoadingScreen/>
    )
}