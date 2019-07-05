import React, {Component} from 'react'
// import {connect} from 'react-redux'
import BattleActions from './battle-actions'
import BattleMessages from './battle-messages'

export default class BattleRoom extends Component {
  render() {
    return (
      <div>
        <div id="battleRoom">
          <div>
            <h1>Battle Room</h1>
            <BattleMessages />
          </div>
          <div id="arenaImage">
            <img
              src="https://i.ytimg.com/vi/ucjk7FByCq8/maxresdefault.jpg"
              align="center"
            />
          </div>
        </div>
      </div>
    )
  }
}
