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
   const [toggleSidebar, setToggleSidebar] = useState(false)

   const sidebarToggle = () => {
      setToggleSidebar(!toggleSidebar)
   }

   if (!userHeaders) {
      return <Redirect to="/" />
   }


   return (
      <>
         <div className='flex'>
         <Sidebar userHeaders={userHeaders} toggleSidebar={toggleSidebar} sidebarToggle={sidebarToggle}/>
            <div className="flex flex-col h-screen w-full">     
               <TopNav userHeaders={userHeaders} />
               <ChatForm userHeaders={userHeaders} toggleSidebar={toggleSidebar} sidebarToggle={sidebarToggle}/>
            </div>
         </div>
      </>
   )
}

export default ChatFeed
