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
            'user_ids': ['amc@email.com', 'sean@gmail.com', 'ahree00@test.com'], //get from session
        }, userHeaders)
            .then(() => {
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                alert('success');
                nameRef.current.value=''
            })
            .catch((error) => alert(error))
    }

    return (
        <div className="relative min-h-screen flex">
            <div className="bg-primary text-secondary w-64">
            <h1 className='text-center font-bold'>MY CHANNELS</h1>
                <div>
                    <input className='w-40' ref={nameRef} type='text'/>
                    {/* <button onClick={() => { addChannel() }}>+ADD</button> */}
                    <button onClick={() => { addChannel() }}>+Channel</button>
                </div>
                <br />
                {channels.map((channel) => (
                    <>
                        <br />
                        <button onClick={() => { updateChatForm(channel.id) }}>{channel.name}</button>
                    </>
                ))}   
            </div>
        </div>
    )
}

export default LeftSideNav
