'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Login } from '../actions/Login';
import { getToken } from '../actions/GetToken';




const page = () => {
    const [email,setEmail]=useState("")
    const [user,setUser]=useState("")
    const [password,setPassword]=useState("")
    const [erro,setErro]=useState(false)
    const [loading,setLoading]= useState(false)
    const refMessage = useRef()

    async function loginUser(e){
        clearTimeout(refMessage.current)
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Login(email,password)
            setLoading(false)
            if(response.status===401){
                setErro(response.message)
                refMessage.current = setTimeout(()=>{
                    setErro("")
                },1000)
            } if(response.data.user.isAdmin){
                window.location.href="/conta/dashboard"
            }if(!response.data.user.isAdmin){
                window.location.href="/cardapio"
            }
            
         
        } catch (error) {
            return error.message
        }finally{
            setLoading(false)
        }
    }
    async function verificaToken(){ 
        const token = await getToken()
    if(token && !user.isAdmin){
        window.location.href="/cardapio"
    }
    if(token && user.isAdmin){
        window.location.href="/conta/dashboard"
    }
    }
 

 useEffect(()=>{
 
    verificaToken()
 },[])



  return (
    <div className='bg-black inset-0 fixed bg-opacity-15 backdrop-blur-sm flex items-center justify-center p-4'>
        {erro && <div className='fixed inset-0 flex items-center justify-center bg-white h-10 border-b border-red-600 anima top-10'>
            <p className='text-red-600 font-bold py-4'>{erro} 😢</p>
        </div>}
        <form className="p-4 lg:p-10 w-full max-w-md mx-auto bg-white rounded-md flex flex-col " onSubmit={loginUser}>
        <img src="/images/logo.png" alt="logo" className='max-w-[150px] mx-auto'/>
        <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Seu email' value={email} onChange={({target})=>setEmail(target.value)} className='bg-gray-200 p-3 rounded-md outline-none'/>
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="senha">Senha</label>
            <input type="password" placeholder='********' value={password} onChange={({target})=>setPassword(target.value)} className={ `bg-gray-200 p-3 rounded-md outline-none ${!erro ? "":"outline-red-600"} `}/>
        </div>
        <button className='mt-6 bg-red-600 rounded-md text-white py-3 mb-6 flex items-center justify-center' disabled={loading}> {loading && <div className='w-6 h-6 rounded-full border-4 border-r-transparent animate-spin'></div> } {!loading && <span>Entrar</span>}</button>
        <div className='flex gap-4'>
            <p>Não tem uma conta ?</p>
            <Link href="/cadastro" className='text-blue-600 underline mb-4'>Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default page;