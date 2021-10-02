import React from 'react'
import Logout from './Logout'

const TopNav = ({userHeaders}) => {
    return (
        <div className='z-2 container flex text-yellow bg-black h-8 absolute top-0 content-center items-center justify-between '>
            <h4>TOP NAV</h4>
            <span className='text-primary'>{userHeaders.headers.uid}</span>
            <span><Logout userHeaders={userHeaders} user /></span>
        </div>
    )
}

export default TopNav
