import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'
import RightSideNav from './RightSideNav';
import { UserCircleIcon } from '@heroicons/react/solid'
import ScrollToBottom from './ScrollToBottom';
import Select from 'react-select';
import useInterval from './useInterval';
import NoChatVector from '../images/NoChatYet.svg'
import { MenuIcon } from '@heroicons/react/outline'
// import Sidebar from './Sidebar';

const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-secondary transition ease transform duration-300`;

const ChatForm = ({ userHeaders, sidebarToggle, toggleSidebar }) => {
    let chatRef = useRef(null)
    // let dateRef = useRef(null)
    let messageRef = useRef([])
    let enableDMUsers = []
    // console.log(userHeaders)
    const url = 'https://slackapi.avionschool.com'
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState([])
    const [users, setUsers] = useState([])
    // const [option,setOption] = useState()
    const [selectedUser, setSelectedUser] = useState()
    const [sidebar, setSidebar] = useState(false);



    useEffect(() => {
        axios.get(`${axios.defaults.baseURL}/api/v1/users`, userHeaders)
            .then((response) => {
                // console.log(response.data)
                setUsers(response.data?.data)
            })
            .catch((error) => {
                console.log(error);
            })

        setMessage([])
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
                if (messageRef.current.length === 0 || response.data.data.length !== messageRef.current.length) {
                    setMessage([])
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

        <div className="flex h-full overflow-auto flex-col">
            <div class="z-10 bg-yellow-300 text-white sticky top-0 flex items-center justify-between mobile:flex-row-reverse">
                {!state.ChatInfo.receiverClass ? <></> : <RightSideNav userHeaders={userHeaders} />}



                {typeof state.ChatInfo.name !== 'object' ? <div className=' font-bold truncate px-6 text-xl'>{state.ChatInfo.name}</div> :
                    <Select
                        className="w-full px-2 text-secondary outline-none"
                        value={selectedUser}
                        options={state.ChatInfo.name}
                        onChange={handleChange}
                    />
                }

                <div className='mobile:block tablet:hidden desktop:hidden'>
                    <button
                        className="flex flex-col h-12 w-12 rounded justify-center items-center"
                        onClick={() => sidebarToggle()}
                    >
                        <div
                            className={`${genericHamburgerLine} ${toggleSidebar
                                    ? "rotate-45 translate-y-2 opacity-100"
                                    : "opacity-100"
                                }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${toggleSidebar ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <div
                            className={`${genericHamburgerLine} ${toggleSidebar
                                    ? "-rotate-45 -translate-y-2 opacity-100"
                                    : "opacity-100"
                                }`}
                        />
                    </button>
                    {/* <button className="text-white active:text-primary font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 relative right-0" onClick={() => sidebarToggle()}>
                        <div className="h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300"></div>
                    </button> */}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="h-full sm:items-center px-5 bg-yellow-100 w-full z-0 ">

                    {!state.ChatInfo.name ?
                        <div className='h-full relative flex flex-col justify-center text-center items-center content-center'>
                            <img src={NoChatVector} alt='no chat' className='h-80' />
                            <span className='pt-8 text-md mobile:text-center font-Poppins font-bold text-yellow-300'>Select a channel/user to begin chatting</span>
                        </div>

                        : !isLoading ?
                            <div>

                                {message.map((messages, index) => {
                                    output = []
                                    // date = new Date(messages.created_at).toLocaleDateString()
                                    date = new Date(messages.created_at).toDateString().slice(0, 15)
                                    time = convTime(messages.created_at)

                                    if (date !== new Date(message[index - 1]?.created_at).toDateString()) {
                                        // if (date !== new Date(message[index - 1]?.created_at).toLocaleDateString()) {
                                        // output.push(<div>{date}</div>)
                                        // output1 =<div>{date}</div>

                                        output.push(
                                            <div className='w-full flex justify-center items-center pt-2'>
                                                <hr className='flex-1 border-solid border-secondary' />
                                                <div className='w-auto px-1 border border-secondary rounded-full flex justify-center items-center content-center'>
                                                    <span className='text-xs'> {date} </span>
                                                </div>
                                                <hr className='flex-1 border-solid border-secondary' />
                                            </div>)
                                    }

                                    output.push(<ul className='flex justify-between'>
                                        <div className='w-full' >
                                            <div className='flex content-center items-center'>
                                                <UserCircleIcon className='h-10 w-10 text-secondary' />
                                                <div className='flex flex-col'>
                                                    <div className='flex'>
                                                        <span className='px-1 text-xs font-bold'> {messages.sender.uid} </span>
                                                        {/* <span className='px-1 text-xs'> {date} </span> */}
                                                        <span className='text-xs'> {time} </span>
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
            <form className={state.ChatInfo.name ? "flex-1w-full sticky bottom-0 bg-secondary z-10" : 'hidden'}>
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
        </div>


    )
}

export default ChatForm