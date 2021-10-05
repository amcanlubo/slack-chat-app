import React, { useRef, useState } from 'react'
// import { useHistory } from 'react-router';
import axios from 'axios'
import chimmy from '../images/chimchimmmm.png'
import {XIcon} from '@heroicons/react/outline'


function Signup({setshowSignupModal}) {

    // let history = useHistory()
    let emailRef = useRef(null)
    let passwordRef = useRef(null)
    let confirmpasswordRef = useRef(null)
    const [image, setImage] = useState(null)
    

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

                emailRef.current.value=''
                passwordRef.current.value=''
                confirmpasswordRef.current.value=''
            })
            .catch((error) => console.error(error));
    }

    // const handleOnClick = () => {
    //     history.push('/login')
    // }

    const handleUpload = (event) => {
        setImage({ files: event.target.files, text: '' });
      };


    return (
        <div className="z-50 container w-full max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <form className="bg-white shadow-md rounded-lg px-8 pt-8 pb-8 mb-4 font-Lato bg-primary" onSubmit={handleSignup}>
                
                <div className='relative bottom-5 right-2 w-full flex justify-between items-center content-center'>

                    <img src={chimmy } alt='chimchim' className='h-28' />  
                    <h1 className="text-secondary text-xl font-bold" >CREATE AN ACCOUNT</h1>   
                    <button
                    className="bg-transparent border-0 text-secondary text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setshowSignupModal(false)}
                    >
                    <XIcon className='h-8 rounded-full flex items-center justify-center hover:bg-white hover:rounded-full transform hover:scale-110'/>      
                    </button>  
                </div>

                <div className="mb-6 flex-col">
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
                {/* Upload Image */}
                <label htmlFor="upload-button">
                <span className="image-button">
                {/* <PictureOutlined className="picture-icon" /> */}
                </span>
                </label>
                <input
                    type="file"
                    multiple={false}
                    id="upload-button"
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                />

                <div className="flex items-center justify-between">
                    <button
                        className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:text-white "
                        type="submit">
                        Sign Up
                    </button>
                </div>
                    {/* <div className="signup-caption">
                        Already have an account?
                        <div onClick={handleOnClick}>Log In</div>
                    </div> */}
            </form>
        </div>
    )
}

export default Signup