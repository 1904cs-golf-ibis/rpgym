import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class YouLose extends Component {
  constructor() {
    super()
    this.resetIsDefeated = this.resetIsDefeated.bind(this)
  }

  componentDidMount() {
    console.log(
      'componentDidMount this.props.stravaId: >>>>>>>>',
      this.props.stravaId
    )
    this.resetIsDefeated(this.props.stravaId)
  }

  async resetIsDefeated(curUserStravaId) {
    console.log('resetIsDefeated stravaId: >>>>>>>> ', curUserStravaId)
    const {data} = await axios.put(`/api/users/${curUserStravaId}`, {
      isDefeated: false
    })
    console.log('resetIsDefeated data: >>>>>>>>>>', data)
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
