import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'
import RightSideNav from './RightSideNav';

const ChatForm = ({ userHeaders }) => {
    let chatRef = useRef(null)
    // console.log(userHeaders)
    const url = 'https://slackapi.avionschool.com'
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([])

    let date,time
    const getMessage = () => {
        axios.get(`${url}/api/v1/messages?receiver_id=${state.ChatInfo.ID}&receiver_class=${state.ChatInfo.receiverClass}`, userHeaders)
            .then((response) => {
                setMessage([])
                if (response.data.errors) return null;
                response.data.data.map((message) => setMessage((messages) => [...messages, message]))
                console.log(message)
                
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        getMessage()
        convTime()
    }, [state])


    const convTime = (time)=>{
        let date = new Date(time)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // if hour '0' should be '12'

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        time = `${hours}:${minutes} ${amPm}`
        // console.log(time)
        return time

    }


    const addMessage = (e) => {
        e.preventDefault()
        axios.post(`${url}/api/v1/messages`, {
            // 'receiver_id': state.ChannelID ,
            'receiver_id': state.ChatInfo.ID,
            'receiver_class': state.ChatInfo.receiverClass,
            'body': chatRef.current.value
        }, userHeaders)
            .then((response) => {
                getMessage()
                // updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                // console.log(userHeaders)
                console.log(response.data)
                chatRef.current.value = ''
            })
            .catch((error) => alert(error))
    }

    
    return (
        <div className="w-100 relative flex-1 p:2 h-screen flex flex-col">
            

            <div class="z-10 absolute top-8 bg-secondary w-full text-white  flex items-center content-center justify-between px-5">          
                {state.ChatInfo.name}
                <RightSideNav userHeaders={userHeaders} />
            </div>

            <form class="absolute bottom-0 w-full bg-secondary z-10">
                <input
                    className="message-input w-5/6"
                    placeholder="Send a message..."
                    type='text'
                    ref={chatRef}
                />
                <button type="submit" className="send-button text-white font-semibold ml-10" onClick={addMessage} >SEND</button>
            </form>
            
            <div className="flex-1 sm:items-center px-5 py-12 overflow-auto h-36 mt-16  z-0 ">
                
                    {!isLoading ?
                        <div> 
                                {message.map((messages) => (
                                date = new Date(messages.created_at),
                                time = convTime(messages.created_at),
                                    <ul className='flex justify-items-start text-left'>
                                        <div >
                                        
                                        <span className='px-1 text-sm'> {messages.sender.uid} </span>
                                        <span className='px-1 text-sm'> {date.toString().slice(4,16)} </span>
                                        <span className='px-1 text-sm'> {time} </span><br/>

                                        <span className={(messages.sender.uid === userHeaders.headers.uid)
                                        ?
                                        'chat_bubble outgoing'
                                        :
                                        'chat_bubble incoming'
                                        }>
                                        {messages.body}</span>
                                        </div>
                                    </ul>
                                ))}
                            
                        </div>
                        :
                        <>
                            <div class="animate-pulse flex space-x-4 py-5">
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">

                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">

                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">

                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="animate-pulse flex space-x-4 py-5">

                                <div class="flex-1 space-y-4 py-1">
                                    <div class="h-4 bg-yellow-400 rounded w-3/4"></div>
                                    <div class="space-y-2">
                                        <div class="h-4 bg-yellow-400 rounded"></div>
                                    </div>
                                </div>
                                <div class="rounded-full bg-yellow-400 h-12 w-12"></div>
                            </div>
                        </>
                    }
                </div>
            </div>
       
    )
}

export default ChatForm