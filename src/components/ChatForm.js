import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'
import RightSideNav from './RightSideNav';
import { SendOutlined } from '@ant-design/icons';
import { UserCircleIcon } from '@heroicons/react/solid'
import ScrollToBottom from './ScrollToBottom';
import Select from 'react-select';
import useInterval from './useInterval';

const ChatForm = ({ userHeaders }) => {
    let chatRef = useRef(null)
    let dateRef = useRef(null)
    // console.log(userHeaders)
    const url = 'https://slackapi.avionschool.com'
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([])
    const [users, setUsers] = useState([])
    // const [option,setOption] = useState()
    const [selectedUser, setSelectedUser] = useState()
    let messageRef = useRef([])
    let enableDMUsers = []
    useEffect(() => {
        axios.get(`${axios.defaults.baseURL}/api/v1/users`, userHeaders)
            .then((response) => {
                // console.log(response.data)
                setUsers(response.data?.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    if (!state.ChatInfo.ID && state.ChatInfo.name) {
        state.ChatInfo.name.map((userID) => {
            users.map((user) => {
                if (user.id === userID) {
                    enableDMUsers.push({
                        'value': { 'id': user.id, 'name': user.uid },
                        'label': user.uid
                    })
                }
            })
        })
    }

    let date, time

    const getMessage = (id, receiverClass) => {
        axios.get(`${url}/api/v1/messages?receiver_id=${id}&receiver_class=${receiverClass}`, userHeaders)
            .then((response) => {
                if (messageRef.current.length === 0 || response.data.data[response.data.data.length - 1].id !== messageRef.current[messageRef.current.length - 1].id) {
                    setMessage([])
                    messageRef.current = []
                    if (response.data.errors) return null;
                    response.data.data.map((message) => {
                        messageRef.current.push(message)
                        setMessage((messages) => [...messages, message])
                    })
                }
                setIsLoading(false)


            })
            .catch((error) => {
                console.log(error);
            })
    }
    // let savedCallback = useRef()
    useEffect(() => {
        setIsLoading(true)
        if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
            getMessage(state.ChatInfo.ID, state.ChatInfo.receiverClass)
        }
        else if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
            getMessage(selectedUser.value.id, 'User')
        }

        return setMessage([])
    }, [state, selectedUser])

    useInterval(() => {
        if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
            getMessage(state.ChatInfo.ID, state.ChatInfo.receiverClass)
        }
        else if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
            getMessage(selectedUser.value.id, 'User')
        }
    }, 1000)


    // useEffect(() => {



    //     // const updateMessages = () => {
    //     //     if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
    //     //         getMessage(state.ChatInfo.ID, state.ChatInfo.receiverClass)
    //     //     }
    //     //     else if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
    //     //         getMessage(selectedUser.value.id, 'User')
    //     //     }
    //     // }

    //     // savedCallback.current = updateMessages

    //     // setIsLoading(true)



    //     convTime()
    // }, [state, selectedUser])


    const convTime = (time) => {
        let date = new Date(time)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        time = `${hours}:${minutes} ${amPm}`
        // console.log(time)
        return time

    }


    const addMessage = (e, id) => {
        e.preventDefault()
        axios.post(`${url}/api/v1/messages`, {
            'receiver_id': id,
            'receiver_class': state.ChatInfo.receiverClass,
            'body': chatRef.current.value
        }, userHeaders)
            .then((response) => {
                if (typeof state.ChatInfo.name !== 'object' || state.ChatInfo.ID !== null) {
                    getMessage(state.ChatInfo.ID, state.ChatInfo.receiverClass)
                }
                else {
                    getMessage(selectedUser.value.id, 'User')

                }
                // updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                // console.log(userHeaders)
                chatRef.current.value = ''
            })
            .catch((error) => alert(error))
    }

    const handleChange = (e) => {
        setSelectedUser(e)
        getMessage(e.value.id, 'User')
    }

    let output = []

    return (

        <div className="w-100 relative flex-1 p:2 h-screen flex flex-col">
            <div class="z-10 absolute top-6 bg-yellow-300 w-full text-white flex items-center justify-between">
                {typeof state.ChatInfo.name !== 'object' ? <div className='pl-6 font-bold text-xl'>{state.ChatInfo.name}</div> :
                    <Select
                        className="w-full px-2 text-secondary outline-none"
                        value={selectedUser}
                        options={state.ChatInfo.name}
                        onChange={handleChange}
                    />
                }

                <RightSideNav userHeaders={userHeaders} />
            </div>

            <form class="absolute bottom-0 w-full bg-secondary z-10">
                <input
                    className="message-input w-5/6"
                    placeholder="Send a message..."
                    type='text'
                    ref={chatRef}
                />
                {/* <button type="submit" className="send-button text-white font-semibold ml-10" onClick={addMessage} >SEND</button> */}
                <button type="submit" className="text-white font-semibold ml-16" onClick={(e) => {
                    if (typeof state.ChatInfo.name === 'object') {
                        addMessage(e, selectedUser.value.id)
                    }
                    else {
                        addMessage(e, state.ChatInfo.ID)
                    }

                }} ><SendOutlined /></button>
            </form>

            <div className="flex-1 sm:items-center px-5 py-12 overflow-auto bg-yellow-100 h-36 mt-16 w-full z-0 ">

                {!isLoading ?
                    // <div className='bg-gray-500'> 
                    <div>

                        {message.map((messages, index) => {

                            date = new Date(messages.created_at).toLocaleDateString()
                            time = convTime(messages.created_at)

                            if (date !== new Date(message[index - 1]?.created_at).toLocaleDateString()) {
                                output.push(<div>{date}</div>)
                                // output1 =<div>{date}</div>

                            }

                            // <ul className='flex justify-items-start text-left'>
                            output.push(<ul className='flex justify-between '>
                                <div className='w-full' >
                                    <div className='flex items-center'>
                                        <UserCircleIcon className='h-8 w-8 text-secondary' />
                                        {/* <UserCircleIcon className={(messages.sender.uid === userHeaders.headers.uid) ? 'h-8 w-8 text-green-500' : 'h-8 w-8 text-red-500'} /> */}
                                        <span className={(messages.sender.uid === userHeaders.headers.uid)
                                            ?
                                            'chat_bubble outgoing text-sm shadow-md'
                                            :
                                            'chat_bubble incoming text-sm shadow-md'
                                        }>
                                            {messages.body}
                                        </span>
                                    </div>

                                    <div>
                                        <span className='px-1 text-xs'> {messages.sender.uid} </span>
                                        <span className='px-1 text-xs'> {date} </span>
                                        <span className='px-1 text-xs'> {time} </span>
                                    </div>
                                </div>
                            </ul>)

                            return output
                        })}

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
                <ScrollToBottom userHeaders={userHeaders} />
            </div>
        </div>

    )
}

export default ChatForm