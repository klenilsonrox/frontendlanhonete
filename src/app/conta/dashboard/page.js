'use client'
import { getToken } from '@/app/actions/GetToken';
import { getUser } from '@/app/actions/GetUser';
import { fetchProdutos } from '@/app/functions/functionsProducts';
import { baseUrl } from '@/app/utils/baseUrl';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const page = () => {
const [user,setuser]=useState("")
const [produtos,setProdutos]= useState([])
const [modalDelete,setOpenModalDelete]=useState(false)
const [loading,setLoading] = useState(false)
const [sucess,setSucess]=useState("")
const msgReff = useRef()

async function buscarProdutos(){
  const produtosBUscados = await fetchProdutos()
  setProdutos(produtosBUscados)
}

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
    buscarProdutos()
   
},[])

async function deletarItem(item){
  clearTimeout(msgReff.current)
  try {
    const token = await getToken()
    setLoading(true)
    const response = await fetch(`${baseUrl}/products/${item._id}` , {
      next:{
        revalidate:1
      },
      method:"DELETE",
      headers:{
        "authorization":`Bearer ${token.value}`
      }
    })

    const data = await response.json()
    if(data.message==="produto deletado com sucesso!"){
      setSucess("produto deletado com sucesso! ✅")
      setOpenModalDelete(false)
      window.location.href="/conta/dashboard"
    }
    msgReff.current = setTimeout(()=>{
      setSucess("")
    },1000)
    setLoading(false)

  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false)
  }
  
}

  return (
    <div className="p-4 max-w-7xl mx-auto ">
      <div className='flex justify-between flex-col lg:flex-row items-center'>
      <h1 className='text-2xl font-bold order-2 lg:order-first text-gray-500'>Produtos cadastrados</h1>
      <button className='py-3 px-8 text-white rounded-md bg-green-600 uppercase my-3'>Adicionar produto</button>
      </div>
      {produtos.map(produto=> (
        <div className='mt-4 border-b  grid grid-cols-4 items-center gap-2 rounded-md bg-gray-200 text-gray-500'>
          <img src={produto.urlImage} alt={`imagem do ${produto.name}`}  className='w-full max-w-[80px]  rounded-md flex-1'/>
          <div>
            <p>{produto.name}</p>
            <p className='font-medium'>R$ {Number(produto.price.replace(",",".")).toFixed(2)}</p>
          </div>
          <p className='text-truncate-2-line max-w-[200px] truncate lg:w-full flex-1 hidden lg:flex'>{produto.description}</p>
          <div className='flex items-center gap-2'>
          <FaEdit className='text-2xl cursor-pointer block text-green-600'/>
          <MdDelete className='text-2xl cursor-pointer text-red-600' onClick={()=>setOpenModalDelete(true)}/>
            {/* inicio modal delete */}
{modalDelete && <div className='fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center p-4'>
  <div className='w-full max-w-lg bg-white rounded-md flex flex-col items-center justify-center anima'>
  <p className='py-4 font-medium'>tem certeza que deseja deletar o item ?</p>
  <div className='flex gap-4 py-4 items-center'>
    <button className='bg-red-600 text-white px-8 py-2 rounded-md' disabled={loading} onClick={()=>deletarItem(produto)}>
      deletar
    </button>
    <button onClick={()=>setOpenModalDelete(false)}>← voltar</button>
  </div>
  </div>
</div>}
{/* final modal delete */}
          </div>
        </div>
      ) )}

{sucess && <div className='flex inset-0 fixed bg-black bg-opacity-10 backdrop-blur-sm items-center justify-center'>
  <p className='bg-white p-4 border-4 border-b-green-600 anima'>{sucess}</p>
</div>}

    </div>
  );
};

export default page;