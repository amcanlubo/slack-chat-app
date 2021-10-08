import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store'
import SidebarDMs from './SidebarDMs'
import axios from 'axios'
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid'
import AddChannelModal from './AddChannelModal'

const Sidebar = ({ userHeaders }) => {
    let nameRef = useRef(null)
    const [addChannelModalToggle, setAddChannelModalToggle] = useState(false)
    const [channels, setChannels] = useState([])
    const [updateChannelList, setUpdateChannelList] = useState(true)
    const [IDState, setIDState] = useState('')
    const [channelsSubMenu, setChannelsSubMenu] = useState(true)
    const [nameState, setNameState] = useState('')
    const [receiverClass, setReceiverClass] = useState('')
    const [state, dispatch] = useContext(Context);
    let tempChannels = []

    let chatInfo = {
        'ID': IDState,
        'name': nameState,
        'receiverClass': receiverClass
    }

    const updateChatForm = (ID, name, receiverClass) => {
        setIDState(ID)
        setNameState(name)
        setReceiverClass(receiverClass)
    }

    const handleChannelDropdown = () => {
        channelsSubMenu ? setChannelsSubMenu(false) : setChannelsSubMenu(true)
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
            .finally(() => {
                setChannels(tempChannels)
            })
    }

    useEffect(() => {
        getChannelNames()
    }, [updateChannelList])


    const addChannel = () => {
        axios.post(`${axios.defaults.baseURL}/api/v1/channels`, {
            "name": nameRef.current.value,
            'user_ids': [],
        }, userHeaders)
            .then(() => {
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                alert('success');
                nameRef.current.value = ''

            })
            .catch((error) => alert(error))
    }

    const handleAddChannelButtonClick = () => {
        addChannelModalToggle ? setAddChannelModalToggle(false) : setAddChannelModalToggle(true)
    }

    return (
        <div className="absolute inset-y-0 left-0 z-50 -translate-x-full transform  transition duration-200 ease-in-out mobile:translate-x-0 mobile:relative">
            {addChannelModalToggle ? <AddChannelModal handleAddChannelButtonClick={handleAddChannelButtonClick} userHeaders={userHeaders} updateChannelList={updateChannelList} setUpdateChannelList={setUpdateChannelList} /> : <></>}
            <div className="bg-secondary channels text-white text-opacity-70 overflow-y-scroll h-screen w-64 z-50 pt-2">
                <div className="channelsWrap">

                    <div className="w-full text-left font-bold p-1 cursor-pointer flex items-center justify-between">
                        <div onClick={() => { handleChannelDropdown() }} className="hover:text-white flex items-center w-full">
                            <span className="px-1">
                                {channelsSubMenu ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            </span>My Channels
                        </div>
                        <div className="hover:text-white" onClick={handleAddChannelButtonClick}><PlusIcon /></div>
                    </div>
                    {channelsSubMenu ?
                            channels.map((channel) => (
                                <label className="w-full text-left hover:bg-yellow-900" onClick={() => { updateChatForm(channel.id, channel.name, 'Channel') }}>
                                    <input type="radio" name="channel" />
                                    <span className="pl-3 py-1">{channel.name}</span>
                                </label>
                            ))
                        : <></>}
                </div>
                <SidebarDMs userHeaders={userHeaders} channels={channels} updateChatForm={updateChatForm} />
            </div>
        </div>
    )
}

export default Sidebar