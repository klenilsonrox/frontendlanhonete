'use client'

import { baseUrl } from '@/app/utils/baseUrl';
import Link from 'next/link';
import React from 'react';

const page =async ({params}) => {


   const id = params.id


   const response = await fetch(`${baseUrl}/products/${params.id}`)
   const produto = await response.json()
    

  return (
    <div className="lg:p-4 fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center">
    <div className='w-full max-w-4xl mx-auto flex-col gap-4 lg:flex-row overflow-y-scroll lg:overflow-y-hidden h-screen flex items-start lg:items-center lg:h-[400px] bg-white rounded-md p-2'>
       <img src={produto.urlImage} alt="" className='w-full lg:max-w-[400px] lg:rounded-tl-md lg:rounded-bl-md'/>
       
       <div className='relative flex flex-col  h-[400px] w-full'>
        <div className='border-b py-2 flex justify-between pr-2'>
            <h1 className='font-bold text-xl'>{produto.name}</h1>
            <Link className='pl-4 text-red-600 text-2xl block font-bold' href={`/cardapio`}>X</Link>
        </div>
        <div className='flex-1 h-[380px]  lg:overflow-y-scroll overflow-y-hidden py-2'>
            <p>{produto.description}</p>
        <p className=' font-bold mt-2'>R$ {Number(produto.price.replace(",",".")).toFixed(2)}</p>
        </div>
        <div className='border-t py-2 flex items-center justify-between'>
            <button className='bg-red-600 py-3 px-8 rounded-md text-white'>Adicionar ao carrinho</button>
            <Link href={`/cardapio`} className='text-red-600 font-bold'>← voltar</Link>
        </div>
       </div>

      </div>
    </div>
  );
};

export default page;