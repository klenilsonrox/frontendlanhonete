'use client'
import Link from 'next/link';
import React from 'react';
import { FaInstagram,FaFacebook } from "react-icons/fa";

const page = () => {
  return (
    <div className="p-4 w-full mx-auto bg-[#F5F3EF] min-h-screen  flex ">
     
       <div className='max-w-7xl w-full flex items-start justify-between flex-col lg:flex-row mx-auto mt-10'>
        <div className='top-10 animaLeft'>
         <h1 className='text-[50px] lg:text-[100px] font-bold text-red-600 relative before:w-[100px] before:h-[8px] animaBefore before:block before:bg-red-600 before:absolute lg:before:top-4 before:z-0'>RxBurguer</h1>
         <p className='max-w-[600px]'>Na RX Burguer, acreditamos que cada hambúrguer conta uma história. Feitos com ingredientes frescos e de alta qualidade, nossos hambúrgueres são preparados na hora para oferecer a você uma experiência gastronômica única. Desde as combinações clássicas até as criações exclusivas da casa, cada mordida é uma celebração de sabor e paixão. </p>
         <div className='mt-10 flex  items-center gap-4'>
          <Link href={`/cardapio`} className='bg-[#e61919ec] hover:bg-[#e61919] transition-all px-10 py-3 text-white rounded-md uppercase'>Cardápio</Link>
          <Link href={`https://www.instagram.com`} target='_blank'><FaInstagram className='text-4xl hover:scale-105 transition-all text-[#E24142]'/></Link>
          <Link href={`https://www.facebook.com`} target='_blank'><FaFacebook className='text-4xl hover:scale-105 transition-all text-[#1974EC]'/ ></Link>
         </div>
        </div>
       <img src="./images/hamb.webp" alt="logo" className='w-full max-w-[500px] animaRight'/>
       </div>
    </div>
  );
};

export default page;