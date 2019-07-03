import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  getBattleMessagesThunkCreator
} from '../store/battle'

class BattleMessages extends Component {
  constructor() {
    super()
    this.state = ''
  }

  handleSumbit = event => {
    event.preventDefault()
    console.log(event.target.innerText)
    this.props.fetchNewMessage(event.target.innerText)
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Battle Messages</h1>
        <form onSubmit={this.handleSumbit}>
          <button type="submit" value="Rock" onChange={this.handleChange}>
            Rock
          </button>
          {/* <button type="submit" value="Paper" onChange={this.handleChange}>
            Paper
          </button> */}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.battles
})

const mapDispatchToProps = dispatch => ({
  fetchAllMessages: messages => dispatch(getBattleMessagesThunkCreator()),
  fetchNewMessage: message => dispatch(getNewBattleMessageThunkCreator(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
