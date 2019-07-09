import React, {Component} from 'react'
// import {connect} from 'react-redux'
import BattleActions from './battle-actions'
import BattleMessages from './battle-messages'

export default class Arena extends Component {
  render() {
    return (
      <div>
        <div id="arena">
          {/* <img
            id="arenaImage"
            src="https://i.ytimg.com/vi/ucjk7FByCq8/maxresdefault.jpg"
            width="75%"
            align="center"
          /> */}
          <div id="arenaAvatar">
            <img
              src="http://pixelartmaker.com/art/6bb9673b65fade0.png"
              width="25%"
            />
          </div>
          <div id="arenaOpponent">
            <img
              src="http://pixelartmaker.com/art/6bb9673b65fade0.png"
              width="25%"
            />
          </div>
        </div>
      </div>
    )
  }
}
