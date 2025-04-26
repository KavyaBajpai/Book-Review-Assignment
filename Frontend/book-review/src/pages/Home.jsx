import React from 'react'
import bg from '../assets/pexels-eberhardgross-1421903.jpg';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div>
    <div className=" flex flex-col p-5 items-center justify-center">
      <h1 className="text-white mt-48 text-4xl font-bold">Welcome to Voice&Verse</h1>
      <p className='text-gray-300 mt-6 text-xl w-2/3'>Discover honest reviews, heartfelt reflections, and thoughtful insights from fellow readers. Whether you're searching for your next great read or want to share your own thoughts, you're in the right place.</p>
      <div className='flex gap-3 mt-10'>
       <Link to='/login'>
       <div className='bg-gray-700 text-gray-100 text-lg px-5 py-2 rounded-lg cursor-pointer transition duration-500 ease-in-out 
     hover:-translate-z-1 hover:scale-105  hover:bg-gray-400 '>Get Started</div>
       </Link>
       <Link to='/about'>
        <div className='bg-gray-700 text-gray-100 text-lg px-5 py-2 rounded-lg cursor-pointer transition duration-500 ease-in-out 
     hover:-translate-z-1 hover:scale-105  hover:bg-gray-400 '>Learn More</div>
     </Link>
      </div>
    </div>
  </div>
  )
}

export default Home
