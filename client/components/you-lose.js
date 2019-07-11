import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateMyStatsThunkCreator} from '../store/battle'
import {removeAllNotificationsActionCreator} from '../store/user'

class YouLose extends Component {
  componentDidMount() {
    console.log('CDM props: ', this.props)
    this.props.updateMyStats(this.props.stravaId, {
      isDefeated: false
    })
  }

  render() {
    if (this.props.removeAllNotifications) {
      console.log('removeAllNotifications exists')
      this.props.removeAllNotifications()
    }
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
        <NavLink className="win_lose_containee" to="/leaderboard">
          Back to Leaderboard
        </NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateMyStats: (stravaId, updatedStats) =>
    dispatch(updateMyStatsThunkCreator(stravaId, updatedStats)),
  removeAllNotifications: () => dispatch(removeAllNotificationsActionCreator)
})

export default connect(null, mapDispatchToProps)(YouLose)
