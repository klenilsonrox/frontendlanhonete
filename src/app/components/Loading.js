import React from 'react';

const Loading = () => {
  return (
    <div className='bg-black fixed inset-0 backdrop-blur-sm bg-opacity-15 flex items-center justify-center z-50'>
        <div className='w-8 h-8 rounded-full border-4 border-r-transparent animate-spin border-red-600'>
        </div>
      </div>
  );
};

export default Loading;