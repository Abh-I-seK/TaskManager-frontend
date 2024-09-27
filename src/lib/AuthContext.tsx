"use client";
import { createContext, ReactNode, useState, useEffect,useMemo } from "react"
import { getCookie } from "./utils";
export interface AuthContextType {
  user: string
  loggedIn: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: "",
  loggedIn: false,
})


export default function AuthContextProvider({
  children,
}: {
  children: ReactNode
}) {
  
    const [user, setUser] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const token = getCookie("token");
        const fetchUser = async () => {
          try {
            if(!token){
              setLoggedIn(false)
              setUser("");
              return;
            }
            setLoading(true);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check`,{
              next:{tags:["hello"]},
              headers:{
                "Authorization": `Bearer ${token}`
              }
            });
            const data = await response.json();
            setUser(data.username);
            if(response.status === 200){
              setLoggedIn(true)
            }
          } catch (error) {
            console.error("Failed to fetch user session", error);
          } finally {
            setLoading(false);
          }
        }
        fetchUser()
    }, [])
    
    const contextValue = useMemo(()=>({ user, loggedIn }),[user , loggedIn]) 
    // const contextValue = { user, loggedIn };
    return (
        <AuthContext.Provider value={contextValue}>
          {!loading ? children : <div className="size-full flex min-h-screen bg-gradient-to-b from-black to-gray-900 justify-center items-center">
        loading...
      </div>}
        </AuthContext.Provider>
      );
}
