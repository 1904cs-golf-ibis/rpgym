import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../../store/user'
import {Link} from 'react-router-dom'

class TopWins extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    // console.log('PROPS!!', this.props)
    const {users} = this.props
    console.log('users', users)
    return (
      <div>
        <h1>Leaderboard</h1>
        <h2>Global Users</h2>
        <Link to="/topwins">Top Wins</Link>
        <Link to="/toplvl">Top Level</Link>
        <Link to="/topspeed">Top Speed</Link>
        <h2>Top Wins</h2>
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
              <div key={user.id}>
                <h3>
                  {user.nickname} {user.lvl} {user.speed} {user.wins}
                </h3>
              </div>
            )
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopWins)
