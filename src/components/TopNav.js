import React from 'react'
import Logout from './Logout'

const TopNav = ({userHeaders}) => {
    return (
        <div className='container flex content-center items-center justify-between text-white bg-secondary h-10 absolute top-0'>
            <h4>TOP NAV</h4>
            <span><Logout userHeaders={userHeaders} user /></span>
        </div>
    )
}

export default TopNav
