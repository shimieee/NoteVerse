import React from 'react'
import Navbar from '../components/navbar'


const dashboard = () => {
  return (
    <div>
    <Navbar />
        <div className="container mx-auto flex-grow">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to your dashboard!</p>
        </div>
    </div>
  )
}

export default dashboard