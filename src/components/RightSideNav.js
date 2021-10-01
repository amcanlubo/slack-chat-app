import React, { useContext, useEffect, useState } from 'react'
// import React, {  useContext, useEffect, useState } from 'react'
import { Context } from './Store';
import axios from 'axios'
import UserSearchBar from './UserSearchBar'

const RightSideNav = ({ userHeaders }) => {
    // console.log(userHeaders)

    const [state, dispatch] = useContext(Context);
    const [users, setUsers] = useState([]);
    // const [members, setMembers] = useState([]);
    const [names, setNames] = useState([]);


    const url = 'https://slackapi.avionschool.com'

    let array = []
    // console.log(state)
    const getMembers = () => {

        axios.get(`${url}/api/v1/channels/${state.ChatInfo.ID}`, userHeaders)

            .then((response) => {
                if (response.data.errors) return null;
                // response.data.data.channel_members.map((member) => setMembers((members) => [...members, member]))
                
                // return members
                response.data.data.channel_members.forEach(function (member) {
                    users.forEach(function (item) {
                        if (item.id === member.user_id) {
                            array.push(item)
                            console.log(array)
                        }
                    })
                })
                setNames(array)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMembers()
    }, [state])


    useEffect(() => {
        axios.get(`${url}/api/v1/users`, userHeaders)
            .then((response) => {
                // console.log(response.data)
                setUsers(response.data?.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])


    return (
        <>
            <div className="relative min-h-screen flex">
                <div className="bg-primary text-secondary w-64">
                    <h1 className='text-center font-bold'>MEMBERS</h1>

                    <UserSearchBar users={users} userHeaders={userHeaders} />

                    <div className='flex bg-primary w-30'>
                        <div className='flex-col w-30'>

                            {names.map((member) => (
                                <ul>
                                    {member.uid}
                                </ul>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default RightSideNav


