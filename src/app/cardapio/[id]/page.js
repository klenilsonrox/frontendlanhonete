'use client'

import { baseUrl } from '@/app/utils/baseUrl';
import Link from 'next/link';
import React from 'react';
import { IoCloseSharp } from "react-icons/io5";


const page =async ({params}) => {


   const id = params.id


   const response = await fetch(`${baseUrl}/products/${params.id}`)
   const produto = await response.json()
    

  return (
    <div className="lg:p-4 fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center z-50">

    <div className='h-screen relative max-w-lg w-full bg-white z-50'>
      <div className='py-4 border-b w-full flex justify-between px-4 fixed max-w-lg'>
        <p className='text-center font-bold text-gray-700'>{produto.name}</p>
        <Link href={`/cardapio`}><IoCloseSharp className='text-3xl text-gray-600'/></Link>
      </div>
      <div className='overflow-y-scroll mt-16'>
        <img src={produto.urlImage} alt="" />
        <div className='p-4'>
          <p className='font-bold text-gray-700'>R$ {Number(produto.price.replace(",",".")).toFixed(2)}</p>
          <p className='mt-4 text-gray-600'>{produto.description}</p>
        </div>
      </div>
      <div className='py-4 border-t w-full flex justify-between px-4 fixed items-center bottom-0 max-w-lg mx-auto'>
        <button className='bg-red-600 px-6 p-3 rounded-md  text-white'>Adicionar ao carrinho</button>
        <Link href={`/cardapio`}>← Voltar</Link>
      </div>
    </div>

    </div>
  );
};

export default page;