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
    console.log('event.target.value: ', event.target.value)
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
                  <h3>{this.props.avatar.nickname}</h3>
                </div>
                <div>{`Lv: ${this.props.avatar.lvl}`}</div>
              </div>
              <div className="battleStatsInfoContainer">
                <div className="battleStatsHp">
                  {/* {`HP: ${this.props.avatar.hpCurrent} / ${
                    this.props.avatar.hpTotal
                  }`} */}
                  <div className="bar">
                    HP:
                    <div className="barAndDigits">
                      <progress
                        id="health"
                        value={this.props.avatar.hpCurrent}
                        max={this.props.avatar.hpTotal}
                      />
                      <br />
                      <div className="barDigits">
                        {this.props.avatar.hpCurrent} /{' '}
                        {this.props.avatar.hpTotal}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="battleStatsEnergy">
                  {/* {`Energy: ${this.props.avatar.energyCurrent} / ${
                    this.props.avatar.energyTotal
                  }`} */}
                  <div className="bar">
                    EP:
                    <div className="barAndDigits">
                      <progress
                        id="energy"
                        value={this.props.avatar.energyCurrent}
                        max={this.props.avatar.energyTotal}
                      >
                        hp
                      </progress>
                      <br />
                      <div className="barDigits">
                        {this.props.avatar.energyCurrent} /{' '}
                        {this.props.avatar.energyTotal}
                      </div>
                    </div>
                  </div>
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
                  <h3>{this.props.opponent.nickname}</h3>
                </div>
                <div>{`Lv: ${this.props.opponent.lvl}`}</div>
              </div>

              <div className="battleStatsInfoContainer">
                <div className="battleStatsHp">
                  {/* {`HP: ${this.props.opponent.hpCurrent} / ${
                    this.props.opponent.hpTotal
                  }`} */}
                  <div className="bar">
                    HP:
                    <div className="barAndDigits">
                      <progress
                        id="health"
                        value={this.props.opponent.hpCurrent}
                        max={this.props.opponent.hpTotal}
                      />
                      <br />
                      <div className="barDigits">
                        {this.props.opponent.hpCurrent} /{' '}
                        {this.props.opponent.hpTotal}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="battleStatsEnergy">
                  {/* {`Energy: ${this.props.opponent.energyCurrent} / ${
                    this.props.opponent.energyTotal
                  }`} */}
                  <div className="bar">
                    EP:
                    <div className="barAndDigits">
                      <progress
                        id="energy"
                        value={this.props.opponent.energyCurrent}
                        max={this.props.opponent.energyTotal}
                      >
                        hp
                      </progress>
                      <br />
                      <div className="barDigits">
                        {this.props.opponent.energyCurrent} /{' '}
                        {this.props.opponent.energyTotal}
                      </div>
                    </div>
                  </div>
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
            <h2 align="center">Commands</h2>
            <div className="battleButtonSet">
              <button
                className="battleButton"
                type="button"
                value="charge"
                onClick={this.handleClick}
              >
                Charge
                {/* <div id="chargeButton">
                  Charge
                  <span id="chargeInfo">+5 EP</span>
                </div> */}
              </button>
              <br />
              <button
                className="battleButton"
                type="button"
                value="kiBlast"
                onClick={this.handleClick}
              >
                Ki Blast
                {/* <div id="kiBlastButton">
                  Ki Blast
                  <span id="kiBlastInfo">-5 EP</span>
                </div> */}
              </button>
              <br />
              <button
                className="battleButton"
                type="button"
                value="kamehameha"
                onClick={this.handleClick}
              >
                Kamehameha
                {/* <div id="kamehamehaButton">
                  Kamehameha
                  <span id="kamehamehaInfo">-10 EP</span>
                </div> */}
              </button>
              <br />
              <button
                className="battleButton"
                type="button"
                value="spiritBomb"
                onClick={this.handleClick}
              >
                Spirit Bomb
                {/* <div id="spiritBombButton">
                  Spirit Bomb
                  <span id="spiritBombInfo">-50 EP</span>
                </div> */}
              </button>
              <br />
            </div>
          </div>
          <div id="attackMessages">
            <h3 align="center">Battle Messages:</h3>
            <div style={{height: '80px'}}>
              {this.props.messages.map((message, idx) => {
                console.log('BATTLE MESSAGES ====>', message)
                let newMessage
                const messageSliceToCheck = message.slice(-4)
                if (messageSliceToCheck === 'arge') {
                  newMessage = message.split(' ')
                  newMessage[newMessage.length - 1] =
                    'Charge! They regained a small amount of energy.'
                  newMessage = newMessage.join(' ')
                } else if (messageSliceToCheck === 'last') {
                  newMessage = message.split(' ')
                  newMessage[newMessage.length - 1] =
                    'Ki Blast! It was a direct hit!'
                  newMessage = newMessage.join(' ')
                } else if (messageSliceToCheck === 'meha') {
                  newMessage = message.split(' ')
                  newMessage[newMessage.length - 1] =
                    'Kamehameha! It was a direct hit!'
                  newMessage = newMessage.join(' ')
                } else if (messageSliceToCheck === 'Bomb') {
                  newMessage = message.split(' ')
                  newMessage[newMessage.length - 1] =
                    'Spirit Bomb! It was a direct hit!'
                  newMessage = newMessage.join(' ')
                }
                return <h5 key={idx}>{newMessage}</h5>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.battle.attackMessages,
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
