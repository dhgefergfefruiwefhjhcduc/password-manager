import React from 'react'

const Navbar = () => {
  return (
    <div className='pi bg-black h-12 flex justify-between items-center'>
        <div className='oo ml-32 font-bold flex'>
            <p className='text-green-600'>&lt;</p>
            <p className='text-white'>Pass</p>
            <p className='text-green-600'>Op/&gt;</p>
        </div>
        <div className='na mr-32'>
            <ul className='flex gap-5'>
                <a href='/' className=' hover:font-bold text-white'>Home</a>
                <a href='#' className=' hover:font-bold text-white'>About</a>
                <a href="#" className='hover:font-bold text-white'>Contact</a>
            </ul>
        </div>
    </div>
  )
}

export default Navbar