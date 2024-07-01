'use client'

import React, { useEffect, useState } from 'react';
import Produtos from '../components/Produtos';
import { fetchProdutos } from '../functions/functionsProducts';



const page =  () => {
const [loading,setLoading]=useState(false)
  const [produtos,setProdutos]=useState([])

  async function buscarProdutos(){
    setLoading(true)
    const prods = await fetchProdutos()
    setProdutos(prods)
    setLoading(false)
  }

  useEffect(()=>{
    buscarProdutos()
  },[])

  return (
    <div className='mt-2 p-4'>
      {loading && <div className='fixed inset-0 bg-white backdrop-blur-sm  flex items-center justify-center'>
        <div className='flex flex-col'>
        <img src="./images/loading.gif" alt="" />
        </div>
      </div>}
      <div className='w-full max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold text-gray-700'>Produtos</h1>
      </div>
<Produtos produtos={produtos}/>
    </div>
  );
};

export default page;