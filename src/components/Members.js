import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from './Store';
import axios from 'axios'
import { XIcon } from '@heroicons/react/outline'
import Select from 'react-select';
import { toast } from 'react-toastify';

//Modal
import { UserGroupIcon } from '@heroicons/react/solid'

const Members = ({ userHeaders }) => {
  // console.log(userHeaders)

  const [state, dispatch] = useContext(Context);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [names, setNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let selectOptions = useRef([])
  const [selectedOption, setSelectedOption] = useState()

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

  const handleSelectChange = (e) => {
    setSelectedOption(e.value)


  }

  const addMember = () => {
    axios.post(`${url}/api/v1/channel/add_member`, {
      'id': state.ChatInfo.ID,
      'member_id': selectedOption,
    }, userHeaders)

      .then((response) => {
        console.log(response)
        toast.success('User has been added!')
        setSelectedOption()
        //   getMembers()
        //   console.log(response.data)

      })
      .catch((error) => alert(error))
  }



  useEffect(() => {
    axios.get(`${url}/api/v1/users`, userHeaders)
      .then((response) => {
        setUsers(response.data.data)
        // console.log(response.data)
        response.data.data.map((user) => {
          selectOptions.current.push({
            value: user.id,
            label: user.uid
          })
        })
        console.log(selectOptions)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <>
      <button
        className="text-white active:text-primary font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 relative right-0"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <UserGroupIcon className="h-6 w-6" />
      </button>
      {showModal ? (
        <>
          <div
            className="text-black container  w-full max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 z-50 outline-none focus:outline-none"
          >
            {/* <div
            className="text-black z-50 container  w-full max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          > */}
            <div className="relative w-auto my-6 mx-auto max-w-4xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                  <div className='w-full flex justify-between items-center content-center'>

                    <div className='flex justify-between items-center px-6 content-center' >
                      <span className="text-3xl font-semibold">
                        {state.ChatInfo.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-secondary background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        <XIcon className='h-6 w-6' />
                      </button>
                    </div>

                  </div>

                <div className="relative  p-6 flex flex-col max-h-72">
                  <span className="text-gray-500">Members</span>
                  <div className='z-10 overflow-y-auto my-3'>
                    {names.map((member) => (
                      <ul className="my-4 overflow-auto text-sm z-0">
                        {member.uid}
                      </ul>
                    ))}
                  </div>
                  <div>
                    <Select
                      options={selectOptions.current}
                      onChange={handleSelectChange}
                    />
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white w-14 h-7 px-2 mt-1 font-bold rounded" onClick={() => { addMember() }}>Add</button>
                  </div>
                </div>


                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-secondary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <XIcon className='h-6 w-6'/>    
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>

  )
}

export default Members

