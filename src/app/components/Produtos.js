import Link from 'next/link';
import React from 'react';


const Produtos = ({produtos}) => {


  return (
   
    <div className="py-4 max-w-7xl w-full grid grid-cols-1 gap-4 lg:grid-cols-2 mx-auto animaLeft mt-2">
      {produtos.map(produto=> (
        <Link href={`/cardapio/${produto._id}`} className='flex gap-4 border-b pb-4'>
            <picture>
                <img src={produto.urlImage} alt={`imagem do ${produto.name}`} className='max-w-[80px] lg:max-w-[120px] rounded-md'/>
            </picture>
        <div className='flex flex-col justify-between'>
        <h1>{produto.name}</h1>
        <p className='text-truncate-2-line leading-5 text-[14px] text-gray-500'>{produto.description}</p>
        <p className='text-gray-500'>R$ {Number(produto.price.replace(",",".")).toFixed(2)}</p>
        </div>
        </Link>
      ) )}
      </div>
   
  );
};

export default Produtos;