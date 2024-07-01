'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getToken } from '../actions/GetToken';
import { getUser } from '../actions/GetUser';
import { FaUserCircle } from "react-icons/fa";
import { limparCookie } from '../actions/LimparCookie';
import { IoClose } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";




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
    setOpenMenu(false)
  }

  async function logout(){
    await limparCookie()
   window.location.href="/cardapio"
  }

  function abrirMenu(){
    setOpenMenu(menu=>!menu)

  }

  function closeMenu(){
    setOpenMenu(false)
  }

function closeMenuConfirg(e){
  if(e.target.id==="menu"){
    setPerfilOpen(false)

  }
}

  return (
    <div className='bg-red-600 text-white relative pb-4'>
      {perfilOpen && <div className='bg-black fixed inset-0 w-full backdrop-blur-sm bg-opacity-15 z-50' id='menu' onClick={closeMenuConfirg}>
      <div className='lg:fixed h-screen font-medium  bg-white top-0 right-0 text-gray-600 shadow-sm border w-[250px] p-4 animaModal flex flex-col '>
        <div className='flex justify-between'>
        <p className='font-semibold'>Menu</p>
        <IoClose onClick={()=>setPerfilOpen(false)} className='z-40 text-2xl'/>
        </div>
        <p className='mt-4 text-xl'>{user.username}</p>
        <p className='text-sm text-gray-400'>{user.email}</p>
                  <Link href="/conta/perfil" onClick={closeMenu} className='border-b-transparent hover:border-b py-1  relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><IoIosSettings className='text-2xl'/> Configurações</Link>
                  {user.isAdmin && <Link href="/conta/dashboard" onClick={closeMenu} className='border-b-transparent hover:border-b py-1  relative flex items-center gap-1 hover:bg-red-200 rounded-md hover:text-black'><RiAdminFill className='text-2xl'/> Admin</Link>}
                  <li onClick={logout} className='border-b-transparent hover:bg-red-200 hover:text-black rounded-md relative flex py-1 items-center gap-3    cursor-pointer'><IoLogOut className='text-2xl'/> Sair da conta</li>
                </div>
      </div>}
      <button className='absolute right-4 top-5 border p-1 text-white  lg:hidden z-10 flex items-center gap-2' onClick={abrirMenu}>Menu <span className={`hamb ${openMenu ? "ativo":""}`}></span></button>
        <header className="p-4 max-w-7xl mx-auto flex justify-between items-center flex-col lg:flex-row relative">
            <Link href={`/`} className='text-xl block'>RxBurguer</Link>
            <ul className={`flex items-center z-30 flex-col text-gray-900 bg-white lg:bg-red-600 lg:text-white lg:flex-row transition-all ${openMenu ? "h-screen":"h-0"} overflow-hidden lg:h-auto absolute w-full top-[70px]  lg:pt-0 lg:w-auto lg:top-0 lg:static`}>
                <li><Link href="/" className='  px-4 py-2 lg:py-0 block' onClick={closeMenu}>inicio</Link></li>
                <li><Link href="/cardapio" className=' px-4 py-2 lg:py-0 block' onClick={closeMenu}>Cardapio</Link></li>
                <li><Link href="/sobre" className=' px-4 py-2 lg:py-0 block' onClick={closeMenu}>Sobre nós</Link></li>
                <li><Link href="/contato" className=' px-4 py-2 lg:py-0 block' onClick={closeMenu}>Contato</Link></li>
                {!user && <li><Link href="/-/login" className='p-2 block' onClick={closeMenu}>Entrar</Link></li>}
                {user && <li className='my-1  cursor-pointer flex-col flex items-center justify-center z-40 relative' onClick={openPerfil}><FaUserCircle className='text-3xl ml-2'/>
                
                </li>}
                {!user && <li><Link href="/-/cadastro" className=' bg-red-600 lg:bg-white text-white lg:text-red-600 font-bold rounded-md ml-2 px-6 block py-3 lg:mt-0' >Criar conta</Link></li>}
            </ul>
      </header>
    </div>
  );
};

export default Header;