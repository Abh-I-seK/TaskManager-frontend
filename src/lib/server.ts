"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function revalidateCache(path : string) {
    try{
        if(path){
            revalidatePath(path);
        }
    }catch(e){
        console.log(e);
    }
}

export async function removeCookie(name : string) {
    try{
        cookies().delete(name);
    }catch(e){
        console.log(e);
    }
}