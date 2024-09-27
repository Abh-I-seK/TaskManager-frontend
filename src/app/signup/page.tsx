"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function () {
  // const [{ data, isLoading, isError }, doPost] = usePost()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useRouter()

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-black to-gray-900">
      <Card className="mx-auto my-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">SignUp</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={async () => {
                setIsLoading(true)
                try{
                  const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
                    {
                      username: username,
                      password: password,
                    }
                  )
                  navigate.push("/signin")
                }catch(e){
                  console.log(e);
                }finally{
                  setIsLoading(false)
                }
              }}
            >
              Sign Up{isLoading ? "..." : ""}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signin" className="underline">
              login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
