import React, { useState, useEffect, useContext} from 'react'
import { Context } from './Store';
import axios from 'axios'
import {SearchIcon} from '@heroicons/react/outline'
import {PlusIcon} from '@heroicons/react/outline'



const UserSearchBar = ({ users, userHeaders, setMembers }) => {
    // console.log(userHeaders)
    
    let uids = []
    users.map((user) => uids.push(user.uid))
    // console.log(users)
    setMembers(users)
    
    const [state, dispatch] = useContext(Context);
    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState('');
    const url = 'https://slackapi.avionschool.com'
    const [updateMemberList, setUpdateMemberList] = useState(true)
    const [useremail, setUseremail] = useState('');


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    function cleanInput(input) {
        return input.replace(/[\\/:*?"<>|]/g, function (ch) {
            return "__i!__" + ch.charCodeAt(0) + "__!i__";
        });
    }


    const handleSearchClick = (user) => {
        setSearchInput(user)
        setSearchOutput(false)
    }

    const formOnFocus = () => {
        setSearchOutput(true)
    }

    async function formOnFocusOut(){
        await sleep(500)
        setSearchOutput(false)
    }

    useEffect(() => {
        let value = searchInput.toLowerCase()
        let result = []
        result = uids.filter((uid) => {
            return uid.search(cleanInput(value)) !== -1;
        })
        setFilteredData(result)
        
        users.forEach(function (item) {
            if (item.uid === searchInput){
                setUseremail(item)
            } 
        })
            console.log(useremail)
    }, [searchInput])


    const addMember = (e) => {
        e.preventDefault()
        axios.post(`${url}/api/v1/channel/add_member`, {    
          'id':state.ChatInfo.ID,
          'member_id':useremail.id,
         }, userHeaders)

          .then((response) => {
            //   getMembers()
              updateMemberList ? setUpdateMemberList(false) : setUpdateMemberList(true)
              setMembers(updateMemberList)
            //   console.log(response.data)
              alert("User is added to this channel!");
              setSearchInput('')
            
          })
          .catch((error) => alert(error))
        }
        

        
    return (
        <>
                <div className="form-control">
                        <label className="label">
                        <span className="label-text">Add members</span>
                    </label> 
                    <div className="relative">
                        <input 
                        placeholder="Add a member" 
                        className="w-full pr-16 input input-primary input-bordered" type="text"
                        value={searchInput}
                        onFocus={() => { formOnFocus() }}
                        onBlur={()=>{
                            formOnFocusOut()
                        }}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }} /> 
                        <button onClick={addMember} type='submit' className="h-full absolute top-0 right-0 rounded-l-none btn btn-primary bg-secondary text-primary hover:text-white">
                        <PlusIcon className='h-full' /></button>
                    </div>
                </div> 

                {/* <input 
                className="h-6 w-full"
                placeholder="add a member"
                type="text" value={searchInput}
                onFocus={() => { formOnFocus() }}
                onBlur={()=>{
                    formOnFocusOut()
                }}
                onChange={(e) => {
                    setSearchInput(e.target.value)

                }} /> */}

            {/* <button onClick={addMember} type='submit' 
            className="bg-secondary text-white font-bold py-.5 px-4 rounded focus:outline-none focus:shadow-outline">
            +</button>  
            </div> */}
            <div>
                {searchOutput ? <ul className='overflow-auto h-40 z-10 pt-2' >{filteredData.map((user, index) => (
                    <li key={index} ><button onClick={() => { handleSearchClick(user) }}>{user}</button></li>
                ))

                }</ul> : <></>}
            </div>
        {/* </div> */}
            {/* <input 
                className="h-6"
                placeholder="add a member"
                type="text" value={searchInput}
                onFocus={() => { formOnFocus() }}
                onBlur={()=>{
                    formOnFocusOut()
                }}
                onChange={(e) => {
                    setSearchInput(e.target.value)

                }} />

            <button onClick={addMember} type='submit' 
            className="bg-secondary text-white font-bold py-.5 px-4 rounded focus:outline-none focus:shadow-outline">
            +</button> */}
            {/* <div>

                {searchOutput ? <ul className='overflow-auto h-40 z-10' >{filteredData.map((user, index) => (
                    <li key={index} ><button onClick={() => { handleSearchClick(user) }}>{user}</button></li>
                ))

                }</ul> : <></>}
            </div> */}
        </>
    )
}

export default UserSearchBar
