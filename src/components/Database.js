import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useFetchGet } from '../API/fetchPost'

const Database = () => {

    const [userData, setuserData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios({   
            url: 'api/v1/users',
            data: {},
            headers: {
                'access-token': "Yda9SCUwjEJxqfuwgX8JJQ",
                'client': "aHP2F5jrc4HiwMUiKjwU0w",
                'expiry': "1634122508",
                'uid': "sean1@gmail.com"
            },
            method: 'GET'      
        })
        .then ((response) => {
            setuserData(response.data?.data)
            console.table(userData)
            console.log(userData)
            // console.log(userData[0].email)
            
        })
        .catch((error) => {
            console.error(error)
        })
    
    }
  
    return (
       <>
        <div className='h-screen bg-white'>
            <h1 className="text-gray-700 text-xl text-center font-bold mb-2">Data Base</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
             onClick={fetchData}>CONSOLE USERS
            </button>
        </div>         

        <div className="mx-auto p-10 w-9/12">
            {userData.length 
            ? 
            <>
            <h2 className="text-center font-bold text-2xl text-gray-600 uppercase  font-Lato ">All Users</h2>
            <div className="shadow border-b border-gray-200 sm:rounded-lg mt-8">       
              <table className="min-w-full divide-y divide-gray-200" id="all-transactions-table"> 
                <thead className="bg-gray-50">
                  <tr>
                    <th className="cstm-th  text-gray-400" >User ID</th>
                    <th className="cstm-th  text-gray-400">EMAIL</th>       
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.map((user) => (
                  <tr key={user.id}>
                    <td className="cstm-td"><p className="cstm-td-text">#{user.id}</p></td>
                    <td className="cstm-td">
                    <span className="capitalize td-centered-text">{user.email}</span>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>   
            </div>   
            </>
            : <div className="mt-14 py-20 rounded-md bg-white">
            <p className="mx-auto text-center">No accounts.</p>
          </div>
        }   
        </div>
        </>
    )
}

export default Database

//206.189.91.54/api/v1/users
//206.189.91.54/api/v1/auth
//206.189.91.54/api/v1/auth/sign_in
//206.189.91.54/api/v1/channels
//206.189.91.54/api/v1/channels/291
//206.189.91.54/api/v1/channel/add_member
//206.189.91.54/api/v1/channels
//206.189.91.54/api/v1/messages?receiver_id=291&receiver_class=Channel
//206.189.91.54/api/v1/messages?receiver_id=224&receiver_class=User
//206.189.91.54/api/v1/messages
//206.189.91.54/api/v1/messages