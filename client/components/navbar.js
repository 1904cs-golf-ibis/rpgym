import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navBar">
    <nav>
      {isLoggedIn ? (
        <div id="navBarContainer">
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">
            <b>RPGym</b>
          </Link> */}
          <b>RPGym</b>
          {/* <img src="https://img.icons8.com/ios-filled/100/000000/strava.png"/> */}
          <Link to="/home">Home</Link>
          {/* <Link to="/battle">Battle</Link> */}
          <Link to="/leaderboard">Leaderboard</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login" className="navBar">
            <b>RPGym</b>
          </Link>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
