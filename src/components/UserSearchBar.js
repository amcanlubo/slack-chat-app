import React, { useState, useEffect, useContext} from 'react'
import { Context } from './Store';
import axios from 'axios'


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
        //   'id':'805',
        //   'id':state.ChannelInfo.channelID,
          'id':state.ChatInfo.ID,
        //   'member_id':'433',
        //   'member_id':'526',
          'member_id':useremail.id,
         }, userHeaders)

          .then((response) => {
            //   getMembers()
              updateMemberList ? setUpdateMemberList(false) : setUpdateMemberList(true)
              setMembers(updateMemberList)
            //   console.log(response.data)
              alert("User is added to this channel!");
            
          })
          .catch((error) => alert(error))
        }
        

        
    return (
        <>
            <input 
                className="h-6"
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
            +</button>
            <div>

                {searchOutput ? <ul className='overflow-auto h-40' >{filteredData.map((user, index) => (
                    <li key={index} className='overflow-auto'><button onClick={() => { handleSearchClick(user) }}>{user}</button></li>
                ))

                }</ul> : <></>}
            </div>
        </>
    )
}

export default UserSearchBar
