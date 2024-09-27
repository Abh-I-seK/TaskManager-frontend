import axios from "axios"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
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
import { revalidatePath, revalidateTag } from "next/cache"
import { revalidateCache } from "@/lib/server"


async function login(formData: FormData) {
  "use server"

  const username = formData.get("email") as string
  const password = formData.get("password") as string

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      username,
      password,
    }
  )

  if (response.status === 200) {
    cookies().set("token", response.data.token)
    // revalidateCache("/");
    redirect("/")
  } else {
    return { error: "Login failed. Please check your credentials." }
  }
}

export default function LoginPage() {
    
    return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-black to-gray-900">
      <Card className="mx-auto my-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (e) => {
              "use server"
              await login(e)
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
