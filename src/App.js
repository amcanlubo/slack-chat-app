import React from 'react'
import Store from './components/Store'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Login from './components/Login';
import Signup from './components/Signup';
// import Database from './components/Database';
import ChatFeed from './components/ChatFeed';
// import DirectMessage from './components/DirectMessage';
import Homepage from './components/Homepage';
import PageNotFound from './components/PageNotFound';
import Welcome from './components/Welcome';

const App = () => {
  
  axios.defaults.baseURL = 'https://slackapi.avionschool.com/';

  return (
    <>
      <Store>
        <Switch>
          <Route exact path="/welcome"><Welcome /></Route>
          <Route exact path="/home"><Homepage /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/chatfeed"><ChatFeed /></Route>
          <Route exact path="/"><Homepage /></Route>
          <Route exact path = "*"><PageNotFound /></Route>
        </Switch>
      </Store>
      <ToastContainer />
    </>
  )
}

export default App

