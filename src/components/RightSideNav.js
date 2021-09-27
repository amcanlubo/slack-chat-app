import React, {  useEffect, useState, useRef} from 'react'
import axios from 'axios'

const RightSideNav = ({userHeaders}) => {
    const [message, setMessage] = useState([])
    const [updateMessageList, setUpdateMessageList] = useState(true)
    let dmRef = useRef(null)
    const url = 'https://slackapi.avionschool.com'

        // console.log(userHeaders)

        const addMessage = (e) => {
            e.preventDefault()
          axios.post(`${url}/api/v1/messages`, {    
              'receiver_id': 433,
            //   'receiver_id': 663,
              'receiver_class': "User",
              'body': dmRef.current.value,
          }, userHeaders)
    
              .then((response) => {
                  getMessage()
                  console.log(response.data)
                  alert('message sent');
                  dmRef.current.value=''
              })
              .catch((error) => alert(error))
            }
            

        const getMessage = () => {

            setMessage([])
            axios.get(`${url}/api/v1/messages?receiver_id=433&receiver_class=User`, userHeaders)
            // axios.get(`${url}/api/v1/messages?receiver_id=663&receiver_class=User`, userHeaders)
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
           
        
    return (
        <>
        <div className="relative min-h-screen flex">
            <div className="bg-primary text-secondary w-64">
            <h1 className='text-center font-bold'>MEMBERS</h1>

            <form>
            <input
                className="message-input"
                placeholder="Send a message..."
                type='text'
                ref={dmRef}
            />    
            <button onClick={addMessage} type="submit" className="send-button" >SEND</button>
            </form>
            {message.map((messages) => (
                <ul>
                {messages.body}
                </ul>
            ))}  
            </div>        
        </div>       
        </>
    )
}

export default RightSideNav
