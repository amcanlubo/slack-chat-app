import React, { useContext, useEffect } from 'react'
import { Context } from './Store';
import axios from 'axios'

const ChatForm = ({ userHeaders }) => {
    
    const [state, dispatch] = useContext(Context);


    axios.get(`${axios.defaults.baseURL}/api/v1/channels/3`, userHeaders, { 'id': state.ChannelID })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
    return (
        <div className='container h-full flex flex-col justify-between'>
            {state.ChannelID}
        <form>
            <input
                className="message-input"
                placeholder="Send a message..."
                type='text'
                // value={value}
                // onChange={handleChange}
                // onSubmit={handleSubmit}
            />    
            <button type="submit" className="send-button">SEND</button>
        </form>
        </div>
    )
}

export default ChatForm
