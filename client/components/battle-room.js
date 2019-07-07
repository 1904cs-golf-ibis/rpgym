import React, {Component} from 'react'
// import {connect} from 'react-redux'
import BattleActions from './battle-actions'
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
          {/* <div id="arenaImage">
            <img
              src="https://i.ytimg.com/vi/ucjk7FByCq8/maxresdefault.jpg"
              align="center"
            />
          </div> */}
          {/* <div id="arenaAvatar">
            <img
              src="http://pixelartmaker.com/art/6bb9673b65fade0.png"
              width="30%"
            />
          </div> */}

          {/* <div id="demo">
            <p id="imageSprite" />
          </div> */}
        </div>
      </div>
    )
  }
}
