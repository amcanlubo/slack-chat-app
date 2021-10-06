import React, { useState, useRef, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'

const AddChannelModal = ({ handleAddChannelButtonClick, userHeaders, updateChannelList, setUpdateChannelList }) => {

    const [members, setMembers] = useState([])
    let member = useRef(null)
    let channelName = useRef(null)
    const [allUsers, setAllUsers] = useState([])
    let memberIDs = []
    const addMember = () => {
        setMembers([...members, member.current.value])
    }


    function filterByValue(array, string) {
        return array.filter(o =>
            Object.keys(o).some(k =>String(o[k]).toLowerCase().includes(string.toLowerCase())));
    }
    
    const getMembersUID = () => {
        members.map((member)=>{
            let memberInfo = filterByValue(allUsers, member.toLowerCase())
            memberIDs.push(memberInfo[0].id)
            // setMembersUID([...membersUID, memberInfo[0].id])
            // setMembersUID([...membersUID, membersInfo.user_id])
        })
        console.log(memberIDs)
    }

    const createChannel = (e) => {



        e.preventDefault()
        getMembersUID()
        axios.post(`${axios.defaults.baseURL}/api/v1/channels `,
            {
                'name': channelName.current.value,
                'user_ids': memberIDs
            }
            , userHeaders)
            .then((response) => {
                console.log(response)
                updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
                handleAddChannelButtonClick()
                setMembers([])

            })
            .catch(error => console.log(error))
    }


    useEffect(() => {
        axios.get(`${axios.defaults.baseURL}/api/v1/users`, userHeaders)
            .then((response) => {
                setAllUsers(response.data.data)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div
            class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
            id="modal-example-small">
            <div class="relative w-auto my-6 mx-auto max-w-sm">
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                        <h3 class="text-3xl font-semibold">
                            Create Channel
                        </h3>
                        <button
                            class="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={handleAddChannelButtonClick}>
                            <span class="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <XIcon />
                            </span>
                        </button>
                    </div>
                    <div class="relative p-6 flex-auto">
                        <label class="block">
                            <span class="text-gray-700">Channel Name</span>
                            <input ref={channelName} class="appearance-none border mt-1 block w-full focus:outline-none" placeholder="new-channel" />
                        </label>
                        <label class="block pt-4">
                            <span class="text-gray-700">Add Members</span>
                            <input ref={member} class="appearance-none border mt-1 block w-full focus:outline-none" placeholder="johndoe@email.com" />
                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white px-2 mt-1 font-bold rounded" onClick={addMember}>Add</button>
                        </label>
                        <div>
                            {members.map((member) => (
                                <p>{member}</p>
                            ))}
                        </div>
                    </div>
                    <div class="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                        <button
                            class="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" onClick={handleAddChannelButtonClick}>
                            Cancel
                        </button>
                        <button
                            class="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit" onClick={(e) => { createChannel(e) }}>
                            Create Channel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChannelModal
