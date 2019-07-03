import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../store/user'
import {Link} from 'react-router-dom'

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
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
        <div>
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
            .map(user => {
              return (
                <div key={user.id} className="lbUserTabs">
                  <div>
                    <img src={user.imgUrl} />
                  </div>
                  <div>
                    <h4>{user.nickname}</h4>
                    <h5>LV: {user.lvl}</h5>
                    <h5>Speed: {user.speed}</h5>
                    <h5>Wins: {user.wins}</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
