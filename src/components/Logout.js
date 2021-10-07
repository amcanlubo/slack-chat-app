import { useHistory } from "react-router";
import { useState } from "react";

const Logout = ({userHeaders}) => {

    const history = useHistory();
    const [headers, setHeaders] = useState({userHeaders})
       
    function clear() {
        setHeaders([])
        window.location.reload()
        sessionStorage.clear();
        localStorage.clear();
        history.push('/')   
    }
   
    return (
        <>
            <span className='text-primary text-sm' onClick={clear}>Logout</span>
        </>
    )
}

export default Logout