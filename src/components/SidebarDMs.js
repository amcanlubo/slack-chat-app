import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import useInterval from './useInterval'
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid'

const SidebarDMs = ({ userHeaders, channels, updateChatForm }) => {
    const [senderDatas, setSenderDatas] = useState([])
    const [directMessagesSubMenuToggle, setDirectMessagesSubMenuToggle] = useState(true)
    const [dmEnabledUsers, setDMEnabledUsers] = useState([])
    const [users, setUsers] = useState([])
    let allUserIDs = useRef([])
    let allDMEnabledUserNames = []
    let senderDatasRef = useRef([])



    const handleDMsDropdown = () => {
        directMessagesSubMenuToggle ? setDirectMessagesSubMenuToggle(false) : setDirectMessagesSubMenuToggle(true)


    }

    // const getChat = () => {
    //     channels.map(
    //         (channel) => {
    //             axios.get(`${axios.defaults.baseURL}/api/v1/channels/${channel.id}`, userHeaders)
    //                 .then((response) => {

    //                     // console.log(response.data.data)
    //                     response.data.data.channel_members.map((channelMember) =>{

    //                         // getInbox(channelMember)
    //                         isInArray(allUserIDs, channelMember.user_id)
    //                         allUserIDs.map((user) => {
    //                             getInbox(user)

    //                         })
    //                 }
    //                     )
    //                 })
    //                 .catch(error => console.log(error))

    //         }
    //     )
    //         setSenderDatas(senderDatasRef.current)
    //     dmEnabledUsers.map((dmEnabledUser) => {
    //         users.map((user) => {
    //             if (user.id === dmEnabledUser) {
    //                 allDMEnabledUserNames.push({
    //                     'value': { 'id': user.id, 'name': user.uid },
    //                     'label': user.uid
    //                 })
    //             }
    //         }
    //         )


    //     })
    // }

    // // setInterval(() => {
    // //     getChat()
    // // }, 3000);



    // useEffect(() => {
    //     setDMEnabledUsers([])
    //     getChat()
    //     // setSenderDatas(senderDatasRef.current)

    // }, [channels])


    // useInterval(()=>{
    //     getChat()
    // },30000)

    const isInArray = (array, item) => {
        if (array.indexOf(item) === -1) {
            array.push(item)
            //return true
        } //else return false
    }

    // // const objIsInArray = (array, obj) => {
    // //         if(array.length===0){
    // //             senderDatasRef.current.push(obj)
    // //             setSenderDatas(senderDatasRef.current)
    // //         }

    // //         console.log(obj.id)
    // //         array.map((item) => {
    // //             if (item.id !== obj.id) {
    // //                 senderDatasRef.current.push(obj)
    // //                 setSenderDatas(senderDatasRef.current)
    // //             }
    // //         })

    // // }


    // function getInbox(user) {
    //     setDMEnabledUsers([])
    //     axios.get(`${axios.defaults.baseURL}/api/v1/messages?receiver_id=${user}&receiver_class=User`, userHeaders)
    //         .then((response) => {
    //             setDMEnabledUsers((dmEnabledUsers) => [...dmEnabledUsers, user])
    //             if (response.data.data[0]) {
    //                 if(!senderDatasRef.current.some(e=> e.id === response.data.data[0].id)){
    //                     senderDatasRef.current.push(response.data.data[0])
    //                 }
    //                 // if(senderDatasRef.current.some(e=> console.log(e) === response.data.data[0].id)){
    //                 //     setSenderDatas(senderDatasRef.current)
    //                 // }
    //                 // objIsInArray(senderDatasRef.current, response.data.data[0])


    //                 // console.log(response.data.data)
    //             }
    //             // response.data.data[0] ? setSenderDatas((names) => [...names, response.data.data[0].receiver]) : {}
    //         })
    //         .catch((error) => console.log(error))
    // }


    useEffect(() => {
        getAllUsers()
        getChannelMembersInbox()
    }, [])

    useInterval(() => {
        getAllUsers()
        getChannelMembersInbox()
    }, 2000)

    const getChannelMembersInbox = () => {
        allUserIDs.current.map((user) => {
            axios.get(`${axios.defaults.baseURL}/api/v1/messages?receiver_id=${user}&receiver_class=User`, userHeaders)
                .then((response) => {
                    if (response.data.data[0]) {
                        if (!senderDatasRef.current.some(e => e.id === response.data.data[0].id)) {
                            senderDatasRef.current = [...senderDatasRef.current, response.data.data[0]]
                            setSenderDatas(senderDatasRef.current)
                        }

                    }
                })
        })
    }


    const getChannelMembersID = () => {
        channels.map((channel) => {
            axios.get(`${axios.defaults.baseURL}/api/v1/channels/${channel.id}`, userHeaders)
                .then((response) => {
                    response.data.data.channel_members.map((member) => {
                        isInArray(allUserIDs.current, member.user_id)

                        //     axios.get(`${axios.defaults.baseURL}/api/v1/messages?receiver_id=${member.user_id}&receiver_class=User`, userHeaders)
                        //     .then((response)=>{
                        //         if(response.data.data[0]){
                        //             if(!senderDatas.some(e=> console.log(e) === response.data.data[0].id)){
                        //                 console.log('ey')
                        //                 senderDatasRef.current.push(response.data.data[0])
                        //                 allUserIDs = []
                        //             }
                        //         }
                        //     })
                        // }
                    })
                })


        })
        // getChannelMembersInbox()
    }

    const getAllUsers = () => {
        axios.get(`${axios.defaults.baseURL}/api/v1/users`, userHeaders)
            .then((response) => {
                getChannelMembersID()
                sendToSelect(response.data.data)
            })
            .catch(error => console.log(error))
    }

    const sendToSelect = (array) => {
        array.map((user) => {
            if (allUserIDs.current.includes(user.id))
                allDMEnabledUserNames.push({
                    'value': { 'id': user.id, 'name': user.uid },
                    'label': user.uid
                })
        })
        setDMEnabledUsers(allDMEnabledUserNames)
    }


    // const getInbox = (allUsers) => {
    //     allUsers.map((user) => {
    //         axios.get(`${axios.defaults.baseURL}/api/v1/messages?receiver_id=${user.id}&receiver_class=User`, userHeaders)
    //             .then((response) => {
    //                 if (response.data.data[0]) {
    //                     if (!senderDatasRef.current.some(user => user.id === response.data.data[0].id)) {
    //                         senderDatasRef.current.push(response.data.data[0])
    //                         setSenderDatas((senderDatas) => [...senderDatas, response.data.data[0]])
    //                     }
    //                 }
    //             })
    //     })
    // }


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
