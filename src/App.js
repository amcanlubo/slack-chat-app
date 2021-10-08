import React from 'react'
import Store from './components/Store'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Login from './components/Login';
import Signup from './components/Signup';
import ChatFeed from './components/ChatFeed';
import Homepage from './components/Homepage';


const App = () => {
  
  axios.defaults.baseURL = 'https://slackapi.avionschool.com/';

  return (
    <>
    <Router>
      <Store>
        <Switch>
          <Route exact path="/home"><Homepage /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/chatfeed"><ChatFeed /></Route>
          <Route exact path="/"><Homepage /></Route>
        </Switch>
      </Store>
      </Router>
      <ToastContainer theme='colored'/>
    </>
  )
}

export default App

