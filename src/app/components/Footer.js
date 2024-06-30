import React from 'react';

const ano = new Date().getFullYear()

const Footer = () => {
  return (
    <div className='bg-red-600 flex items-center justify-center py-4'>
        <footer className="p-4 max-w-7xl mx-auto text-white">
      <p>RxBurguer {ano} todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Footer;