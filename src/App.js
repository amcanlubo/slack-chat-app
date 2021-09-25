import React, {useContext} from 'react'
import Store, { Context } from './components/Store'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
//components
import Login from './components/Login';
import Signup from './components/Signup';
import Database from './components/Database';
import ChatFeed from './components/ChatFeed';

const App = () => {
  
  axios.defaults.baseURL = 'https://slackapi.avionschool.com/';

  return (
    <div className='w-full flex h-screen'>
      <Store>
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
        <Route path="/chatfeed">
          <ChatFeed />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
      </Store>
    </div>
  )
}

export default App

