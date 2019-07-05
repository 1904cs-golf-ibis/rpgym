import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../../store/user'
import {Link} from 'react-router-dom'

class TopSpeed extends Component {
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
                <div key={user.id} className="lbUserTabs">
                  <div>{index + 1}</div>
                  <div align="center">
                    <img src={user.imgUrl} width="35%" />
                  </div>
                  <div className="lbUserInfo">
                    <h3>{user.nickname}</h3>
                    <p>
                      LV: {user.lvl}
                      <br />
                      Speed: {user.speed}
                      <br />
                      Wins: {user.wins}
                    </p>
                  </div>
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