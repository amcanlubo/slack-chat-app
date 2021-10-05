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

//                 response.data.data.map((channel) => setChannels((channels) => [...channels, channel]))
//                 // console.log(response.data.data)
//                 console.log(response)

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
        axios.post(`${axios.defaults.baseURL}/api/v1/channels`, {"name": nameRef.current.value,
            'user_ids': [], 
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
            
            <div className="bg-primary text-secondary h-screen w-64 py-12">
                <div className="channelsWrap">
                    <div>
                        <input 
                            ref={ nameRef } 
                            type= 'text' 
                            placeholder='add a channel' 
                        />
                        
                        <button 
                            onClick={addChannel} 
                            type='submit' 
                            className="bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            +
                        </button>
                    </div>

                    <div className="w-full text-left font-bold hover:bg-yellow-500 p-1 cursor-pointer" onClick={() => { handleChannelDropdown() }}>
                        MY CHANNELS
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