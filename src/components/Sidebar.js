import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store'
import SidebarDMs from './SidebarDMs'
import axios from 'axios'

const Sidebar = ({ userHeaders }) => {
    let nameRef = useRef(null)
    const [channels, setChannels] = useState([])
    const [updateChannelList, setUpdateChannelList] = useState(true)
    const [IDState, setIDState] = useState('')
    const [channelsSubMenu, setChannelsSubMenu] = useState(true)
    const [directMessagesSubMenu, setDirectMessagesSubMenu] = useState(true)
    const [nameState, setNameState] = useState('')
    const [receiverClass, setReceiverClass] = useState('')
    const [state, dispatch] = useContext(Context);
    let tempChannels = []

    let chatInfo = {
        'ID': IDState,
        'name': nameState,
        'receiverClass': receiverClass                                                                                                                      
    }

    const updateChatForm = (ID, name,receiverClass) => {
        setIDState(ID)
        setNameState(name)
        setReceiverClass(receiverClass)
    }

    const handleChannelDropdown = () => {
        channelsSubMenu ? setChannelsSubMenu(false) : setChannelsSubMenu(true)
    }
    const handleDirectMessagesDropdown = () => {
        channelsSubMenu ? setDirectMessagesSubMenu(false) : setDirectMessagesSubMenu(true)
    }

    useEffect(() => {
        dispatch({ type: 'PASS_TO_CHATFORM', payload: chatInfo })
    }, [IDState])

    const getChannelNames = () => {

        setChannels([])

        axios.get(`${axios.defaults.baseURL}/api/v1/channels`, userHeaders)
            .then((response) => {
                if (response.data.errors) return null;
                response.data.data.map((channel) => tempChannels.push(channel))
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                setChannels(tempChannels)
            })
    }

    useEffect(() => {
        getChannelNames()
    }, [updateChannelList])


    const addChannel = () => {
        axios.post(`${axios.defaults.baseURL}/api/v1/channels`, {
            // "name": "test#12",
            // 'user_ids': ['sean1@gmail.com', 'sean@gmail.com'],
            "name": nameRef.current.value,
            'user_ids': ['sean@gmail.com', 'ahree00@test.com'], //get from session
        }, userHeaders)
            .then(() => {
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                alert('success');
                nameRef.current.value = ''
                
            })
            .catch((error) => alert(error))
    }

    return (
        <>
            <div className="bg-primary text-secondary h-screen w-64">
                <div className="channelsWrap">
                    <div className="w-full text-left hover:bg-yellow-500 p-1 cursor-pointer" onClick={() => { handleChannelDropdown() }}>
                        Channels
                    </div>
                    {channelsSubMenu ?
                        <div className="border-" id="channels">
                            {channels.map((channel) => (
                                <label className="w-full text-left hover:bg-yellow-500" onClick={() => { updateChatForm(channel.id, channel.name, 'Channel') }}>
                                    <input type="radio" name="channel" />
                                    <span className="pl-3 py-1">{channel.name}</span>
                                </label>
                            ))}
                        </div>
                        : <></>}
                </div>
                <SidebarDMs userHeaders={userHeaders} channels={channels} updateChatForm={updateChatForm}/>
            </div>
        </>
    )
}

export default Sidebar
