import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'
// import {UserGroupIcon} from '@heroicons/react/solid'
import Modal from './Modal';
import RightSideNav from './RightSideNav';

const ChatForm = ({ userHeaders }) => {
    let chatRef = useRef(null)
    // console.log(userHeaders)
    const url = 'https://slackapi.avionschool.com'
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([])


    const getMessage = () => {
        axios.get(`${url}/api/v1/messages?receiver_id=${state.ChatInfo.ID}&receiver_class=${state.ChatInfo.receiverClass}`, userHeaders)
            .then((response) => {
                setMessage([])
                if (response.data.errors) return null;
                response.data.data.map((message) => setMessage((messages) => [...messages, message]))
                console.log(response)
                
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    

    // //offset to maintain time zone difference
    // const offset = yourDate.getTimezoneOffset();

    // yourDate = new Date(yourDate.getTime() + (offset * 60 * 1000));
    // let modifiedDate = yourDate.toISOString().split('T')[0]+" "+yourDate.toLocaleTimeString()

    // console.log("Date you want --> ",modifiedDate)

    useEffect(() => {
        setIsLoading(true)
        getMessage()
    }, [state])


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
        <div className="w-100 relative flex-1 p:2 h-screen justify-between flex flex-col z-1">

            <div class="absolute top-8 bg-secondary w-full text-white  flex items-center content-center justify-between px-5">
                {/* //{state.ChannelInfo.channelName} */}
                {state.ChatInfo.name}
                {/* <Modal userHeaders={userHeaders} /> */}
                <RightSideNav userHeaders={userHeaders} />

            </div>

            <form class="absolute bottom-0 w-full bg-secondary z-0">
                <input
                    className="message-input w-5/6"
                    placeholder="Send a message..."
                    type='text'
                    ref={chatRef}
                />
                <button type="submit" className="send-button text-white font-semibold ml-10" onClick={addMessage} >SEND</button>
            </form>

            <div className="flex sm:items-center justify-between border-b-2 border-gray-200 max-h-screen">
                <div className='container flex flex-col justify-between sm:px-6'>

                    <div class="py-3"></div>

                    {!isLoading ?
                    // flex flex-col py-12
                        <div className='message-form-container overflow-auto h-screen pt-14'>
                            
                                {message.map((messages) => (
                                   
                                    <ul className={(messages.sender.uid === userHeaders.headers.uid)
                                        ?
                                        'chat_bubble outgoing'
                                        :
                                        'chat_bubble incoming'
                                    }>
                                        <div className='block'>
                                        {/* {messages.created_at} */}
                                        {messages.sender.uid} <br/>
                                        {messages.body}
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
        </div>
    )
}

export default ChatForm