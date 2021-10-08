import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

// components
import Login from './Login'
import Signup from './Signup';

// Images
import BT21 from '../images/BT21.gif'
import logo from '../images/bubble.png'



const Homepage = () => {

    let history = useHistory()
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setshowSignupModal] = useState(false);
    
    useEffect(() => {
       
       if(localStorage.email && localStorage.password)
       handleLoggedIn()
    }, [])
    
    
    const handleLoggedIn =() => {
        
        const userData = {
            email: localStorage.email,
            password: localStorage.password,
        }

        // console.log(userData)
        axios.post(`${axios.defaults.baseURL}/api/v1/auth/sign_in`, userData)
        
            .then((data) => {     
                // toast.success('You successfully logged in')
                const { headers } = data
                
                history.push({
                    pathname: '/chatfeed',
                    state: { headers }
                })
                //save to session storage and local storage
                sessionStorage.setItem('headers', JSON.stringify(data))
                // localStorage.setItem('user', JSON.stringify(userData.email))
                // localStorage.setItem('password',JSON.stringify(userData.password))
                // console.log(data)
            })
            .catch((error) => toast.error('Invalid credentials'))
    }

    return (
        <div className="flex justify-between container m-auto h-screen">
            
            <div className="p-10 flex flex-col justify-around  items-center content-center w-6/12 bg-white">                
                <img src={BT21} alt='illustration' className='h-3/4'/>           
            </div>
            
            <div className="flex-grow flex bg-primary justify-center items-center content-center">
                <div className='text-secondary flex flex-col justify-center items-center content-center rounded-xl bg-white roundedx p-10'>
                    <img src={logo} alt='logo' className='h-80'/>
                    <button onClick={() => setShowLoginModal(true)}
                    className="bg-secondary px-5 py-3 w-40 text-primary transition ease-in-out duration-150
                    font-bold uppercase text-sm rounded-full hover:text-white motion-safe:hover:scale-110" type="button">Sign in</button>

            {showLoginModal ? (
                <>
                <Login setShowLoginModal={setShowLoginModal}/>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div> 
                </>
            ) : <></>}
      
                            
            <span >Don’t have an account?</span>
            <span onClick={() => setshowSignupModal(true)} 
            className='font-medium text-secondary underline hover:font-bold hover:text-yellow-400'>
            Sign up here</span>


            {showSignupModal ? (
            <>
            <Signup setshowSignupModal={setshowSignupModal}/>
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div> 
            </>
            ) : <></>}

                </div>
            </div>
        </div>
    )
}

export default Homepage