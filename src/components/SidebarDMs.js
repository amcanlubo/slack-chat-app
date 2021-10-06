import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid'

const SidebarDMs = ({ userHeaders, channels, updateChatForm }) => {
    const [senderDatas, setSenderDatas] = useState()
    const [directMessagesSubMenuToggle, setDirectMessagesSubMenuToggle] = useState(true)
    const [dmEnabledUsers, setDMEnabledUsers] = useState([])
    const [users, setUsers] = useState([])
    let allUserIDs = []
    let allDMEnabledUserNames = []

    const handleDMsDropdown = () => {
        directMessagesSubMenuToggle ? setDirectMessagesSubMenuToggle(false) : setDirectMessagesSubMenuToggle(true)
    }


    useEffect(() => {
        setDMEnabledUsers([])
        channels.map(
            (channel) => (
                axios.get(`${axios.defaults.baseURL}/api/v1/channels/${channel.id}`, userHeaders)
                    .then((response) => {
                        // console.log(response.data.data)
                        response.data.data.channel_members.map((channelMember) =>
                            isInArray(allUserIDs, channelMember.user_id) ? getInbox(channelMember) : {}
                        )
                    }
                    )
                    .catch(error => alert(error))
            )
        )

        dmEnabledUsers.map((dmEnabledUser) => {
            users.map((user) => {
                if (user.id === dmEnabledUser) {
                    allDMEnabledUserNames.push({
                        'value': {'id':user.id, 'name':user.uid},
                        'label': user.uid
                    })
                }
            }
            )


        })


    }, [channels])

    const isInArray = (array, item) => {
        if (array.indexOf(item) === -1) {
            array.push(item)
            return true
        } else return false
    }

    function getInbox(user) {
        setSenderDatas([])
        axios.get(`${axios.defaults.baseURL}/api/v1/messages?receiver_id=${user.user_id}&receiver_class=User`, userHeaders)
            .then((response) => {
                setDMEnabledUsers((dmEnabledUsers) => [...dmEnabledUsers, user.user_id])
                if (response.data.data[0]) {
                    setSenderDatas((senderDatas) => [...senderDatas, response.data.data[0]])
                    // console.log(response.data.data)
                }
                // response.data.data[0] ? setSenderDatas((names) => [...names, response.data.data[0].receiver]) : {}
            })
            .catch((error) => alert(error))
    }





    return (
        <div>
            <h1 className="w-full text-left font-bold flex items-center hover:text-white p-1 cursor-pointer" onClick={handleDMsDropdown}>
                <span className="px-1">
                    {directMessagesSubMenuToggle ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </span>Direct Messages
            </h1>
            {directMessagesSubMenuToggle ? senderDatas &&
                <>
                    {senderDatas.map(senderData => {
                        let sender
                        if (senderData.receiver.uid === userHeaders.headers.uid) {

                            sender = senderData.sender
                        }
                        else {
                            sender = senderData.receiver
                        }

                        return <label className="w-full text-left hover:bg-yellow-900" onClick={() => { updateChatForm(sender.id, sender.uid, 'User') }}>
                            <input type="radio" name="channel" />
                            <span className="pl-3 py-1">{sender.uid}</span>
                        </label>
                    })}
                </>
                : <></>}
            <span className="w-full flex justify-center align-center py-2"><button className="w-11/12 rounded-full text-center text-secondary bg-yellow-300 hover:bg-yellow-400  py-2" onClick={() => { updateChatForm(null, dmEnabledUsers, 'User') }}>New Message</button></span>

        </div>
    )
}

export default SidebarDMs
