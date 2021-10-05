import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import chimchim from '../images/chim2.png'
import chatbubble from '../images/chatbubble.png'
import {XIcon} from '@heroicons/react/outline'



const Login = ({setShowLoginModal}) => {

    let history = useHistory()
    let signinEmailRef = useRef(null)
    let signinPasswordRef = useRef(null)
    // const [error, setError] = ('')
    // const [toastMessage, setToastMessage] = useState('');
    // const [showToast, setShowToast] = useState('');
    const url = 'https://slackapi.avionschool.com'


    const handleLogin = (e) => {

        e.preventDefault()

        const userData = {
            email: signinEmailRef.current.value,
            password: signinPasswordRef.current.value,
        }


        axios.post(`${url}/api/v1/auth/sign_in`, userData)
            .then((data) => {
                const { headers } = data
                
                history.push({
                    pathname: '/chatfeed',
                    state: { headers }
                })
                //save to session storage
                sessionStorage.setItem('headers', JSON.stringify(data))
                console.log(data)
            })
            // .catch((error) => alert(error));
            .catch((error) => console.error(error));  
    }

    // const handleOnClick = () => {
    //     history.push('/signup')
    // }

    return (
        <>
            <div className="z-50 container w-full max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                
                    <button
                        className="bg-transparent border-0 text-secondary text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={(e) =>{e.preventDefault()
                        setShowLoginModal(false)}}
                        >
                        <XIcon className='h-8 w-8 mb-16 rounded-full flex items-center justify-center hover:bg-white hover:rounded-full transform hover:scale-110'/>      
                    </button>  
                <form className="bg-white shadow-md rounded-lg px-8 py-2 pt-6 pb-8 mb-4 font-Lato bg-primary" 
                onSubmit={(e)=>{handleLogin(e)}}>
                    
                    <div className='w-full flex justify-between items-center relative bottom-2'>    
                        <img src={chimchim} alt='chimchim' className='relative left-16 h-28' />
                        <img src={chatbubble} alt='chatbubble' className='relative bottom-2 h-28' />
                        
                        
                    </div>
                    
                    <div className='relative bottom-2'>
                    {/* <h2 className='font-bold'>To get started, first enter your email and password</h2> */}

                    <div className="mb-6 flex-col">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email" placeholder="enter email" ref={signinEmailRef} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password" placeholder="enter password" ref={signinPasswordRef} />
                    </div>

                    <div className="flex items-center justify-between">

                    <button className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:text-white"
                    >Sign In
                    </button>
                    </div>
                    {/* <span className="signup-caption mr-1">Don’t have an account?</span>
                    <span className="font-bold" onClick={handleOnClick}>Sign up here</span>
                    */}
                    </div>
                </form>
                    {/* <button
                        className="bg-transparent border-0 text-secondary text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={(e) =>{e.preventDefault()
                        setShowLoginModal(false)}}
                        >
                        <XIcon className='h-8 w-8 mb-16 rounded-full flex items-center justify-center hover:bg-white hover:rounded-full transform hover:scale-110'/>      
                    </button>   */}
            </div>

        </>

    )
}

export default Login