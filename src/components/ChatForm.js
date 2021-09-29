import React, { useContext, useEffect, useState, useRef} from 'react'
import { Context } from './Store';
import axios from 'axios'

const ChatForm = ({ userHeaders }) => {
    let chatRef = useRef(null)
    // console.log(userHeaders)
    const url = 'https://slackapi.avionschool.com'
    const [state, dispatch] = useContext(Context);

    const [message, setMessage] = useState([])
    const [updateMessageList, setUpdateMessageList] = useState(true)
    const [messageIDState,setMessageIDState] = useState('')

    useEffect(() => {
        dispatch({ type: 'UPDATE_MESSAGEID',payload: messageIDState })
    }, [])

    
    // useEffect(() => {
    //     axios.get(`${axios.defaults.baseURL}/api/v1/channels/3`, userHeaders, { 'id': state.ChannelID })
    //         .then((response) => {
                
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // })

    useEffect(() => {
        axios.get(`${axios.defaults.baseURL}/api/v1/channels/${state.ChannelID}`, userHeaders, { 'id': state.ChannelID })
            .then((response) => {
            console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const getMessage = () => {

        setMessage([])
        axios.get(`${url}/api/v1/messages?receiver_id=${state.ChannelID}&receiver_class=Channel`, userHeaders)
            .then((response) => {
                if (response.data.errors) return null;
                response.data.data.map((message) => setMessage((messages) => [...messages, message]))
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMessage()
    }, [updateMessageList])


  const addMessage = (e) => {
      e.preventDefault()
    axios.post(`${url}/api/v1/messages`, {
        // 'receiver_id': state.ChannelID ,
        'receiver_id': 646 ,
        'receiver_class': 'Channel',
        'body': chatRef.current.value
    }, userHeaders)
        .then((response) => {
            getMessage()
            // updateChannelList ? setUpdateChannelList(false) : setUpdateChannelList(true);
            // console.log(userHeaders)
            console.log(response.data)
            alert('message to channel sent');
            chatRef.current.value=''
        })
        .catch((error) => alert(error))
}


    return (
        <div className='container h-full flex flex-col justify-between'>
            {state.ChannelID}
        <form>
            <input
                className="message-input"
                placeholder="Send a message..."
                type='text'
                ref={chatRef}
            />    
            <button type="submit" className="send-button" onClick={addMessage} >SEND</button>
        </form>
        {/* Message Body */}

        <div className= 'flex-col bg-primary w-30'>
            <div className = 'flex-col w-30'>
            {message.map((messages) => (      
            <ul className = {(messages.sender.id === 663) 
                ? 
                'chat_bubble outgoing'
                :
                'chat_bubble incoming'      
            }>
            {messages.body}
            </ul>
            ))}  
            </div>        
        </div>   

        
        </div>
    )
}

export default ChatForm