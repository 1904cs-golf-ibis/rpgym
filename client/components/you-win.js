import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class YouWin extends Component {
  render() {
    return (
      <div className="win_lose_container">
        <div className="win_lose_containee">
          Congratulations! You won the battle.
        </div>
        <div className="win_lose_containee">You gained 570 XP</div>
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
