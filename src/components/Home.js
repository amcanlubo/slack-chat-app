import React from 'react'
import DB from './DB'

const Home = () => {
    return (
        <div className='container flex-col text-center bg-primary h-screen pt-10'>
            <h1> WELCOME </h1>   
            <DB />      
        </div>
    )
}

export default Home
