import React from 'react'
import Logout from './Logout'
import Modal from './Modal'

const TopNav = ({userHeaders}) => {
    return (
        <div className='z-50 container justify-between flex px-5 text-white bg-black h-8 absolute top-0 content-center items-center '>
            <Modal userHeaders={userHeaders}  />
            <Logout userHeaders={userHeaders}  />
        </div>
    )
}

export default TopNav
