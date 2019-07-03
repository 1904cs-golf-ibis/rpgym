import React, {Component} from 'react'

export default class Battle extends Component {
  render() {
    return (
      <div className="rps-wrapper">
        <ul id="events" />
        <li>Hello</li>
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
            <button id="rock" className="turn" type="button">
              Rock
            </button>
            <button id="paper" className="turn" type="button">
              Paper
            </button>
            <button id="scissors" className="turn" type="button">
              Scissors
            </button>
          </div>
        </div>
        <script src="/socket.io/socket.io.js" />
        <script src="../client.js" />
      </div>
    )
  }
}
