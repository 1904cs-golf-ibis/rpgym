import React, {Component} from 'react'
// import {connect} from 'react-redux'
import GlobalUsers from './global-ldb-users'

export default class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <GlobalUsers />
      </div>
    )
  }
}
