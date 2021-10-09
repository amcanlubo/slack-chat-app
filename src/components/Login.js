import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import chimchim from '../images/chim2.png'
import chatbubble from '../images/chatbubble.png'
import { XIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify';


const Login = ({ setShowLoginModal }) => {


    const [rememberme, setRememberMe] = useState(false)

    let history = useHistory()
    let signinEmailRef = useRef(null)
    let signinPasswordRef = useRef(null)
    const url = 'https://slackapi.avionschool.com'


    const handleLogin = (e) => {

        e.preventDefault()

        const userData = {
            email: signinEmailRef.current.value,
            password: signinPasswordRef.current.value,
        }


        axios.post(`${url}/api/v1/auth/sign_in`, userData)
            .then((data) => {
                toast.success('You successfully logged in')
                const { headers } = data

                history.push({
                    pathname: '/chatfeed',
                    state: { headers }


                })
                //save to session storage and local storage
                sessionStorage.setItem('headers', JSON.stringify(data))

                if (rememberme) {
                    localStorage.email = userData.email
                    localStorage.password = userData.password
                }

                console.log(data)
            })

            // .catch((error) => alert(error));  
            .catch((error) => toast.error('Check errors'))
    }


    return (
        <>

            <div className="z-50 container  w-full max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                <form className="bg-white shadow-md h-screen mobile:h-auto rounded-lg px-8 py-2 pt-12 pb-8 mb-4 font-Lato bg-primary"
                    onSubmit={(e) => { handleLogin(e) }}>


                    <div className='w-full flex items-center relative bottom-2'>
                        <span
                            className="bg-transparent border-0 text-secondary text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={(e) => {
                                e.preventDefault()
                                setShowLoginModal(false)
                            }}>
                            <XIcon className='h-8 w-8 mb-16 rounded-full flex items-center justify-center hover:bg-white hover:rounded-full transform hover:scale-110' />
                        </span>
                        <div className="flex justify-between pt-12 mobile:pt-0 mobile:w-3/4">
                            <img src={chimchim} alt='chimchim' className='relative h-28 mobile:left-16' />
                            <img src={chatbubble} alt='chatbubble' className='relative bottom-2 right-8 mobile:right-0 h-24 mobile:h-28' />
                        </div>
                    </div>

                    <div className='relative bottom-2'>

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

                        <div className='h-12 justify-center items-center content-center'>

                            <input type="checkbox"
                                className='mr-2'
                                checked={rememberme}
                                onChange={() => { setRememberMe(!rememberme) }}
                            />

                            <span className="checkmark">Keep me logged in</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:text-white"
                            >Sign In
                            </button>
                        </div>

                    </div>
                </form>


            </div>

        </>

    )
}

export default Login