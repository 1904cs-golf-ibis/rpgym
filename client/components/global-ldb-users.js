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
        <h2 align="center">Global Users</h2>
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
                      <img src="https://img.icons8.com/nolan/64/000000/best-seller.png" />
                      {index + 1}
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
                        <p align="center">Wins:{user.wins}</p>
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
