import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  gotMyStatsActionCreator,
  getOpponentStatsThunkCreator
} from '../store/battle'

class BattleMessages extends Component {
  constructor() {
    super()
    this.state = {
      curAttack: 'Charge',
      myStats: {
        nickname: '',
        curHp: 0,
        curEnergy: 0,
        speed: 0
      },
      opponentStats: {
        nickname: '',
        curHp: 0,
        curEnergy: 0,
        speed: 0
      }
    }
  }

  componentDidMount() {
    this.setState({
      myStats: {
        nickname: this.props.avatar.nickname,
        curHp: this.props.avatar.hpCurrent,
        curEnergy: this.props.avatar.energyCurrent,
        speed: this.props.avatar.speed
      },
      opponentStats: {
        nickname: this.props.opponent.nickname,
        curHp: this.props.opponent.hpCurrent,
        curEnergy: this.props.opponent.energyCurrent,
        speed: this.props.opponent.speed
      }
    })
    // console.log('HP TOTAL', this.props.avatar.hpTotal)
    // const myStats = {
    //   hpTotal: this.props.avatar.hpTotal,
    //   hpCurrent: this.props.avatar.hpCurrent,
    //   energyTotal: this.props.avatar.energyTotal,
    //   energyCurrent: this.props.avatar.energyCurrent,
    //   speed: this.props.avatar.speed
    // }
    // this.props.fetchMyStats(myStats)

    // if (this.props.avatar.isDefeated) {
    //   console.log(
    //     'this.props.avatar.isDefeated: ',
    //     this.props.avatar.isDefeated
    //   )
    //   alert('YOU LOSE...')
    // } else if (this.props.opponent.isDefeated) {
    //   console.log(
    //     'this.props.opponent.isDefeated: ',
    //     this.props.opponent.isDefeated
    //   )
    //   alert('YOU WIN!')
    // }
  }

  handleClick = event => {
    // console.log(event.target.value)
    const curAttack = event.target.value

    this.props.fetchNewMessage(curAttack)
    this.forceUpdate()
  }

  render() {
    // console.log('curHp: ', this.state.myStats.curHp)
    // console.log('curEnergy: ', this.state.myStats.curEnergy)
    // console.log('Opp curHp: ', this.state.opponentStats.curHp)
    // console.log('Opp curEnergy: ', this.state.opponentStats.curEnergy)
    // console.log('PROPS FOR OPPONENT', this.props.opponent)
    // console.log('this.props.avatar.isDefeated: ', this.props.avatar.isDefeated)
    // console.log(
    //   'this.props.opponent.isDefeated: ',
    //   this.props.opponent.isDefeated
    // )

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
      <div id="container">
        <div id="battleInfoStatsContainer">
          <div id="battleInfoStats">
            <div id="yourBattleStatsBox">
              <div className="battleStatsImage">
                <img src={this.props.avatar.imgUrl} width="50%" />
              </div>
              <div className="battleStatsNameAndLvl">
                <div>
                  {this.state.myStats.nickname} {`Lv: ${this.props.avatar.lvl}`}
                </div>
                <div>
                  {`HP: ${this.props.avatar.hpCurrent} / ${
                    this.props.avatar.hpTotal
                  }`}
                </div>
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

            <div id="opponentStatsBox">
              <div className="battleStatsImage">
                <img src={this.props.opponent.imgUrl} width="50%" />
              </div>
              <div className="battleStatsNameAndLvl">
                <div>
                  {this.state.opponentStats.nickname}{' '}
                  {`Lv: ${this.state.opponentStats.lvl}`}
                </div>
                <div>
                  {`HP: ${this.props.opponent.hpCurrent} / ${
                    this.props.opponent.hpTotal
                  }`}
                </div>
              </div>
              <div className="battleStatsEnergy">
                {`Energy: ${this.props.opponent.energyCurrent} / ${
                  this.props.avatar.energyTotal
                }`}
              </div>
              <div className="battleStatsSpeed">
                {`Speed: ${this.props.opponent.speed}`}
              </div>
            </div>
          </div>

          <br />
        </div>
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
          </div>

          <div>
            {/* {this.props.messages.map((message, idx) => {
            return <h5 key={idx}>{message}</h5>
          })} */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // messages: state.battle,
  avatar: {
    nickname: state.user.singleUser.nickname,
    lvl: state.user.singleUser.lvl,
    imgUrl: state.user.singleUser.imgUrl,
    speed: state.user.singleUser.speed,
    // energyTotal: state.user.singleUser.energyTotal,
    // energyCurrent: state.user.singleUser.energyCurrent,
    // hpTotal: state.user.singleUser.hpTotal,
    // hpCurrent: state.user.singleUser.hpCurrent,
    energyTotal: state.battle.myStats.energyTotal,
    energyCurrent: state.battle.myStats.energyCurrent,
    hpTotal: state.battle.myStats.hpTotal,
    hpCurrent: state.battle.myStats.hpCurrent,
    isDefeated: state.battle.myStats.isDefeated
  },
  opponent: {
    nickname: state.battle.opponentStats.nickname,
    lvl: state.battle.opponentStats.lvl,
    energyTotal: state.battle.opponentStats.energyTotal,
    energyCurrent: state.battle.opponentStats.energyCurrent,
    hpTotal: state.battle.opponentStats.hpTotal,
    hpCurrent: state.battle.opponentStats.hpCurrent,
    imgUrl: state.battle.opponentStats.imgUrl,
    speed: state.battle.opponentStats.speed,
    isDefeated: state.battle.opponentStats.isDefeated
  }
})

const mapDispatchToProps = dispatch => ({
  fetchNewMessage: message =>
    dispatch(getNewBattleMessageThunkCreator(message)),
  fetchMyStats: myStats => dispatch(gotMyStatsActionCreator(myStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
