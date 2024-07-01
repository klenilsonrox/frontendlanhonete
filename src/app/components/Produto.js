'use client'
import Link from 'next/link';
import React from 'react';
import { MdDirectionsBike } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";


import { IoIosArrowBack } from "react-icons/io";
const Produto = ({produto}) => {
  return (
    <div className="lg:p-4  inset-0 bg-white flex items-start justify-center z-50 overflow-y-scroll min-h-screen">

<div className='max-w-7xl w-full mx-auto gap-4 flex flex-col lg:flex-row relative mt-10'>
<div className='relative'>
   <Link href={`/cardapio`} className='absolute bg-white rounded-full top-4 left-4 p-2'>< IoIosArrowBack className='text-2xl'/></Link>
<img src={produto.urlImage} alt="" className=' lg:rounded-3xl max-w-[500px] w-full'/>
</div>
<div className='border rounded-tl-3xl rounded-tr-3xl w-full lg:rounded-3xl shadow-sm bg-white p-6 relative top-[-40px] lg:top-0 flex flex-col'>
    <h1 className='text-xl font-semibold'>{produto.name}</h1>
    <p className='mt-4 text-xl font-semibold'>R$ {Number(produto.price.replace(",",".")).toFixed(2)}</p>
    <div className='rounded-xl border bg-card text-card-foreground shadow-sm mt-6 flex justify-around py-3'>
        <div className='flex flex-col items-end'>
        <p className='text-xs text-gray-500 flex items-center gap-2'>Entrega <MdDirectionsBike /></p>
        <p className='text-xs font-semibold'>R$ 3,00</p>
        </div>
        <div className='flex flex-col items-end'>
        <p className='text-xs text-gray-500 flex items-center gap-2'>Entrega <FaRegClock /></p>
        <p className='text-xs font-semibold'>30 min</p>
        </div>
    </div>
    <p className='mt-6 font-semibold'>Ingredientes</p>
    <p>{produto.description}</p>
    <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white mt-6 bg-red-600 h-10 px-4 py-2 w-full font-semibold'>Adicionar a sacola</button>
</div>
</div>

</div>
  );
};

export default Produto;