import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const CreateChannel = () => {
    let nameRef = useRef(null)
    const [channel, setChannel] = useState([])

    const url = 'https://slackapi.avionschool.com'
    
    useEffect(() => {
        axios({
            url: `${url}/api/v1/channels` ,
            data:{},
            headers:{
                'access-token': "MO9UKy71LT0MxUtUpkWw6Q",
                'expiry': "1633706450",
                'client': "-vYLlLy2GHyc_fGvMzupFw",
                'uid': "amc@email.com"
            },
            method: 'GET',
    }).then((response) => {
        setChannel(response.data?.data)
    }).catch((error) => {
        console.error(error);
    })
    }, [])

    

    const onCreateChannel =() => {

        const data = {
            name: nameRef.current.value,
            user_ids: 'amc@email.com',
        }

        axios({
            url: `${url}/api/v1/channels` ,
            data:data,
            headers:{
                'access-token': "MO9UKy71LT0MxUtUpkWw6Q",
                'expiry': "1633706450",
                'client': "-vYLlLy2GHyc_fGvMzupFw",
                'uid': "amc@email.com"
            },
            method: 'POST',

    }).then((response) => {
        setChannel(response.data?.data)
        console.log(channel)

    }).catch((error) => {
        console.error(error);

    })
        
    console.log(channel)
    }

    return (
        <div>
            <form 
                className='flex py-2 px-2'
                onSubmit={(e) => {
                e.preventDefault()
                onCreateChannel()
            }}>
                <label htmlFor='Name'></label>
                <input 
                className='w-40'
                ref={ nameRef }
                type='text'
                />
                <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                type='submit'>+</button>
            </form>

            <div className='px-2'>
                
                <span className='font-bold text-2xl'>CHANNELS</span>
                <br/>
                {channel.map((user) => (
                    <div>{user.name}</div>
                 ))}
                
            </div>
        </div>
    )
}

export default CreateChannel
