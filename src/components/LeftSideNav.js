import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store'
import axios from 'axios'

const LeftSideNav = ({ userHeaders }) => {

    const url = 'https://slackapi.avionschool.com'
    let nameRef = useRef(null)
    const [channels, setChannels] = useState([])
    const [updateChannelList, setUpdateChannelList] = useState(true)
    const [channelIDState,setChannelIDState] = useState('')

    const [state, dispatch] = useContext(Context);

    const updateChatForm = (channelID) => {
        setChannelIDState(channelID)
    }

    useEffect(() => {
        dispatch({ type: 'UPDATE_CHANNELID',payload: channelIDState })
    }, [channelIDState])

    const getChannelNames = () => {

        setChannels([])

        axios.get(`${url}/api/v1/channels`, userHeaders)
            .then((response) => {
                if (response.data.errors) return null;
                response.data.data.map((channel) => setChannels((channels) => [...channels, channel]))
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getChannelNames()
    }, [updateChannelList])

    const addChannel = () => {
        axios.post(`${url}/api/v1/channels`, {
            // "name": "test#12",
            // 'user_ids': ['sean1@gmail.com', 'sean@gmail.com'],
            "name": nameRef.current.value,
            'user_ids': ['sean@gmail.com', 'ahree00@test.com'], //get from session
        }, userHeaders)
            .then(() => {
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                alert('success');
                nameRef.current.value=''
            })
            .catch((error) => alert(error))
    }


    return (
       <>
        <div className="relative min-h-screen flex flex-col">
            <div className="bg-primary text-secondary w-64">
            <h1 className='text-center font-bold'>MY CHANNELS</h1>
            <div className="bg-primary text-secondary w-64 channels" id="channels">
            <div>
            <input className='w-40' ref={nameRef} type='text'/>
            <button onClick={() => { addChannel() }}>+Channel</button>
            </div>
                {channels.map((channel) => (
                    <div className="relative">
                        <label className="w-full text-left hover:bg-yellow-500" onClick={() => { updateChatForm(channel.id) }}>
                            <input type="radio" name="channel"/>
                            <span>{channel.name}</span>
                        </label>
                    </div>
                ))}
                <br />
            </div>
            </div>

            
           {/* DROPDOWN CHANNELS */}
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    CHANNELS
                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>

    
                <div className="invisible origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        {channels.map((channel) => (
                        <div className="relative">
                            <label className="w-full text-left hover:bg-yellow-500" onClick={() => { updateChatForm(channel.id) }}>
                                <input type="radio" name="channel"/>
                                <span>{channel.name}</span>
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        
        {/* DROPDOWN DIRECT MESSAGE */}
            <div className="relative inline-block text-left mt-5">
                <div>
                    <button type="button" className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    DIRECT MESSAGE
                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>

    
                <div className="invisible origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        {channels.map((channel) => (
                        <div className="relative">
                            <label className="w-full text-left hover:bg-yellow-500" onClick={() => { updateChatForm(channel.id) }}>
                                <input type="radio" name="channel"/>
                                <span>{channel.name}</span>
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
        

        </>

    )
}


export default LeftSideNav
