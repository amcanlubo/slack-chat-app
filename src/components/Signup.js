import React, { useRef } from 'react'
// import { registerUser } from '../API/fetchPost'
import axios from 'axios'


function Signup() {
    let emailRef = useRef(null)
    let passwordRef = useRef(null)
    let confirmpasswordRef = useRef(null)
    const url = 'https://slackapi.avionschool.com'

    const handleSignup = (e) => {
        e.preventDefault()
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmpasswordRef.current.value,
        }

        axios.post(`${url}/api/v1/auth/`, data)
            .then((result) => {
                console.log(result)
                console.log(data)
                alert("You are registered.");
            })
            .catch((error) => console.error(error));
    }


    return (
        <div className="container w-full max-w-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-Lato bg-primary" onSubmit={handleSignup}>
                <h1 className="text-gray-700 text-xl text-center font-bold mb-2" >SIGN UP</h1>

                <div className="mb-4 flex-col">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2" >
                        Email
                    </label>
                    <input
                        ref={emailRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="enter email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" >
                        Password
                    </label>
                    <input
                        ref={passwordRef}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="enter password"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" >
                        Confirm Password
                    </label>
                    <input
                        ref={confirmpasswordRef}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="confirm password"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup
