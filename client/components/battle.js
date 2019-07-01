import React, {Component} from 'react'

export default class Battle extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="rps-wrapper">
        <ul id="events" />
        <div className="controls">
          <div className="chat-wrapper">
            <form id="chat-form">
              <input id="chat" autoComplete="off" title="chat" />
              <button id="say" type="button">
                Say
              </button>
            </form>
          </div>

          <div className="button-wrapper">
            <button id="rock" type="button" className="turn">
              Rock
            </button>
            <button id="paper" type="button" className="turn">
              Paper
            </button>
            <button id="scissors" type="button" className="turn">
              Scissors
            </button>
          </div>
        </div>
      </div>
    )
  }
}
