'use server'
import { cookies } from "next/headers";
import { baseUrl } from "../utils/baseUrl"

export async function Login(email,password){
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            if (!response.ok) {
                // Se a resposta não for OK, você pode retornar um erro customizado
                console.log("deu erro")
                return { success: false, message: 'Email ou Senha inválidos', status: response.status };
            }

            const data = await response.json()
            cookies().set("token", data.token, {
                httpOnly:true,
                secure:true
            })
            return { success: true, data: data };  // Retorna os dados de sucesso
            
        } catch (error) {
            return error.message
        }
    
    }
