import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  gotMyStatsActionCreator
} from '../store/battle'

class BattleMessages extends Component {
  handleClick = event => {
    // console.log(event.target.value)
    const attackObj = {
      curAttack: event.target.value,
      mySpeed: this.props.avatar.speed,
      myIsDefeated: this.props.avatar.isDefeated,
      opponentSpeed: this.props.opponent.speed,
      opponentIsDefeated: this.props.opponent.isDefeated
    }
    this.props.fetchNewMessage(attackObj)
    this.forceUpdate()
  }

  render() {
    if (this.props.avatar.isDefeated) {
      console.log(
        'this.props.avatar.isDefeated: ',
        this.props.avatar.isDefeated
      )
      alert('YOU LOSE...')
    } else if (this.props.opponent.isDefeated) {
      console.log(
        'this.props.opponent.isDefeated: ',
        this.props.opponent.isDefeated
      )
      alert('YOU WIN!')
    }

    return (
      <div>
        <div>
          <div id="battleStats">
            <div>
              <img src={this.props.avatar.imgUrl} width="20%" />
            </div>
            <h3>{this.props.avatar.nickname}</h3>
            <div>{`HP: ${this.props.avatar.hpCurrent} / ${
              this.props.avatar.hpTotal
            }`}</div>
            <div>
              {`Energy: ${this.props.avatar.energyCurrent} / ${
                this.props.avatar.energyTotal
              }`}
            </div>
            <div>{`Speed: ${this.props.avatar.speed}`}</div>
          </div>
        </div>

        <br />
        <div id="battleMenu">
          <h3 align="center">Commands</h3>
          <div className="battleButtonSet">
            <button
              className="battleButton"
              type="button"
              value="charge"
              onClick={this.handleClick}
            >
              Charge
            </button>
            <br />
            <button
              className="battleButton"
              type="button"
              value="kiBlast"
              onClick={this.handleClick}
            >
              Ki Blast
            </button>
            <br />
            <button
              className="battleButton"
              type="button"
              value="kamehameha"
              onClick={this.handleClick}
            >
              Kamehameha
            </button>
            <br />
            <button
              className="battleButton"
              type="button"
              value="spiritBomb"
              onClick={this.handleClick}
            >
              Spirit Bomb
            </button>
            <br />
          </div>
        </div>

        <br />

        <div id="opponentStats">
          <h3>{this.props.opponent.nickname}</h3>
          <div>
            <img src={this.props.opponent.imgUrl} width="20%" />
          </div>
          <div>{`HP: ${this.props.opponent.hpCurrent} / ${
            this.props.opponent.hpTotal
          }`}</div>
          <div>
            {`Energy: ${this.props.opponent.energyCurrent} / ${
              this.props.avatar.energyTotal
            }`}
          </div>
          <div>{`Speed: ${this.props.opponent.speed}`}</div>
        </div>

        {/* <div>
          <h3>Battle Messages</h3>
          {this.props.messages.map((message, idx) => {
            return <h5 key={idx}>{message}</h5>
          })}
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  avatar: {
    nickname: state.user.singleUser.nickname,
    lvl: state.user.singleUser.lvl,
    imgUrl: state.user.singleUser.imgUrl,
    speed: state.user.singleUser.speed,
    energyTotal: state.battle.myStats.energyTotal,
    energyCurrent: state.battle.myStats.energyCurrent,
    hpTotal: state.battle.myStats.hpTotal,
    hpCurrent: state.battle.myStats.hpCurrent,
    isDefeated: state.battle.myStats.isDefeated
  },
  opponent: {
    nickname: state.battle.opponentStats.nickname,
    lvl: state.battle.opponentStats.lvl,
    imgUrl: state.battle.opponentStats.imgUrl,
    speed: state.battle.opponentStats.speed,
    isDefeated: state.battle.opponentStats.isDefeated,
    energyTotal: state.battle.opponentStats.energyTotal,
    energyCurrent: state.battle.opponentStats.energyCurrent,
    hpTotal: state.battle.opponentStats.hpTotal,
    hpCurrent: state.battle.opponentStats.hpCurrent
  }
})

const mapDispatchToProps = dispatch => ({
  fetchNewMessage: message =>
    dispatch(getNewBattleMessageThunkCreator(message)),
  fetchMyStats: myStats => dispatch(gotMyStatsActionCreator(myStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
