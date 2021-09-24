import React, { useHistory, useRef } from 'react';
import { loginUser } from '../API/fetchPost'
// import {useFetchGet} from '../API/fetchGet'
// import axios from 'axios';


const Login = () => {

    // let history = useHistory ()
    let signinEmailRef = useRef(null)
    let signinPasswordRef = useRef(null)
    const url = '/api/v1/users'
    
    
const handleLogin = (e) => {
    e.preventDefault() 
    const userData= {
        email: signinEmailRef.current.value,
        password: signinPasswordRef.current.value,
    }

    loginUser(userData)
        .then((data) => {
        console.log(data)
        alert("You are logged in.");
        signinEmailRef.current.value =''
        signinPasswordRef.current.value =''
        })
        .catch((error) => alert(error));
    }


    return (
        <>
        <div className="container w-full max-w-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-Lato bg-primary" onSubmit={handleLogin}>
            <div className="mb-4 flex-col">
            <h1 className="text-gray-700 text-xl text-center font-bold mb-2" >SIGN IN</h1>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2" >
                Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" placeholder="enter email" ref={signinEmailRef} />
            </div>
            <div className="mb-6">
            <label htmlFor="password"   className="block text-gray-700 text-sm font-bold mb-2" >
                Password
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" placeholder="enter password" ref={signinPasswordRef} />
            </div>
            
            <div className="flex items-center justify-between">
                <button className="bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit">Sign In
                </button>   
            </div>
            <div className="signup-caption">
            No account yet?
            <div>Sign up here</div>
            {/* <div onClick={() => history.push("/signup")}>Sign up here</div> */}
        </div>
        </form>       
        </div>
        
        
        
        </>
       
    )
}

export default Login
