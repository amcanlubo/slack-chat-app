import React from 'react'
import { Redirect } from "react-router";
import { useLocation } from 'react-router'
import { useState } from 'react'
import TopNav from './TopNav'
import Sidebar from './Sidebar'
import ChatForm from './ChatForm'




const ChatFeed = () => {

   let location = useLocation()
   let userHeaders = location.state
   
  

   if (!userHeaders) {
      return <Redirect to="/" />
   }


   return (
      <>
         <div className='flex'>
         <Sidebar userHeaders={userHeaders} />
            <div className="flex flex-col w-full">     
               <TopNav userHeaders={userHeaders} />
               <ChatForm userHeaders={userHeaders} />
            </div>
         </div>
      </>
   )
}

export default ChatFeed
