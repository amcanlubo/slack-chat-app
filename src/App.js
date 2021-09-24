import React from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
//components
import Login from './components/Login';
import Signup from './components/Signup';
import Database from './components/Database';

const App = () => {
  
  axios.defaults.baseURL = 'https://slackapi.avionschool.com/';

  return (
    <div className='flex h-screen'>
      
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/database">
          <Database />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  )
}

export default App

