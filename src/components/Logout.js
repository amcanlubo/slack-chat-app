import { useHistory } from "react-router";

const Logout = ({status, updater}) => {

    const history = useHistory();
    
    function clear() {
        // Clear the headers
        sessionStorage.clear();
        history.push('/login')    
    }
   
    return (
        <>
            <span className='logout' onClick={clear}>Logout</span>
        </>
    )
}

export default Logout