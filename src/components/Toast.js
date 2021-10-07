import React from 'react'
import { ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Toast = () => {
   
    toast.error('Check for errors')
    toast.success('Successful Login')
    toast.warn('Incorrect credentials')

    return (
      <div>
        <ToastContainer draggable={true} transition={Zoom} autoClose={5000} position={'top-center'}/>
      </div>
    );
  }

export default Toast
