'use client'

import { baseUrl } from '@/app/utils/baseUrl';
import Link from 'next/link';
import React from 'react';
import Produto from "@/app/components/Produto";



const page =async ({params}) => {


   const id = params.id


   const response = await fetch(`${baseUrl}/products/${params.id}`)
   const produto = await response.json()
    

  return (
    <>
      <Produto  produto={produto}/>
    </>
  );
};

export default page;