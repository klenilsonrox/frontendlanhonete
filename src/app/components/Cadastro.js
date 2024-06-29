'use client'
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { baseUrl } from '../utils/baseUrl';



const Cadastro = () => {

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPass,setConfirmPassword]=useState("")
    const [erro,setErro]=useState(false)
    const [loading,setLoading]= useState(false)
    const refMessage = useRef()

    async function cadastrarUser(e){
        e.preventDefault()
        clearTimeout(refMessage.current)
    
        if(!username.trim()){
            setErro("O nome é obrigatório")
            refMessage.current = setTimeout(()=>{
                setErro("")
            },1000)
            return
        }

        if(!email.trim()){
            setErro("O email é obrigatório")
            refMessage.current = setTimeout(()=>{
                setErro("")
            },1000)
            return
        }

        if(!password.trim()){
            setErro("A Senha é obrigatório")
            refMessage.current = setTimeout(()=>{
                setErro("")
            },1000)
            return
        }

        if(password.trim() !== confirmPass.trim()){
            setErro("As senhas devem ser iguais")
            refMessage.current = setTimeout(()=>{
                setErro("")
            },1000)
            return
        }

        try {
           
           const response =  await fetch(`${baseUrl}/users` ,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username,email,password})
            })
    
            const dados = await response.json()
            if(dados.status===401){
                setErro(dados.message)
                refMessage.current = setTimeout(()=>{
                    setErro("")
                },1000)
                return
            }

            if(dados.message==="usuário cadastrado com sucesso"){
                alert("usuário cadastrado com sucesso")
                window.location.href="/login"
            }
         
        } catch (error) {
            return error.message
        }
    }

  return (
    <div className='bg-black inset-0 fixed bg-opacity-15 backdrop-blur-sm flex items-center justify-center p-4'>
        {erro && <div className='fixed inset-0 flex items-center justify-center bg-white h-10 border-b border-red-600 anima'>
            <p className='text-red-600 font-bold py-4'>{erro} </p>
        </div>}
        <form className="p-4 lg:p-10 w-full max-w-md mx-auto bg-white rounded-md flex flex-col " onSubmit={cadastrarUser}>
        <img src="/images/logo.png" alt="logo" className='max-w-[150px] mx-auto'/>
        <div className='flex flex-col'>
            <label htmlFor="username">Nome completo</label>
            <input type="text" placeholder='Seu nome completo' value={username} onChange={({target})=>setUsername(target.value)} className='bg-gray-200 p-3 rounded-md outline-none'/>
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Seu email' value={email} onChange={({target})=>setEmail(target.value)} className='bg-gray-200 p-3 rounded-md outline-none'/>
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="password">Confirme sua senha</label>
            <input type="password" placeholder='********' value={password} onChange={({target})=>setPassword(target.value)} className={ `bg-gray-200 p-3 rounded-md outline-none  `}/>
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="senha">Senha</label>
            <input type="password" placeholder='********' value={confirmPass} onChange={({target})=>setConfirmPassword(target.value)} className={ `bg-gray-200 p-3 rounded-md outline-none  `}/>
        </div>
        <button className='mt-6 bg-red-600 rounded-md text-white py-3 mb-6 flex items-center justify-center' disabled={loading}> {loading && <div className='w-6 h-6 rounded-full border-4 border-r-transparent animate-spin'></div> } {!loading && <span>Cadastrar</span>}</button>
        <div className='flex gap-4'>
            <p>Já Possui uma conta ?</p>
            <Link href="/login" className='text-blue-600 underline mb-4'>Faça o Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;