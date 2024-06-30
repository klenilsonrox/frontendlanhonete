import React from 'react';
import Cadastro from '../../components/Cadastro';
import { redirect } from 'next/navigation';
import { getToken } from '@/app/actions/GetToken';

const page =async () => {

   const token = await getToken()

   if(token){
    redirect("/conta/perfil")
   }

  return (
    <div>
      <Cadastro />
    </div>
  );
};

export default page;