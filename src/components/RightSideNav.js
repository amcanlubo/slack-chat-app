import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Store';
import axios from 'axios'
import UserSearchBar from './UserSearchBar'

//Modal
import {UserGroupIcon} from '@heroicons/react/solid'

const RightSideNav = ({ userHeaders }) => {
    // console.log(userHeaders)


    const [state, dispatch] = useContext(Context);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [names, setNames] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
// console.log(state.ChatInfo.name)
    const url = 'https://slackapi.avionschool.com'
    let array = []
    // console.log(state)
    const getMembers = () => {

        axios.get(`${url}/api/v1/channels/${state.ChatInfo.ID}`, userHeaders)

            .then((response) => {
                if (response.data.errors) return null;
                // response.data.data.channel_members.map((member) => setMembers((members) => [...members, member]))
                
                // return members
                response.data.data.channel_members.forEach(function (member) {
                    users.forEach(function (item) {
                        // if (item.id === member.nickname) {
                        if (item.id === member.user_id) {
                            array.push(item)
                            // console.log(array)
                        }
                    })
                })
                setNames(array)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMembers()
    }, [state, members])


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

            {/* <div className="relative min-h-50 flex">
                <div className="bg-primary w-64"> */}
                    {/* <h1 className='text-center font-bold'>MEMBERS</h1> */}

                    {/* <UserSearchBar users={users} userHeaders={userHeaders} />

                    <div className='flex bg-primary w-30'>
                        <div className='flex-col w-30'>

                            {names.map((member) => (
                                <ul>
                                    {member.uid}
                                </ul>
                            ))}
                        </div>
                    </div>


                </div>
            </div> */}

            <>
      <button 
        className="text-white active:text-primary font-bold uppercase text-sm px-6 py-3  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 relative right-0"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <UserGroupIcon className="h-6 w-6"/>
      </button>
      {showModal ? (
        <>
          <div
            className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className='flex justify-evenly items-center content-center'>
                    {/* <div><LockClosedIcon /></div> */}
                    <span>🔒 </span>
                    <span className="text-3xl  font-semibold px-1"> 
                    {state.ChatInfo.name} 
                    </span>
                  </div>
                  
                  <span className="text-gray-500">Members</span>
                  
                </div>
                {/*body*/}     
                

                <div class="relative p-6 flex-auto">
                    <div className='z-10'>
                    <UserSearchBar users={users} userHeaders={userHeaders} setMembers={setMembers} />
                    </div>
                    {names.map((member) => (
                        <ul className="my-4 text-blueGray-500 text-sm z-0">
                            {member.uid}
                        </ul>
                    ))}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-secondary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
        </>
    )
}

export default RightSideNav


