import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class YouWin extends Component {
  constructor() {
    super()
    this.updateWins = this.updateWins.bind(this)
  }

  componentDidMount() {
    console.log(
      'componentDidMount this.props.stravaId: >>>>>>>>',
      this.props.stravaId
    )
    this.updateWins(this.props.stravaId)
  }

  async updateWins(curUserStravaId) {
    console.log('updateWins stravaId: >>>>>>>> ', curUserStravaId)
    const curUserData = await axios.get(`/api/users/${curUserStravaId}`)
    const curUserWins = curUserData.data.wins
    const curUserXpCurrent = curUserData.data.xpCurrent
    console.log('updateWins curUserWins: ', curUserWins)
    console.log('updateWins curUserXpCurrent: ', curUserXpCurrent)
    const updatedUserData = await axios.put(`/api/users/${curUserStravaId}`, {
      wins: curUserWins + 1,
      xpCurrent: curUserXpCurrent + 500
    })
    console.log('updateWins data: >>>>>>>>>>', updatedUserData.data)
  }

  render() {
    return (
      <div className="win_lose_container">
        <div className="win_lose_containee">
          Congratulations! You won the battle.
        </div>
        <br />
        <div className="win_lose_containee">You gained 500 XP</div>
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
