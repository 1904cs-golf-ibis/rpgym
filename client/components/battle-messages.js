import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  gotMyStatsActionCreator,
  updateMyStatsThunkCreator
} from '../store/battle'
import Arena from '../components/arena'
import YouWin from './you-win'
import YouLose from './you-lose'

class BattleMessages extends Component {
  handleClick = event => {
    const attackObj = {
      curAttack: event.target.value,
      myStats: this.props.avatar,
      opponentStats: this.props.opponent
    }
    this.props.fetchNewMessage(attackObj)
    this.forceUpdate()
  }

  render() {
    if (this.props.avatar.isDefeated) {
      return <YouLose stravaId={this.props.avatar.stravaId} />
    } else if (this.props.opponent.isDefeated) {
      return <YouWin stravaId={this.props.avatar.stravaId} />
    }
    return (
      <div id="theBattleContainer">
        <div id="battleInfoStatsContainer">
          <div id="battleInfoStats">
            <div id="yourBattleStatsBox">
              <div className="battleStatsImage">
                <img src={this.props.avatar.imgUrl} width="50%" />
              </div>
              <div className="battleStatsNameAndLvl">
                <div>
                  {this.props.avatar.nickname} {`Lv: ${this.props.avatar.lvl}`}
                </div>
              </div>
              <div className="battleStatsInfoContainer">
                <div className="battleStatsHp">
                  {`HP: ${this.props.avatar.hpCurrent} / ${
                    this.props.avatar.hpTotal
                  }`}
                </div>
                <div className="battleStatsEnergy">
                  {`Energy: ${this.props.avatar.energyCurrent} / ${
                    this.props.avatar.energyTotal
                  }`}
                </div>
                <div className="battleStatsSpeed">
                  {`Speed: ${this.props.avatar.speed}`}
                </div>
              </div>
            </div>

            <div id="opponentStatsBox">
              <div className="battleStatsImage">
                <img src={this.props.opponent.imgUrl} width="50%" />
              </div>
              <div className="battleStatsNameAndLvl">
                <div>
                  {this.props.opponent.nickname}{' '}
                  {`Lv: ${this.props.opponent.lvl}`}
                </div>
              </div>

              <div className="battleStatsInfoContainer">
                <div className="battleStatsHp">
                  {`HP: ${this.props.opponent.hpCurrent} / ${
                    this.props.opponent.hpTotal
                  }`}
                </div>

                <div className="battleStatsEnergy">
                  {`Energy: ${this.props.opponent.energyCurrent} / ${
                    this.props.opponent.energyTotal
                  }`}
                </div>
                <div className="battleStatsSpeed">
                  {`Speed: ${this.props.opponent.speed}`}
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>

        <Arena
          avatar={this.props.avatar.imgUrl}
          opponentAvatar={this.props.avatar.imgUrl}
        />

        <br />

        <div id="battleMenuAndMessageContainer">
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
            {/* <div>
          <h3>Battle Messages</h3>
          {this.props.messages.map((message, idx) => {
            return <h5 key={idx}>{message}</h5>
          })}
        </div> */}
          </div>
        </div>
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
    isDefeated: state.battle.myStats.isDefeated,
    stravaId: state.user.singleUser.stravaId
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
    hpCurrent: state.battle.opponentStats.hpCurrent,
    stravaId: state.battle.opponentStats.stravaId
  }
})

const mapDispatchToProps = dispatch => ({
  fetchNewMessage: message =>
    dispatch(getNewBattleMessageThunkCreator(message)),
  fetchMyStats: myStats => dispatch(gotMyStatsActionCreator(myStats)),
  updateMyStats: (stravaId, updatedStats) =>
    dispatch(updateMyStatsThunkCreator(stravaId, updatedStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
