import React from 'react';
import Cadastro from '../components/Cadastro';
import { getToken } from '../actions/GetToken';
import { redirect } from 'next/navigation';

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