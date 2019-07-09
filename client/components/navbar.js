import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00'
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    return (
      <div id="navBar">
        <nav>
          {this.props.isLoggedIn ? (
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
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>

              <div>
                <button
                  className="notification"
                  onClick={this.openModal}
                  type="button"
                >
                  Notifications
                  <span className="badge">
                    {this.props.notifications.length}
                  </span>
                </button>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2
                    ref={subtitle => {
                      this.subtitle = subtitle
                    }}
                  >
                    <span style={{color: 'black'}}>
                      R-no challenged you to a battle!
                    </span>
                  </h2>
                  <button
                    onClick={this.closeModal}
                    type="button"
                    className="notification"
                  >
                    Agree
                  </button>
                  <span> </span>
                  <button
                    onClick={this.closeModal}
                    type="button"
                    className="notification"
                  >
                    Decline
                  </button>
                </Modal>
              </div>
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
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id,
    notifications: state.user.notifications
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
