import React, {Component} from 'react'

import BattleMessages from './battle-messages'

export default class BattleRoom extends Component {
  render() {
    return (
      <div id="battleRoomDiv">
        <div id="battleRoom">
          <h1 align="center">Battle Arena</h1>
          <div>
            <BattleMessages />
          </div>
        </div>
      </div>
    )
  }
}
