"use client"
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const { user, loggedIn } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-3">
      <nav className="p-3">
        <Navbar />
      </nav>
      
      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to TaskMaster</h1>
          <p className="text-xl text-gray-300 mb-8">Organize your tasks, boost your productivity</p>
          {loggedIn ? (
            <div className="bg-gray-800 rounded-lg p-6 mb-8 inline-block">
              <p className="text-2xl font-semibold mb-2">Welcome back, <span className="text-blue-400">{user}</span>!</p>
              <p className="text-gray-300">Ready to tackle your <u><Link href={"/list"}>tasks</Link></u>?</p>
            </div>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="/signin">Get Started</Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </header>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Organize</h3>
            <p className="text-gray-300">Easily categorize and prioritize your tasks for maximum efficiency.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Collaborate</h3>
            <p className="text-gray-300">Share tasks and projects with your team for seamless cooperation.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Achieve</h3>
            <p className="text-gray-300">Track your progress and celebrate your accomplishments.</p>
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-gray-400">
        <p>&copy; 2024 TaskManager. All rights reserved.</p>
      </footer>
    </div>
  );
}