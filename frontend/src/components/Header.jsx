import React from 'react';
import { Coin } from 'react-bootstrap-icons';

const Header = () => {
  return (
    <div className='flex justify-center items-center h-[10%] bg-slate-900 bg-opacity-50' >
      <Coin className='text-yellow-200 text-2xl mr-2 mt-0.5' />
      <p className='text-zinc-100 text-2xl font-bold'>Conversor de Monedas</p>
      <Coin className='text-yellow-200 text-2xl ml-2 mt-0.5' />
    </div>
  )
}

export default Header