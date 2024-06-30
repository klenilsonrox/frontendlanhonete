'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getToken } from '../actions/GetToken';
import { getUser } from '../actions/GetUser';
import { FaUserCircle } from "react-icons/fa";
import { limparCookie } from '../actions/LimparCookie';

const Header = () => {
const [token,setToken]= useState("")
const [perfilOpen,setPerfilOpen]=useState(false)
const [user,setUser]=useState("")
  async function buscarToken(){
    const tokenBuscado = await getToken()
    if(tokenBuscado!==undefined){
      setToken(tokenBuscado)
    }
  }

  async function buscarUser(){
    const userBuscado = await getUser()
      setUser(userBuscado)
    
  }

  useEffect(()=>{
    buscarToken()
    buscarUser()
  },[])

  function openPerfil(){
    setPerfilOpen(perfil=>!perfil)
  }

  async function logout(){
    await limparCookie()
   window.location.href="/cardapio"
  }


  return (
    <div className='bg-red-600 text-white py-2'>
        <header className="p-4 max-w-7xl mx-auto flex justify-between items-center relative">
            <h1>logo</h1>
            <ul className='flex items-center  flex-col lg:flex-row'>
                <li><Link href="/" className='p-2'>inicio</Link></li>
                <li><Link href="/cardapio" className='p-2'>Cardapio</Link></li>
                <li><Link href="/sobre" className='p-2'>Sobre nós</Link></li>
                <li><Link href="/contato" className='p-2'>Contato</Link></li>
                {!user && <li><Link href="/login" className='p-2'>Entrar</Link></li>}
                {user && <li className='my-1 relative cursor-pointer flex items-center justify-center' onClick={openPerfil}><FaUserCircle className='text-3xl ml-2'/>
                {perfilOpen && <div className='absolute top-10 font-medium  bg-white right-0 text-gray-600 shadow-sm border w-[200px] p-4 animaPerfil flex flex-col '>
                  <Link href="/conta/perfil" className='border-b-transparent hover:border-b hover:border-b-green-600 relative flex items-center gap-3 before:h-2 before:w-2 before:bg-green-600 before:rounded-full before:flex'>ver perfil</Link>
                  {user.isAdmin && <Link href="/conta/dashboard" className='border-b-transparent hover:border-b hover:border-b-green-600 relative flex items-center gap-3 before:h-2 before:w-2 before:bg-green-600 before:rounded-full before:flex'>Admin</Link>}
                  <li onClick={logout} className='border-b-transparent hover:border-b hover:border-b-red-600 relative flex items-center gap-3 before:h-2 before:w-2 before:bg-red-600 before:rounded-full before:flex'>Sair</li>
                </div>}
                </li>}
                {!user && <li><Link href="/cadastro" className=' bg-white text-red-600 font-bold rounded-md ml-2 px-6 block py-2 mt-2 lg:mt-0' >Criar conta</Link></li>}
            </ul>
      </header>
    </div>
  );
};

export default Header;