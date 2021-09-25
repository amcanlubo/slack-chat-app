import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const LeftSideNav = ({ userHeaders }) => {

    const url = 'https://slackapi.avionschool.com'

    const [channels, setChannels] = useState([])
    const [updateChannelList, setUpdateChannelList] = useState(true)

    const getChannelNames = () => {

        setChannels([])

        axios.get(`${url}/api/v1/channels`, userHeaders)
            .then((response) => {
                if (response.data.errors) return null;
                response.data.data.map((channel) => setChannels((channels) => [...channels, channel.name]))
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
            "name": "test#09",
            'user_ids': ['sean1@gmail.com', 'sean@gmail.com'],
        }, userHeaders)
            .then(() => {
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                alert('success');
            })
            .catch((error) => alert(error))
    }

    return (
        // <div>
        //     <div className="flex-none w-56 h-full flex-col bg-primary">
        //     <div className="flex-col justify-center">
        //         <CreateChannel />
        //     </div>
        <div className="relative min-h-screen flex">
            <div className="bg-primary text-secondary w-64">
                {channels.map((channel) => (
                    <p>{channel}</p>
                ))}
                <br />
                <button onClick={() => { addChannel() }}>Add Channel</button>
            </div>
        </div>
    )
}

export default LeftSideNav
