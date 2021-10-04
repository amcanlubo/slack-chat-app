import React from 'react'
import {BellIcon} from '@heroicons/react/outline'
import {CheckIcon} from '@heroicons/react/outline'
import {ExclamationIcon} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/outline'

const Toast = ({type, children, onClick}) => {
    return (
        <div>
            <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
            <span className="text-xl inline-block mr-5 align-middle">
                <BellIcon />
            </span>
            <span className="inline-block align-middle mr-8">
                <b className="capitalize">pink!</b> This is a pink alert - check it out!
            </span>
            <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                <XIcon />
            </button>
            </div>
        </div>
    )
}

export default Toast

// bg-emerald-500
// bg-red-500
// bg-amber-500
