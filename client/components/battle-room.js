import React, {Component} from 'react'

import BattleMessages from './battle-messages'

export default class BattleRoom extends Component {
  render() {
    return (
      <div>
        <h1 align="center">Battle Room</h1>
        <div id="battleRoom">
          <div>
            <BattleMessages />
          </div>
        </div>
      </div>
    )
  }
}
