import React from 'react'
import { Redirect } from "react-router";
import { useLocation } from 'react-router'
import RightSideNav from './RightSideNav'
import TopNav from './TopNav'
import Sidebar from './Sidebar'
import ChatForm from './ChatForm'

// import axios from 'axios'


const ChatFeed = () => {

   let location = useLocation()
   let userHeaders = location.state

   if (!userHeaders) {
      return <Redirect to="/"/>
   }


   return (
      <>
         <div className='container flex h-screen w-full'>
            <TopNav userHeaders={userHeaders}/>
            <Sidebar userHeaders={userHeaders}/>
            <ChatForm userHeaders={userHeaders} />
            {/* <RightSideNav userHeaders={userHeaders} /> */}
         </div>
      </>
    )
}

export default ChatFeed
