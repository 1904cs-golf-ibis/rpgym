import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../../store/user'
import {Link} from 'react-router-dom'

class TopLvl extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    // console.log('PROPS!!', this.props)
    const {users} = this.props
    console.log('users', users)
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
              let keyA = a.lvl
              let keyB = b.lvl
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
                <div>
                  <div key={user.id} className="lbUserTabs">
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
                        <img src="https://img.icons8.com/nolan/64/000000/dumbbell.png" />
                        <p align="center">Level:{user.lvl}</p>
                      </div>
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
  users: state.user.allUsers
})

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(allUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopLvl)
