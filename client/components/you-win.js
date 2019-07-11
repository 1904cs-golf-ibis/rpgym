import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {removeAllNotificationsActionCreator} from '../store/user'

class YouWin extends Component {
  render() {
    if (this.props.removeAllNotifications) {
      console.log('removeAllNotifications exists')
      this.props.removeAllNotifications()
    }
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
        <NavLink className="win_lose_containee" to="/leaderboard">
          Back to Leaderboard
        </NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeAllNotifications: () => dispatch(removeAllNotificationsActionCreator)
})

export default connect(null, mapDispatchToProps)(YouWin)
