import React from 'react'
import { Redirect } from "react-router";
import { useLocation } from 'react-router'
import TopNav from './TopNav'
import Sidebar from './Sidebar'
import ChatForm from './ChatForm'

const ChatFeed = () => {

   let location = useLocation()
   let userHeaders = location.state

   if (!userHeaders) {
      return <Redirect to="/"/>
   }


   return (
      <>
         <div className='flex h-screen w-full'>
            <TopNav userHeaders={userHeaders}/>
            <Sidebar userHeaders={userHeaders}/>
            <ChatForm userHeaders={userHeaders} />
         </div>
      </>
    )
}

export default ChatFeed
