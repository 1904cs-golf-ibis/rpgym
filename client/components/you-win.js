import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import {me} from '../store/user'

class YouWin extends Component {
  constructor() {
    super()
    this.updateWins = this.updateWins.bind(this)
  }

  componentDidMount() {
    this.updateWins(this.props.stravaId)
  }

  async updateWins(curUserStravaId) {
    const curUserData = await axios.get(`/api/users/${curUserStravaId}`)
    const curUserWins = curUserData.data.wins
    const curUserXpCurrent = curUserData.data.xpCurrent
    const updatedStats = {
      wins: curUserWins + 1,
      xpCurrent: curUserXpCurrent + 500
    }
    const updatedUserData = await axios.put(
      `/api/users/${curUserStravaId}`,
      updatedStats
    )
    this.props.updateMyStats(updatedStats)
  }

  render() {
    return (
      <div className="win_lose_container">
        <div className="win_lose_containee">
          Congratulations! You won the battle.
        </div>
        <br />
        <div className="win_lose_containee">You gained 500 XP!</div>
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

const mapDispatchToProps = dispatch => ({
  updateMyStats: updatedStats => dispatch(me(updatedStats))
})

export default connect(null, mapDispatchToProps)(YouWin)
