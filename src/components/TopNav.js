import React from 'react'
import Logout from './Logout'
import Modal from './Modal'

const TopNav = ({userHeaders}) => {
    return (
        <div className='z-50 w-screen justify-end flex px-5 text-white bg-yellow-400 h-6 absolute top-0 content-center items-center '>
            <div className='flex justify-around content-center items-center'>
                <Modal userHeaders={userHeaders} />
                <span className='pr-5 pl-1 text-sm'>{userHeaders.headers.uid}</span>
            </div>       
            <Logout userHeaders={userHeaders}  />
        </div>
    )
}

export default TopNav
