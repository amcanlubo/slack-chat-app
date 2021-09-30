import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'

const ChatForm = ({ userHeaders }) => {
    let chatRef = useRef(null)
    // console.log(userHeaders)
    const url = 'https://slackapi.avionschool.com'
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([])


    // useEffect(() => {
    //     axios.get(`${axios.defaults.baseURL}/api/v1/channels/3`, userHeaders, { 'id': state.ChannelID })
    //         .then((response) => {

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // })

    useEffect(()=>{
        setIsLoading(true)
    },[state])


    const getMessage = () => {
        axios.get(`${url}/api/v1/messages?receiver_id=${state.ChannelInfo.channelID}&receiver_class=Channel`, userHeaders)
            .then((response) => {
                setMessage([])
                if (response.data.errors) return null;
                response.data.data.map((message) => setMessage((messages) => [...messages, message]))
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getMessage()
    }, [state])


    const addMessage = (e) => {
        e.preventDefault()
        axios.post(`${url}/api/v1/messages`, {
            // 'receiver_id': state.ChannelID ,
            'receiver_id': state.ChannelInfo.channelID,
            'receiver_class': 'Channel',
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
        <div className="w-100 relative flex-1 p:2 max-h-screen justify-between flex flex-col">
            <div class="absolute top-0 bg-secondary w-full text-white z-50">
                {state.ChannelInfo.channelName}
            </div>
            <form class="absolute bottom-0 w-full bg-secondary z-50">
                        <input
                            className="message-input w-5/6"
                            placeholder="Send a message..."
                            type='text'
                            ref={chatRef}
                        />
                        <button type="submit" className="send-button" onClick={addMessage} >SEND</button>
                    </form>
            <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
                <div className='container flex flex-col justify-between sm:px-6 overflow-auto  max-h-screen'>

                    <div class="py-3"></div>
                    {/* Message Body */}
                    {/* <div className='flex-col bg-primary w-30'>
                            <div className='flex-col w-30'>
                                {message.map((messages) => (
                                    <ul className={(messages.sender.id === 663)
                                        ?
                                        'chat_bubble outgoing'
                                        :
                                        'chat_bubble incoming'
                                    }>
                                        {messages.body}
                                    </ul>
                                ))}
                            </div>
                        </div> */}
                    {!isLoading ?
                        <div className='flex-col bg-primary w-30'>
                            <div className='flex-col w-30'>
                                {message.map((messages) => (
                                    <ul className={(messages.sender.id === 663)
                                        ?
                                        'chat_bubble outgoing'
                                        :
                                        'chat_bubble incoming'
                                    }>
                                        {messages.body}
                                    </ul>
                                ))}
                            </div>
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
