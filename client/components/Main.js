import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Sidebar from './Sidebar'
import chatNavbar from './chatNavbar'
import MessagesList from './MessagesList'

export default class Main extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <chatNavbar />
        <main>
          <Switch>
            <Route path="/channels/:channelId" component={MessagesList} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    )
  }
}
