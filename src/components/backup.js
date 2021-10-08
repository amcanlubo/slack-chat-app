import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'
import RightSideNav from './RightSideNav';
import { SendOutlined } from '@ant-design/icons';
import { UserCircleIcon } from '@heroicons/react/solid'
import ScrollToBottom from './ScrollToBottom';
import Select from 'react-select';
import useInterval from './useInterval';
import NoChatVector from '../images/NoChatYet.svg'

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



    const convTime = (time) => {
        let date = new Date(time)
        // let day = new Date(time).toLocaleString("en", { weekday: "long" })
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
            <div class="z-10 absolute top-6 bg-yellow-300 w-full h-12 text-white flex items-center justify-between">
            
                {typeof state.ChatInfo.name !== 'object' ? <div className='pl-6 font-bold text-xl'>{state.ChatInfo.name}</div> :
                    <Select
                        className="w-full px-2 text-secondary outline-none"
                        value={selectedUser}
                        options={state.ChatInfo.name}
                        onChange={handleChange}
                    />
                }
            {/* {!state.ChatInfo ?  */}
            <RightSideNav userHeaders={userHeaders}/>
            {/* : <></>} */}
            </div>
            
        
        <form className="absolute bottom-0 bg-yellow-600 w-full z-10">
            <div className="p-2 sm:mb-0">
                <div className="relative flex">
                    <span className="absolute inset-y-0 right-0 flex items-center justify-center content-center px-1">
                        <button 
                        type="submit" 
                        className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                        onClick={(e) => {
                        if (typeof state.ChatInfo.name === 'object') {
                            addMessage(e, selectedUser.value.id)
                        }
                        else {
                            addMessage(e, state.ChatInfo.ID)
                        }
                        }}>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                        </button>
                    </span>
                        <input 
                        type="text" 
                        placeholder="Write Something..." 
                        className="w-full h-10 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 bg-gray-200 rounded-full py-3"
                        ref={chatRef}
                        />
                </div>
            </div>
        </form>

                {/* <input
                    className="message-input w-5/6"
                    placeholder="Send a message..."
                    type='text'
                    ref={chatRef}
                /> */}
                {/* <button type="submit" className="send-button text-white font-semibold ml-10" onClick={addMessage} >SEND</button> */}
                {/* <button type="submit" className="text-white font-semibold ml-16" onClick={(e) => {
                    if (typeof state.ChatInfo.name === 'object') {
                        addMessage(e, selectedUser.value.id)
                    }
                    else {
                        addMessage(e, state.ChatInfo.ID)
                    }

                }} ><SendOutlined /></button> */}
            

            <div className="flex-1 sm:items-center px-5 py-10 overflow-auto bg-yellow-100 h-36 mt-16 w-full z-0 ">

                { state.ChatInfo.receiverClass !== 'Channel' ? 

                <div className='relative flex flex-col justify-center items-center content-center'>
                <img src={NoChatVector} alt='no chat' className='h-80'/>
                <span className='pt-8 text-xl font-Poppins font-bold text-yellow-300'>Select a channel/user to begin chatting</span> 
                </div>
                :   
                !isLoading ?
                   
                <div>
                    {message.map((messages, index) => {

                        // date = new Date(messages.created_at).toLocaleDateString()
                        let day = new Date(messages.created_at).toLocaleDateString("en", { weekday: "long" })
                        date = new Date(messages.created_at)
                        date = date.toDateString().slice(4,15)
                        // console.log(date)
                        time = convTime(messages.created_at)
                        
                        if (date !== new Date(message[index - 1]?.created_at).toLocaleDateString()) {
                            output.push(
                            <div className='w-full flex justify-center items-center'>
                                <hr className='flex-1 border-solid border-secondary'/>
                                <div className='w-auto px-1 border border-secondary rounded-full flex justify-center items-center content-center'>     
                                    <span className='text-xs px-1'> {day}, </span> 
                                    <span className='text-xs'> {date} </span>
                                </div>
                                <hr className='flex-1 border-solid border-secondary'/>
                            </div>)
                            // output1 =<div>{date}</div>
                        }

                        output.push(<ul className='flex justify-between '>
                            
                            {/* <div className='w-full bg-yellow-600'> */}
                            <div className='w-full'>
                                <div className='flex'>
                                    <div className='flex-start h-full items-center content-center'>
                                        <UserCircleIcon className='h-auto w-10 text-secondary' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex'>
                                            <span className='px-1 text-xs font-bold'> {messages.sender.uid} </span>
                                            <span className='px-1 text-xs'> {time} </span>
                                        </div>
                                        
                                        <span className={(messages.sender.uid === userHeaders.headers.uid)
                                            ?
                                            'chat_bubble outgoing text-sm shadow-md'
                                            :
                                            'chat_bubble incoming text-sm shadow-md'
                                        }>
                                            {messages.body}
                                        </span>
                                    </div>
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