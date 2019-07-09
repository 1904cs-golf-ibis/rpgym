import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class YouLose extends Component {
  render() {
    return (
      <div className="win_lose_container">
        <div className="win_lose_containee">You lost the battle...</div>
        <div className="win_lose_containee">
          Perhaps this is a good time to workout and level up!
        </div>
        <div className="win_lose_containee">
          Your health has been fully restored.
        </div>
        <NavLink className="win_lose_containee" to="/leaderboard">
          Back to Leaderboard
        </NavLink>
      </div>
    )
  }
}
