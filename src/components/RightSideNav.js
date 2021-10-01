import React, {  useContext, useEffect, useState } from 'react'
// import React, {  useContext, useEffect, useState } from 'react'
import { Context } from './Store';
import axios from 'axios'
import UserSearchBar from './UserSearchBar'

const RightSideNav = ({userHeaders}) => {
    // console.log(userHeaders)
    // let userRef = useRef(null)
    const [state, dispatch] = useContext(Context);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [names, setNames] = useState([]);
    // const [memberlist, setMemberlist] = useState([]);
    
    const url = 'https://slackapi.avionschool.com'

       
        // let memberlist=[]
        let array=[]
        const getMembers = () => {
            
            // setNames([])
            axios.get(`${url}/api/v1/channels/${state.ChannelInfo.channelID}`, userHeaders)
                .then((response) => {
                    setMembers([])
                    if (response.data.errors) return null;
                    // response.data.data.channel_members.map((member) => setMembers((members) => [...members, member]))
                    setMembers(response.data.data.channel_members)
                    console.log(members)
                    // return members

                    
                })
                .catch((error) => {
                    console.log(error);
                })

                
                members.forEach(function(member){
                    users.forEach(function (item) {
                        if (item.id === member.user_id){
                            array.push(item)
                        } 
                    })                    
                })
                // memberlist = [members]
                setNames(array)
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
            {/* <form> */}
            {/* <input
                className="message-input"
                type="email"
                name="email"
                placeholder="Add more members"
                ref={ userRef }
            />     */}
            {/* <button onClick={addMember} type="submit" className="send-button" >ADD</button> */}
            
            {/* <UserSearchBar users={users} type='text'/> */}
            {/* <UserSearchBar users={users} ref={userRef} /> */}
            <UserSearchBar users={users} userHeaders={userHeaders}/>
         
            
            <div className= 'flex bg-primary w-30'>
                <div className = 'flex-col w-30'>
            
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


