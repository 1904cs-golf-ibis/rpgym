import React, {Component} from 'react'
// import {connect} from 'react-redux'
import BattleActions from './battle-actions'
import BattleMessages from './battle-messages'

export default class BattleRoom extends Component {
  render() {
    return (
      <div>
        <h1>Battle Room</h1>
        <BattleMessages />
      </div>
    )
  }
}
