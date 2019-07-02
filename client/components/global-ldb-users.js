import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../store/user'

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
        <h2>Global Users</h2>
        {users.map(user => {
          return (
            <div key={user.id}>
              <h3>
                {user.nickname} {user.lvl}
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
