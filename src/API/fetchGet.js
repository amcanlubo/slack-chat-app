import { useState, useEffect} from 'react'

const useFetchGet = (url, headers) => {
const [data, setData] = useState(null);
const [isPending, setIsPending] = useState(true);
const [error, setError] = useState(null)
useEffect(() => {
  setIsPending(true);
    setTimeout(() => {
        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(error => {
            setIsPending(false);
            setError(error);
        })
    },1000);
// eslint-disable-next-line
}, [url]);
    return { data, isPending, error}
}

export default useFetchGet;

//'http://206.189.91.54//api/v1/users'
//'http://206.189.91.54//api/v1/messages?receiver_id={Reciever-ID}&receiver_class={User || Channel}'
//'http://206.189.91.54//api/v1/channels'
//'http://206.189.91.54//api/v1/channels/{channel.id}'