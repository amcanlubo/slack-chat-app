import React from 'react'
import { useLocation } from 'react-router'
import LeftSideNav from './LeftSideNav'


const ChatFeed = () => {

    let location = useLocation()
    let userHeaders = location.state

    return (
        <div>
            <LeftSideNav userHeaders={userHeaders}/>
        </div>
    )
}

export default ChatFeed
