import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Store'
import axios from 'axios'

const LeftSideNav = ({ userHeaders }) => {

    const url = 'https://slackapi.avionschool.com'

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
            "name": "test#12",
            'user_ids': ['sean1@gmail.com', 'sean@gmail.com'],
        }, userHeaders)
            .then(() => {
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                alert('success');
            })
            .catch((error) => alert(error))
    }

    return (
        <div className="relative min-h-screen flex">
            <div className="bg-primary text-secondary w-64 channels" id="channels">
                {channels.map((channel) => (
                    <div className="relative">
                        <label className="w-full text-left hover:bg-yellow-500" onClick={() => { updateChatForm(channel.id) }}><input type="radio" name="channel"/><span>{channel.name}</span></label>
                    </div>
                ))}
                <br />
                <button onClick={() => { addChannel() }}>Add Channel</button>
            </div>
        </div>
    )
}

export default LeftSideNav
