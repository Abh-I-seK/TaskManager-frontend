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

export async function getCookie(){
    const token = cookies().get("token");
    return token?.value;
}

export async function removeCookie() {
    try{
        cookies().delete("token");
    }catch(e){
        console.log(e);
    }
}