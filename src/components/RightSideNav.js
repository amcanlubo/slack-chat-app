
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import UserSearchBar from './UserSearchBar'


const RightSideNav = ({ userHeaders }) => {
    const [message, setMessage] = useState([])
    const [updateMessageList, setUpdateMessageList] = useState(true)
    const [users, setUsers] = useState([])
    let dmRef = useRef(null)
    const url = 'https://slackapi.avionschool.com'

    // console.log(userHeaders)

    const addMessage = (e) => {
        e.preventDefault()
        axios.post(`${url}/api/v1/messages`, {
            'receiver_id': 526,
            //   'receiver_id': 663,
            'receiver_class': "User",
            'body': dmRef.current.value,
        }, userHeaders)

            .then((response) => {
                getMessage()
                console.log(response.data)
                alert('message sent');
                dmRef.current.value = ''
            })
            .catch((error) => alert(error))
    }


    const getMessage = () => {

        setMessage([])
        axios.get(`${url}/api/v1/messages?receiver_id=526&receiver_class=User`, userHeaders)
            // axios.get(`${url}/api/v1/messages?receiver_id=663&receiver_class=User`, userHeaders)
            .then((response) => {
                if (response.data.errors) return null;
                response.data.data.map((message) => setMessage((messages) => [...messages, message]))
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMessage()
    }, [updateMessageList])

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
                    <UserSearchBar users={users}/>
                    {/* <form>
                        <input
                            className="message-input"
                            placeholder="Send a message..."
                            type='text'
                            ref={dmRef}
                        />
                        <button onClick={addMessage} type="submit" className="send-button" >SEND</button>
                    </form>

                    <div className='flex bg-primary w-30'>
                        <div className='flex-col w-30'>
                            {message.map((messages) => (

                                <ul className={(messages.sender.id === 663)
                                    ?
                                    'chat_bubble outgoing'
                                    :
                                    'chat_bubble incoming'
                                }>
                                    {messages.body}
                                </ul>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default RightSideNav
