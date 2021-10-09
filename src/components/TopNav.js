import React from 'react'
import Logout from './Logout'


const TopNav = ({userHeaders}) => {
    return (
        <div className='z-30 w-full justify-end flex px-5 text-white bg-yellow-400 h-6 content-center items-center '>
            <div className='flex justify-around content-center items-center'>
                <span className='pr-5 pl-1 text-sm'>{userHeaders.headers.uid}</span>
            </div>       
            <Logout userHeaders={userHeaders}  />
        </div>
    )
}

export default TopNav
