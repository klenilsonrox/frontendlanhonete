'use server'
import { cookies } from "next/headers";
import { baseUrl } from "../utils/baseUrl"

export async function Cadastro(username,email,password){
        try {
            const response = await fetch(`${baseUrl}/users`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username, email,password})
            })
            if (!username) {
                // Se a resposta não for OK, você pode retornar um erro customizado

                return { success: false, message: 'Seu nome é obrigatório', status: response.status };
            }

            if (!email) {
                // Se a resposta não for OK, você pode retornar um erro customizado

                return { success: false, message: 'O email é obrigatório', status: response.status };
            }

            if (!password) {
                // Se a resposta não for OK, você pode retornar um erro customizado

                return { success: false, message: 'A Senha é obrigatória', status: response.status };
            }


            const data = await response.json()

           return data

            cookies().set("token", data.token, {
                httpOnly:true,
                secure:true
            })

         
            return { success: true, data: data ,status:201 };  // Retorna os dados de sucesso
            
        } catch (error) {
            return error.message
        }
    
    }
