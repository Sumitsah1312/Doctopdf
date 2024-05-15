import React from 'react'

function Navbar() {
  return (
    <div className='fixed max-w-screen-2xl mt-2 mx-auto container px-6 md:px-40 shadow-lg h-14'>
      <div className='flex justify-between'>
        <h1 className='text-2xl cursor-pointer font-bold '>Word <span className='text-3xl text-green-500'>to</span> PDF</h1>
        <h1 className='text-2xl cursor-pointer font-bold hover:scale-105 duration-300 '>Home</h1>
      </div>
    </div>
  )
}

export default Navbar
