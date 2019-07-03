import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  getBattleMessagesThunkCreator
} from '../store/battle'

class BattleMessages extends Component {
  constructor() {
    super()
    this.state = {
      curAttack: 'Charge'
    }
  }

  handleClick = event => {
    event.preventDefault()
    console.log(event.target.value)
    const curAttack = event.target.value
    this.setState({
      curAttack
    })
    this.props.fetchNewMessage(event.target.innerText)
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Battle Messages</h1>
        <div>
          <button type="button" value="Charge" onClick={this.handleClick}>
            Charge
          </button>
          <button type="button" value="Ki Blast" onClick={this.handleClick}>
            Ki Blast
          </button>
        </div>
        <div>
          <button type="button" value="Kamehameha" onClick={this.handleClick}>
            Kamehameha
          </button>
          <button type="button" value="Spirit Bomb" onClick={this.handleClick}>
            Spirit Bomb
          </button>
        </div>
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
