import React, {Component} from 'react'

import GlobalUsers from './global-ldb-users'

export default class Leaderboard extends Component {
  render() {
    return (
      <div>
        <br />
        <h1 align="center">Leaderboard</h1>
        <GlobalUsers />
      </div>
    )
  }
}
