import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import history from '../history'
import socket from '../socket'
import {allUsersThunk} from '../store/user'
import {
  getOpponentStatsThunkCreator,
  getMyStatsThunkCreator
} from '../store/battle'

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
    socket.emit('me', this.props.singleUser.stravaId)
  }

  handleClick = event => {
    const myStravaId = this.props.singleUser.stravaId
    this.props.fetchMyStats(myStravaId)
    const currentOpponentStravaId = event.target.value
    this.props.fetchOpponentStats(currentOpponentStravaId)
    history.push('/battle')
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <h2 align="center">Global Users: TOP WINS</h2>
        <div className="leaderBoardTabs">
          <Link to="/leaderboard">Top Wins</Link>
          <Link to="/toplvl">Top Level</Link>
          <Link to="/topspeed">Top Speed</Link>
        </div>
        <div className="leaderBoardList">
          {users
            .sort((a, b) => {
              let keyA = a.wins
              let keyB = b.wins
              if (keyA > keyB) {
                return -1
              }
              if (keyA < keyB) {
                return 1
              } else {
                return 0
              }
            })
            .map((user, index) => {
              return (
                <div key={user.id}>
                  <div className="lbUserTabs">
                    <div className="rankingNum">
                      <h2>{index + 1}</h2>
                    </div>
                    <div className="lbUserTabsImage">
                      <img src={user.imgUrl} width="35%" />
                    </div>
                    <div className="lbUserTabsName">
                      <h4>{user.nickname}</h4>
                    </div>

                    <div className="lbUserInfoContainer">
                      <div className="lbUserInfo">
                        <img src="https://img.icons8.com/nolan/64/000000/crown.png" />
                        <p align="center">{user.wins}</p>
                      </div>

                      <div id="lbUserButtons">
                        {/* <button
                          className="messageButton"
                          type="button"
                          onClick={this.handleClick}
                          value={user.stravaId}
                          >
                          Message
                          </button>
                        <br /> */}
                        {this.props.singleUser.stravaId !== user.stravaId ? (
                          <button
                            className="challengeButton"
                            type="button"
                            onClick={this.handleClick}
                            value={user.stravaId}
                          >
                            Battle!
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.allUsers,
  singleUser: state.user.singleUser
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(allUsersThunk()),
  fetchOpponentStats: stravaId =>
    dispatch(getOpponentStatsThunkCreator(stravaId)),
  fetchMyStats: stravaId => dispatch(getMyStatsThunkCreator(stravaId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
