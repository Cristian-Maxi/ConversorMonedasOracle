import React from 'react'
import { CCircle } from 'react-bootstrap-icons'
import { Github } from 'react-bootstrap-icons'
import { Linkedin } from 'react-bootstrap-icons'

const Footer = () => {
  return (
    <div className='flex justify-center items-center h-[10%] bg-slate-900 bg-opacity-50'>
      <a href="https://www.linkedin.com/in/cristian-gomez-montenegro/" target='_blank'>
        <Linkedin className='text-white text-2xl mt-0.5 mr-7 sm:mr-28 md:text-3xl md:mr-30 xl:mr-60'/>
      </a>
      <CCircle className='text-white text-sm mr-2 mt-0.5'/>
      <p className='text-zinc-100 text-2xl font-bold'>
        Cristian Gomez
      </p>
      <a href="https://github.com/Cristian-Maxi" target='_blank'>
        <Github className='text-white text-2xl mt-0.5 ml-7 sm:ml-20 md:text-3xl md:ml-28 xl:ml-60'/>
      </a>
    </div>
  )
}

export default Footer