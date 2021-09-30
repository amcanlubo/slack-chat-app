import React, { useState, useEffect } from 'react'

const UserSearchBar = ({ users }) => {

    let uids = []
    users.map((user) => uids.push(user.uid))

    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState('');

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
        await sleep(100)
        setSearchOutput(false)
    }

    useEffect(() => {
        let value = searchInput.toLowerCase()
        let result = []
        result = uids.filter((uid) => {
            return uid.search(cleanInput(value)) !== -1;
        })
        setFilteredData(result)

    }, [searchInput])



    return (
        <>
            <input type="text" value={searchInput}
                onFocus={() => { formOnFocus() }}
                onBlur={()=>{
                    formOnFocusOut()
                }}
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }} />
            <div>
                {searchOutput ? <ul>{filteredData.map((user, index) => (
                    <li key={index}><button onClick={() => { handleSearchClick(user) }}>{user}</button></li>
                ))

                }</ul> : <></>}
            </div>
        </>
    )
}

export default UserSearchBar
