import React from 'react'
import { useLocation } from 'react-router'
import RightSideNav from './RightSideNav'
import TopNav from './TopNav'
import Sidebar from './Sidebar'
import ChatForm from './ChatForm'
// import axios from 'axios'


const ChatFeed = () => {

   let location = useLocation()
   let userHeaders = location.state


   return (
      <>
         <div className='container flex h-screen w-full'>
            {/* <TopNav/> */}
            <Sidebar userHeaders={userHeaders}/>
            {/* <div className="flex w-full pt-10">
               <LeftSideNav userHeaders={userHeaders} />*/}
               
                     <ChatForm userHeaders={userHeaders} />
                  {/* <RightSideNav userHeaders={userHeaders} /> */}
         </div>
</>
    )
}

export default ChatFeed
