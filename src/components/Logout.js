import { useHistory } from "react-router";
import { useState } from "react";

const Logout = ({userHeaders}) => {

    const history = useHistory();
    const [headers, setHeaders] = useState({userHeaders})
       

    
    function clear() {
        setHeaders([])
        // sessionStorage.clear();
        history.push('/login')   
    }
   
    return (
        <>
            <span className='text-white' onClick={clear}>Logout</span>
        </>
    )
}

export default Logout