import React, { useState } from "react";
import {UserGroupIcon} from '@heroicons/react/solid'
import {StarIcon} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/outline'
import {LockClosedIcon} from '@heroicons/react/outline'


const Modal = ({userHeaders}) => {

  const [showModal, setShowModal] = useState(false);
  
  
  return (
    <>
      <button 
        className="text-white active:text-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <UserGroupIcon className="h-6 w-6"/>
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className='flex justify-evenly items-center content-center'>
                    {/* <div><LockClosedIcon /></div> */}
                    <span>🔒 </span>
                    <span className="text-2xl text-black font-semibold px-1"> 
                    {/* CHAT NAME ☆ ⚝*/}
                    CHANNEL NAME
                    </span>
                  </div>
                  
                  <span className="text-gray-500" >Members</span>
                  
                </div>
                {/*body*/}     
                <div className="relative p-6 flex-auto">
                <p className="my-4 text-black text-lg leading-relaxed">
                    <ul>
                        <li>1. Member Member Member Member</li>
                        <li>1. Member Member Member Member</li>
                        <li>1. Member Member Member Member</li>                
                    </ul>
                </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-secondary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal