import React, {useState} from 'react'
// import { Redirect } from "react-router";
import { useHistory } from 'react-router';
import BT21 from '../images/BT21.gif'
import logo from '../images/bubble.png'
import Login from './Login'
import Signup from './Signup';



const Homepage = () => {
    let history = useHistory()
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setshowSignupModal] = useState(false);
    
    
       
    // const handleOnClick = () => {
    //     history.push('/signup')
    // }
     
  

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
                    active:bg-pink-600 font-bold uppercase text-sm rounded-full shadow" type="button">Sign in</button>

        {showLoginModal ? (
            <>
            <Login setShowLoginModal={setShowLoginModal}/>
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div> 
          </>
        ) : <></>}
      
                            
            <span >Don’t have an account?</span>
            {/* <span onClick={ handleOnClick } className='font-light'>Sign up here</span> */}
            <span onClick={() => setshowSignupModal(true)} className='font-medium underline'>Sign up here</span>


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
