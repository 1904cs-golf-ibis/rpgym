import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class YouLose extends Component {
  constructor() {
    super()
    this.resetIsDefeated = this.resetIsDefeated.bind(this)
  }

  componentDidMount() {
    this.resetIsDefeated(this.props.stravaId)
  }

  async resetIsDefeated(curUserStravaId) {
    const {data} = await axios.put(`/api/users/${curUserStravaId}`, {
      isDefeated: false
    })
  }

  render() {
    return (
      <div className="win_lose_container">
        <div className="win_lose_containee">You lost the battle...</div>
        <br />
        <div className="win_lose_containee">
          Perhaps this is a good time to workout and level up!
        </div>
        <br />
        <div className="win_lose_containee">
          Your health has been fully restored.
        </div>
        <br />
        <br />
        <br />
        <NavLink className="win_lose_containee" to="/leaderboard">
          Back to Leaderboard
        </NavLink>
      </div>
    )
  }
}
