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
const [openMenu,setOpenMenu]=useState(false)

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

  function abrirMenu(){
    setOpenMenu(menu=>!menu)
    console.log("zsx")
  }

  function closeMenu(){
    setOpenMenu(false)
  }


  return (
    <div className='bg-red-600 text-white py-2 relative'>
      <button className='absolute right-4 top-5 border p-1 text-white  lg:hidden z-20 flex items-center gap-2' onClick={abrirMenu}>Menu <span className={`hamb ${openMenu ? "ativo":""}`}></span></button>
        <header className="p-4 max-w-7xl mx-auto flex justify-between items-center flex-col lg:flex-row relative">
            <Link href={`/`} className='text-xl block'>RxBurguer</Link>
            <ul className={`flex items-center  flex-col text-gray-900 bg-white lg:bg-red-600 z-20 lg:text-white lg:flex-row transition-all ${openMenu ? "h-screen":"h-0"} overflow-hidden lg:h-auto absolute w-full top-[60px]  lg:pt-0 lg:w-auto lg:top-0 lg:static`}>
                <li><Link href="/" className='  px-4 py-2 lg:py-0 block' onClick={closeMenu}>inicio</Link></li>
                <li><Link href="/cardapio" className=' px-4 py-2 lg:py-0 block' onClick={closeMenu}>Cardapio</Link></li>
                <li><Link href="/sobre" className=' px-4 py-2 lg:py-0 block' onClick={closeMenu}>Sobre nós</Link></li>
                <li><Link href="/contato" className=' px-4 py-2 lg:py-0 block' onClick={closeMenu}>Contato</Link></li>
                {!user && <li><Link href="/login" className='p-2 block' onClick={closeMenu}>Entrar</Link></li>}
                {user && <li className='my-1  cursor-pointer flex-col flex items-center justify-center z-40' onClick={openPerfil}><FaUserCircle className='text-3xl ml-2'/>
                {perfilOpen && <div className='lg:absolute top-[55px] font-medium  bg-white text-gray-600 shadow-sm border w-[200px] p-4 mt-2 animaPerfil flex flex-col '>
                  <Link href="/conta/perfil" onClick={closeMenu} className='border-b-transparent hover:border-b hover:border-b-green-600 relative flex items-center gap-3 before:h-2 before:w-2 before:bg-green-600 before:rounded-full before:flex'>ver perfil</Link>
                  {user.isAdmin && <Link href="/conta/dashboard" onClick={closeMenu} className='border-b-transparent hover:border-b hover:border-b-green-600 relative flex items-center gap-3 before:h-2 before:w-2 before:bg-green-600 before:rounded-full before:flex'>Admin</Link>}
                  <li onClick={logout} className='border-b-transparent hover:border-b hover:border-b-red-600 relative flex items-center gap-3 before:h-2 before:w-2 before:bg-red-600 before:rounded-full before:flex'>Sair</li>
                </div>}
                </li>}
                {!user && <li><Link href="/cadastro" className=' bg-red-600 lg:bg-white text-white lg:text-red-600 font-bold rounded-md ml-2 px-6 block py-3 lg:mt-0' >Criar conta</Link></li>}
            </ul>
      </header>
    </div>
  );
};

export default Header;