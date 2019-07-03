import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class BattleMessages extends Component {
  constructor() {
    super()
    this.state = ''
  }
  handleChange = event => {
    event.preventDefault()
    console.log(event.name)
  }
  handleSumbit = event => {
    event.preventDefault()
    console.log(event.value)
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
          <button type="submit" value="Paper" onChange={this.handleChange}>
            Paper
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.battles
})

const mapDispatchToProps = dispatch => {
  // fetchAllMessages: ()
}
