import React from 'react'
import { useLocation } from 'react-router'
import LeftSideNav from './LeftSideNav'
import RightSideNav from './RightSideNav'
import TopNav from './TopNav'
import ChatForm from './ChatForm'
import axios from 'axios'


const ChatFeed = () => {

    let location = useLocation()
    let userHeaders = location.state

     
    return (
<>
<div className='container flex h-screen w-full'>
    <TopNav />
    <div className="flex w-full pt-10">
    <LeftSideNav userHeaders={userHeaders} />
    <div className="w-100 flex-1 p:2 sm:p-6 justify-between flex flex-col">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
         <ChatForm userHeaders={userHeaders}/>

      </div>
    </div>
      <RightSideNav userHeaders={userHeaders}  />
      </div>
   </div>
</div> */}

<RightSideNav userHeaders={userHeaders}/>
</div>
</div>

        {/* <div>
            <LeftSideNav userHeaders={userHeaders}/>
        </div> */}
</>
    )
}

export default ChatFeed
