import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../store/user'
import {Link} from 'react-router-dom'
import {
  getOpponentStatsThunkCreator,
  getMyStatsThunkCreator
} from '../store/battle'
import history from '../history'

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }
  handleClick = event => {
    const myStravaId = this.props.singleUser.stravaId
    this.props.fetchMyStats(myStravaId)
    const currentOpponentStravaId = event.target.value
    // console.log(currentOpponentStravaId)
    this.props.fetchOpponentStats(currentOpponentStravaId)
    history.push('/battle')
  }
  render() {
    // console.log('PROPS!!', this.props)
    const {users} = this.props
    console.log('users', users)
    return (
      <div>
        <h2 align="center">Opponent</h2>
        <div className="leaderBoardList">
          {users.map((user, index) => {
            console.log('user.stravaId: ', user.stravaId)
            console.log(
              'this.props.notifications: ',
              this.props.notifications[0].stravaId
            )
            if (user.stravaId === this.props.notifications[0].stravaId) {
              return (
                <div key={user.id}>
                  <div className="lbUserTabs">
                    <div className="rankingNum">
                      {/* <img src="https://img.icons8.com/nolan/64/000000/best-seller.png" /> */}
                      {/* <h2>{index + 1}</h2> */}
                    </div>
                    <div className="lbUserTabsImage">
                      <img src={user.imgUrl} width="35%" />
                    </div>
                    <div className="lbUserTabsName">
                      <h2>{user.nickname}</h2>
                    </div>

                    <div className="lbUserInfoContainer">
                      <div className="lbUserInfo">
                        <img src="https://img.icons8.com/nolan/64/000000/crown.png" />
                        <p align="center">Wins: {user.wins}</p>
                      </div>
                      {/* {this.props.singleUser.stravaId !== user.stravaId ? (
                        <button
                          className="challengeButton"
                          type="button"
                          onClick={this.handleClick}
                          value={user.stravaId}
                        >
                          Battle!
                        </button>
                      ) : null} */}
                      <div id="lbUserButtons">
                        <button
                          className="messageButton"
                          type="button"
                          onClick={this.handleClick}
                          value={user.stravaId}
                        >
                          Message
                        </button>
                        <br />
                        <button
                          className="challengeButton"
                          type="button"
                          onClick={this.handleClick}
                          value={user.stravaId}
                        >
                          Battle!
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.allUsers,
  singleUser: state.user.singleUser,
  notifications: state.user.notifications
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(allUsersThunk()),
  fetchOpponentStats: stravaId =>
    dispatch(getOpponentStatsThunkCreator(stravaId)),
  fetchMyStats: stravaId => dispatch(getMyStatsThunkCreator(stravaId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
