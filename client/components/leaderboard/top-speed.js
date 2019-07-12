import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {allUsersThunk} from '../../store/user'

class TopSpeed extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <h1 align="center">Leaderboard</h1>
        <h2 align="center">Global Users</h2>
        <div className="leaderBoardTabs">
          <Link to="/leaderboard">Top Wins</Link>
          <Link to="/toplvl">Top Level</Link>
          <Link to="/topspeed">Top Speed</Link>
        </div>
        <div className="leaderBoardList">
          {users
            .sort((a, b) => {
              let keyA = a.speed
              let keyB = b.speed
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
                      {/* <img src="https://img.icons8.com/nolan/64/000000/best-seller.png" /> */}
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
                        <img src="https://img.icons8.com/nolan/64/000000/fast-forward.png" />
                        <p align="center">Spd: {user.speed}</p>
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
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.allUsers
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(allUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopSpeed)
