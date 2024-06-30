import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
const Produto = ({produto}) => {
  return (
    <div className="lg:p-4 fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center z-50">

<div className='h-screen relative max-h-[600px] max-w-lg w-full overflow-y-scroll bg-white rounded-lg z-50  flex justify-between flex-col'>
  <Link href={`/cardapio`} className="absolute bg-white p-4  rounded-md top-2 left-2"><IoIosArrowBack className="text-2xl text-red-600"/></Link>
  <div className='flex flex-col'>
    <img src={produto.urlImage} alt="" className='lg:max-w-[300px]' />  
    <div className='flex-1 bg-white p-4 rounded-[60px] z-20 '>
      <div className='flex items-center justify-between flex-1 '>
        <p className='font-bold text-gray-700'>{produto.name}</p>
      <p className='font-bold text-gray-700'>R$ {Number(produto.price.replace(",",".")).toFixed(2)}</p>
      </div>
      <p className='mt-4 text-gray-600'>{produto.description}</p>
    </div>
  </div>
  <div className='py-4 border-t w-full flex justify-between px-4  items-center bottom-0 max-w-lg mx-auto pb-4'>
    <button className='bg-red-600 px-6 p-3 rounded-md  text-white'>Adicionar ao carrinho</button>
    <Link href={`/cardapio`}>← Voltar</Link>
  </div>
</div>

</div>
  );
};

export default Produto;