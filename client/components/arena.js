import React, {Component} from 'react'
// import {connect} from 'react-redux'
import BattleActions from './battle-actions'
import BattleMessages from './battle-messages'

export default class BattleRoom extends Component {
  render() {
    return (
      <div>
        <div id="arenaImage">
          <img
            src="https://i.ytimg.com/vi/ucjk7FByCq8/maxresdefault.jpg"
            align="center"
          />
          <div id="areaAvatar">
            <img src="http://pixelartmaker.com/art/6bb9673b65fade0.png" />
          </div>
        </div>
      </div>
    )
  }
}
