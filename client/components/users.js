import React, {Component} from 'react'
import {connect} from 'react-redux'
import {allUsersThunk} from '../store/user'

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    console.log('PROPS!!', this.props)

    return (
      <div>
        {/* {this.props.users ? <h1>{this.props.users[0]}</h1> : <h1>Loading...</h1>} */}
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
