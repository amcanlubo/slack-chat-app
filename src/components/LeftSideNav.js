import React from 'react'
import CreateChannel from './CreateChannel'

const LeftSideNav = () => {
    return (
        <div>
            <div className="flex-none w-56 h-full flex-col bg-primary">
            <div className="flex-col justify-center">
                <CreateChannel />
            </div>
            </div>
        </div>
    )
}

export default LeftSideNav
