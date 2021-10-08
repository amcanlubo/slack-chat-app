import React from 'react'
import { useState } from 'react'
import {MenuIcon} from '@heroicons/react/outline'



const Mobilemenu = () => {
  
  const [isOpen, setisOpen] = useState(false);

  function handleClick() {
    setisOpen(!isOpen);
  }
  
  return (

    <button
      className="flex flex-col h-12 w-12 justify-center items-center"
      onClick={handleClick}
    >  
    <MenuIcon />
    </button>
  );
};

export default Mobilemenu
