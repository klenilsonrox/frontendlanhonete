'use client'
import { getUser } from '@/app/actions/GetUser';
import React, { useEffect, useState } from 'react';

const page = () => {
const [user,setuser]=useState("")



useEffect(()=>{
    async function buscarUser(){
      try {
        const userBuscado = await getUser()
        setuser(userBuscado)

        if(!userBuscado.isAdmin){
            window.location.href="/cardapio"
        }
      } catch (error) {
        console.log(error)
      }
    
    }
    
    buscarUser()
   
},[])



  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1>Dashboard</h1>
    </div>
  );
};

export default page;