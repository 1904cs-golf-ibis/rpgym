import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

export default class YouWin extends Component {
  // constructor() {
  //   super()
  //   this.updateWins = this.updateWins.bind(this)
  // }

  // componentDidMount() {
  //   console.log(
  //     'componentDidMount this.props.stravaId: >>>>>>>>',
  //     this.props.stravaId
  //   )
  //   this.updateWins(this.props.stravaId)
  // }

  // async updateWins(curUserStravaId) {
  //   console.log('updateWins stravaId: >>>>>>>> ', curUserStravaId)

  //   const {data} = await axios.put(`/api/users/${curUserStravaId}`, {
  //     isDefeated: false
  //   })
  //   console.log('updateWins data: >>>>>>>>>>', data)
  // }

  render() {
    return (
      <div className="win_lose_container">
        <div className="win_lose_containee">
          Congratulations! You won the battle.
        </div>
        <br />
        <div className="win_lose_containee">You gained 570 XP</div>
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
