'use server'

import { cookies } from "next/headers"
import { baseUrl } from "../utils/baseUrl"

export async function getUser(){
    try {
        const token=cookies().get("token")
        const response = await fetch(`${baseUrl}/perfil`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : `Bearer ${token.value}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}