// import axios from 'axios';

// export const postAPI = (url, requestData) => {
//     axios.defaults.baseURL = 'http://206.189.91.54//api/v1/'
//     axios({
//         url:url,
//         data:requestData || {},
//         method: 'POST'
//     })
//     .then(response => {
//         console.log(response.data?.data)
//         console.log(response.headers)
//     })
//     .catch(error => {
//         console.log(error)
//     })
// }

  export const loginUser = (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email, password)
    };

    return fetch('http://206.189.91.54//api/v1/auth/sign_in', requestOptions)
    
    .then(async response => {
      
      const data = await response.json();
        if (!response.ok) {
          const error = (data && data.errors) || response.status;
           return Promise.reject(error);

        } else {
          const userData = {
            'access-token': response.headers.get("access-token"),
            client: response.headers.get("client"),
            expiry: response.headers.get("expiry"),
            uid: response.headers.get("uid"),
            id: data.data.id
          }
          return Promise.resolve(userData)
        }
    });
  }

  export const registerUser = (email, password, password_confirmation) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email, password, password_confirmation)
    };
    return fetch('http://206.189.91.54//api/v1/auth/', requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => error);
  }



  // export const createChannel = (headers, name, user_ids) => {
  //   const Form = new FormData()
  //     Form.set('name', name)
  //     Form.set('user_ids', user_ids)
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: headers,
  //     body: Form
  //   };
  //   return fetch('http://206.189.91.54//api/v1/channels', requestOptions)
  //   .then(response => response.json())
  //   .then(result => result)
  //   .catch(error => error);
  // }
  

  // export const addMember = (headers, id, member_id) => {
  //   const Form = new FormData()
  //   Form.set('id', id)
  //   Form.set('member_id', member_id)
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: headers,
  //     body: Form
  //   };
  //   return fetch('http://206.189.91.54//api/v1/channel/add_member', requestOptions)
  //   .then(response => response.json())
  //   .then(result => result)
  //   .catch(error => error);
  // }
   

  // export const sendMessage = (headers, receiver_id, receiver_class, body) => {
  //   const Form = new FormData()
  //   Form.set('receiver_id', receiver_id)
  //   Form.set('receiver_class', receiver_class)
  //   Form.set('body', body)
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: headers,
  //     body: Form
  //   };
  //   return fetch('http://206.189.91.54//api/v1/messages', requestOptions)
  //   .then(response => response.json())
  //   .then(result => result)
  //   .catch(error => error);
  // }



//'http://206.189.91.54//api/v1/users'
//'http://206.189.91.54//api/v1/messages?receiver_id={Reciever-ID}&receiver_class={User || Channel}'
//'http://206.189.91.54//api/v1/channels'
//'http://206.189.91.54//api/v1/channels/{channel.id}'