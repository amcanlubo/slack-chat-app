import React, { useEffect,useState } from 'react'
import axios from 'axios'

const RightSideNav = ({ userHeaders }) => {

    const [allUsers,setAllUsers] = useState([])

    useEffect(() => {
        axios.get(`${axios.defaults.baseURL}/api/v1/users`, userHeaders)
            .then((response) => {
                setAllUsers(response.data.data)
                
            })
            .catch((error)=>{alert(error)})
    }, [])

    return (
        <div>
            <div className="flex-none w-56 h-full flex-col bg-primary">
                <div className="justify-center">
                    {allUsers.map((user)=>(
                        <div>
                        <p>{user.uid}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightSideNav
