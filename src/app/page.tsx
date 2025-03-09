"use client"
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const { user, loggedIn } = useContext(AuthContext);


  return (
    <div className={`min-h-screen dark:bg-black dark:text-white bg-white text-black -z-20`}> 
      <nav className="p-4 border-b border-gray-800 bg-opacity-80 backdrop-blur-lg">
        <Navbar />
      </nav>
      <main className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <header className="mb-12 max-w-3xl">
          <h1 className="text-5xl text-black font-extrabold tracking-tight dark:text-white">
            TaskMaster: Organize Your Work
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-6">
            Plan, track, and complete your tasks with ease.
          </p>
          {user ? (
            <div className="bg-gray-200 dark:bg-gray-900 bg-opacity-50 rounded-xl p-6 mt-6 shadow-lg">
              <p className="text-2xl font-semibold mb-2">Welcome back, <span className="text-blue-600 dark:text-blue-400">{user}</span>!</p>
              <p className="text-gray-600 dark:text-gray-300">Ready to tackle your <u><Link href={"/list"} className="text-blue-600 dark:text-blue-400 hover:underline">tasks</Link></u>?</p>
            </div>
          ) : (
            <Button variant={"ghost"} className="mt-4 border border-gray-500">
              <Link href="/signin" className="text-black dark:text-white font-bold">Get Started</Link>
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </header>

        <section className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mt-2">
          <div className="p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-3">📌 Organize</h3>
            <p className="text-gray-700 dark:text-gray-400">Categorize and prioritize tasks for maximum efficiency.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-3">🤝 Collaborate</h3>
            <p className="text-gray-700 dark:text-gray-400">Share tasks and projects with your team seamlessly.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-3">🎯 Achieve</h3>
            <p className="text-gray-700 dark:text-gray-400">Track your progress and celebrate accomplishments.</p>
          </div>
        </section>
      </main>

    </div>
  );
}