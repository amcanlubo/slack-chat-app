import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SidebarDMs = ({ userHeaders, channels, updateChatForm }) => {
    const [senderDatas, setSenderDatas] = useState()
    let allUserIDs = []
    
    useEffect(() => {
        channels.map(
            (channel) => (
                axios.get(`${axios.defaults.baseURL}/api/v1/channels/${channel.id}`, userHeaders)
                    .then((response) => {
                        // console.log(response.data.data)
                        response.data.data.channel_members.map((channelMember) =>
                            isInArray(allUserIDs, channelMember.user_id) ? getInbox(channelMember.user_id) : {}
                        )
                    }
                    )
                    .catch(error => alert(error))
            )
        )
    }, [channels])

    const isInArray = (array, item) => {
        if (array.indexOf(item) === -1) {
            array.push(item)
            return true
        } else return false
    }

    function getInbox(userID) {
        setSenderDatas([])
        axios.get(`${axios.defaults.baseURL}/api/v1/messages?receiver_id=${userID}&receiver_class=User`, userHeaders)
            .then((response) => {
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
            <div className="w-full text-left hover:bg-yellow-500 p-1 cursor-pointer" >
                DirectMessages
            </div>
            <ul>
                {senderDatas && 
                senderDatas.map(senderData=>(
                    <li><button onClick={()=>{updateChatForm(senderData.receiver.id,senderData.receiver.uid, 'User')}}>{senderData.receiver.uid}</button></li>))}
            </ul>
        </div>
    )
}

export default SidebarDMs
