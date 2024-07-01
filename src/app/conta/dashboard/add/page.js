'use client'
import { getToken } from '@/app/actions/GetToken';
import { getUser } from '@/app/actions/GetUser';
import { baseUrl } from '@/app/utils/baseUrl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
    const[name,setName]=useState("")
    const [user,setUser]=useState("")
    const[price,setPrice]=useState("")
    const[description,setDescription]=useState("")
    const[urlImage,setUrlImage]=useState("")
    const [category, setCategory] = useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
      };

      async function buscarUser(){
        const userBuscado = await getUser()
        if(!userBuscado.isAdmin){
            window.location.href="/conta/perfil"
        }
      }

      useEffect(()=>{
        buscarUser()
      },[])


      async function addProduto(e){
        e.preventDefault()
        const token = await getToken()
        try {
            const response = await fetch(`${baseUrl}/products` , {
                next:{
                    revalidate:0
                },
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    "authorization":`Bearer ${token.value}`
                },
                body:JSON.stringify({
                    name,
                    price,
                    description,
                    urlImage,
                    category
                })
            })

            const data = await response.json()
           if(data.message==="Produto cadastrado com sucesso!"){
            setName("")
            setPrice("")
            setDescription("")
            setUrlImage("")
            setDescription("")

            setTimeout(()=>{
                window.location.href="/conta/dashboard"
            },500)
           }

        } catch (error) {
            console.log(error)
        }
      }



  return (
    <div className='h-screen bg-white'>
        <div className="p-4 max-w-7xl flex flex-col mx-auto">
        <h1 className='text-3xl font-bold py-4 text-gray-700'>Adicionar produto</h1>
        <form className='w-full max-w-md'>
            <div className='flex flex-col '>
                <label htmlFor="name">Nome</label>
                <input type="text" value={name} onChange={({target})=>setName(target.value)} className='bg-slate-200 py-2 rounded-md mt-1 outline-none pl-2'/>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="price">Preço</label>
                <input type="text" value={price} onChange={({target})=>setPrice(target.value)} className='bg-slate-200 py-2 rounded-md mt-1 outline-none pl-2'/>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="description">Descrição</label>
               <textarea name="description" id="description" value={description} cols="30" rows="3" onChange={({target})=>setDescription(target.value)} className='bg-slate-200 rounded-md p-2 outline-none'></textarea>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="urlImage">Link da imagem</label>
                <input type="text" value={urlImage} onChange={({target})=>setUrlImage(target.value)} className='bg-slate-200 py-2 rounded-md mt-1 outline-none pl-2'/>
            </div>
            <div className='flex flex-col mt-4 items-start'>
      <h1>Selecione uma categoria</h1>
      <select value={category} onChange={handleChange} className='bg-slate-200 p-4 rounded-md'>
        <option value="" disabled className='mt-1'>Selecione</option>
        <option value="sanduiches">Sanduíches</option>
        <option value="bebidas">Bebidas</option>
        <option value="bomboniere">Bomboniere</option>
        <option value="macarroes">Macarrões</option>
        <option value="omeletes">Omeletes</option>
        <option value="porcoes">Porcões</option>
      </select>
    </div>
    <div className='mt-4 flex items-center justify-between'>
        <button className='bg-green-600 text-white px-10 py-3 rounded-md' onClick={addProduto}>Adicionar</button>
        <Link href="/conta/dashboard">← Voltar</Link>
    </div>
        </form>
      </div>
    </div>
  );
};

export default page;