import React, {  useContext, useEffect, useState, useRef} from 'react'
import { Context } from './Store';
import axios from 'axios'
import UserSearchBar from './UserSearchBar'

const RightSideNav = ({userHeaders}) => {
    
    let userRef = useRef(null)
    const [state, dispatch] = useContext(Context);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    // const [memberlist, setMemberlist] = useState([]);
    const [updateMemberList, setUpdateMemberList] = useState(true)
    const url = 'https://slackapi.avionschool.com'

    

        const addMember = (e) => {
            e.preventDefault()
            axios.post(`${url}/api/v1/channel/add_member`, {    
            //   'id':'805',
              'id':state.ChannelInfo.channelID,
            //   'member_id':'433',
              'member_id':'526',
            //   'member_id':userRef.current.value,
             }, userHeaders)
    
              .then((response) => {
                //   getMembers()
                  updateMemberList ? setUpdateMemberList(false) : setUpdateMemberList(true)
                  console.log(response.data)
                  alert("User is added to this channel!");
                //   userRef.current.value=''
              })
              .catch((error) => alert(error))
            }
            
        let userlist=[]
        let memberlist=[]
           
        const getMembers = () => {

            axios.get(`${url}/api/v1/channels/${state.ChannelInfo.channelID}`, userHeaders)
                .then((response) => {
                    setMembers([])
                    if (response.data.errors) return null;
                    response.data.data.channel_members.map((user) => setUsers((users) => [...users, user]))
                   
                    console.log(response)
                    return users
                     
                })
                .catch((error) => {
                    console.log(error);
                })
                memberlist = users
                // memberlist = users
                // setMemberlist(users)
                return memberlist
            }
               
        useEffect(() => {
            // fetchData()
            getMembers()
        }, [state])


        useEffect(() => {
            axios.get(`${url}/api/v1/users`, userHeaders)
                .then((response) => {
                    // console.log(response.data)
                    // setUsers(response.data?.data)
                    setUsers(response.data?.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }, [])
    
        // let array=[]
    
        // const fetchData = () => {
            
        //     axios.get(`${url}/api/v1/users`, userHeaders)
        //     .then ((response) => {
        //         userlist = response.data.data
        //         // console.log(userlist)
               
        //         memberlist.forEach(function(member){
        //             userlist.forEach(function (item) {
        //                 if (item.id === member.user_id){
        //                     array.push(item.uid)
        //                 } 
        //             })                    
        //         })
        //         array.map((member) => setMembers((members) => [...members, member]))
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })   
        //     return members
        // }
        
        
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
            <UserSearchBar users={users} type='text'/>
            <button onClick={addMember} type='submit' 
            className="bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            +</button>
            

            {/* <div className= 'flex bg-primary w-30'>
                <div className = 'flex-col w-30'>       
                {members.map((member) => (
                <ul>
                {member}
                </ul>
                ))}  
                </div>        
            </div>         */}
            </div>        
        </div>       
        </>
    )
}

export default RightSideNav


