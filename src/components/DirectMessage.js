import React, { useContext, useEffect, useState, useRef} from 'react'
import axios from 'axios'

const DirectMessage = ({ userHeaders }) => {
    let dmRef = useRef(null)
    const url = 'https://slackapi.avionschool.com'
    console.log(userHeaders)
    const addMessage = (e) => {
        e.preventDefault()
        axios.post(`${url}/api/v1/messages`, {    
            'receiver_id': 663,
            'receiver_class': "User",
            'body': dmRef.current.value,
        }, userHeaders)

          .then(() => {
            //   console.log(userHeaders)
              alert('message sent');
              dmRef.current.value=''
          })
          .catch((error) => alert(error))
  }


    return (
        <div className='container h-full flex flex-col justify-between'>
        
        <form>
            <input
                className="message-input"
                placeholder="Send a message..."
                type='text'
                ref={dmRef}
            />    
            <button onClick={addMessage} type="submit" className="send-button" >SEND</button>
        </form>
    </div>
    )
}

export default DirectMessage
