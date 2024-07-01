'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getToken } from '../actions/GetToken';
import { getUser } from '../actions/GetUser';
import { MdRestaurantMenu } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { limparCookie } from '../actions/LimparCookie';
import { IoClose } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";







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
    setPerfilOpen(false)
  }

function closeMenuConfirg(e){
  if(e.target.id==="menu"){
    setPerfilOpen(false)

  }
}

  return (
    <div className=' text-white relative  bg-red-600'>
      
  
        <header className="p-4 max-w-7xl mx-auto flex justify-between bg-red-600  pb-6 lg:flex-row relative">
            <Link href={`/`} className='text-xl block mt-2'>RxBurguer</Link>
            <button className='absolute right-4 top-5 border p-1 text-white  z-10 flex items-center gap-2' onClick={()=>setPerfilOpen(true)}>Menu <span className={`hamb ${openMenu ? "ativo":""}`}></span></button>
            {perfilOpen && <div className='bg-black fixed inset-0 w-full backdrop-blur-sm bg-opacity-15 z-50' id='menu' onClick={closeMenuConfirg}>
      <div className='lg:fixed h-screen font-medium  bg-white top-0 right-0 text-gray-500 shadow-sm border w-[250px] p-4 animaModal flex flex-col '>
        <div className='flex justify-between'>
        <p className='font-semibold'>Menu</p>
        <IoClose onClick={()=>setPerfilOpen(false)} className='z-40 text-2xl'/>
        </div>
        <p className='mt-4 text-xl'>{user.username}</p>
        <p className='text-sm text-gray-400'>{user.email}</p>
        <ul className='mt-4'>
        <li><Link href={`/`} onClick={closeMenu} className='border-b-transparent hover:border-b py-1 relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><FaHome  className='text-2xl'/> Início</Link></li>
          <li><Link href={`/cardapio`} onClick={closeMenu} className='border-b-transparent hover:border-b py-1 relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><FaInfoCircle className='text-2xl'/> Cardápio</Link></li>
          <li><Link href={`/sobre`} onClick={closeMenu} className='border-b-transparent hover:border-b py-1 relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><MdRestaurantMenu className='text-2xl'/> Sobre nós</Link></li>
          <li><Link href={`/contato`} onClick={closeMenu} className='border-b-transparent hover:border-b py-1 relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><MdContactPhone className='text-2xl'/> Contato</Link></li>
          {!user && <li><Link href={`/-/login`} onClick={closeMenu} className='border-b-transparent hover:border-b py-1 relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><RiLoginBoxFill className='text-2xl'/> Entrar</Link></li>}
          {!user && <li><Link href={`/-/cadastro`} onClick={closeMenu} className='border-b-transparent hover:border-b py-1 relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all text-red-600'><FaCashRegister  className='text-2xl text-red-600'/> Criar conta</Link></li>}
          {user && <li><Link href="/conta/perfil" onClick={closeMenu} className='border-b-transparent hover:border-b py-1  relative flex items-center gap-1 hover:bg-red-200 hover:text-black rounded-md transition-all'><IoIosSettings className='text-2xl'/> Configurações</Link></li>}
          <li> {user.isAdmin && <Link href="/conta/dashboard" onClick={closeMenu} className='border-b-transparent hover:border-b py-1  relative flex items-center gap-1 hover:bg-red-200 rounded-md hover:text-black'><RiAdminFill className='text-2xl'/> Admin</Link>}</li>
           {user && <li onClick={logout} className='border-b-transparent hover:bg-red-200 hover:text-black rounded-md relative flex py-1 items-center gap-3    cursor-pointer'><IoLogOut className='text-2xl'/> Sair da conta</li>}
        </ul>
                  
              
      
                </div>
      </div>}
      </header>
    </div>
  );
};

export default Header;