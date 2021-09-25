import React from 'react'

const ChatForm = () => {
    return (
        <div>
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
