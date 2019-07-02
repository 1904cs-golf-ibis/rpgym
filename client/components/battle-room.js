import React, {Component} from 'react'

export default class Battle extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="rps-wrapper">
        <ul id="events" />
        <div className="button-wrapper">
          <input id="chat" />
          <button id="rock" type="button">
            Rock
          </button>
          <button id="paper" type="button">
            Paper
          </button>
          <button id="scissors" type="button">
            Scissors
          </button>
          <button id="say" type="button">
            Say
          </button>
        </div>
      </div>
    )
  }
}
