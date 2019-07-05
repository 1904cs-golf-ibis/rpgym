import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  gotMyStatsActionCreator,
  getOpponentStatsThunkCreator
} from '../store/battle'

const atkDict = {
  charge: {
    dmg: 0,
    energy: 10
  },
  kiBlast: {
    dmg: 10,
    energy: -10
  },
  kamehameha: {
    dmg: 30,
    energy: -30
  },
  spiritBomb: {
    dmg: 150,
    energy: -80
  }
}

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
    const myStats = {
      hpTotal: this.props.avatar.hpTotal,
      hpCurrent: this.props.avatar.hpCurrent,
      energyTotal: this.props.avatar.energyTotal,
      energyCurrent: this.props.avatar.energyCurrent,
      speed: this.props.avatar.speed
    }
    this.props.fetchMyStats(myStats)
  }

  handleClick = event => {
    // console.log(event.target.value)
    const curAttack = event.target.value
    // this.setState({
    //   curAttack
    // })

    // const curHp = this.state.myStats.curHp
    // const curEnergy = this.state.myStats.curEnergy

    // switch (curAttack) {
    //   case 'charge':
    //     this.setState({
    //       curEnergy: curEnergy + atkDict.charge.energy
    //     })
    //     break
    //   case 'kiBlast':
    //     this.setState({
    //       curHp: curHp - atkDict.kiBlast.dmg,
    //       curEnergy: curEnergy + atkDict.kiBlast.energy
    //     })
    //     break
    //   default:
    //     console.log('NOT A VALID MOVE')
    // }

    this.props.fetchNewMessage(curAttack)
  }

  render() {
    console.log('curHp: ', this.state.myStats.curHp)
    console.log('curEnergy: ', this.state.myStats.curEnergy)
    console.log('Opp curHp: ', this.state.opponentStats.curHp)
    console.log('Opp curEnergy: ', this.state.opponentStats.curEnergy)
    console.log('PROPS FOR OPPONENT', this.props.opponent)
    return (
      <div>
        <div>
          <div id="battleStats">
            <h1 align="center">My Stats</h1>
            <h3>{this.state.myStats.nickname}</h3>
            <div>{`HP: ${this.state.myStats.curHp} / ${
              this.props.avatar.hpTotal
            }`}</div>
            <div>
              {`Energy: ${this.state.myStats.curEnergy} / ${
                this.props.avatar.energyTotal
              }`}
            </div>
            <div>{`Speed: ${this.props.avatar.speed}`}</div>
          </div>
          <div>
            <h1>Opponent Stats</h1>
            <h3>{this.state.opponentStats.nickname}</h3>
            <div>{`HP: ${this.state.opponentStats.curHp} / ${
              this.props.opponent.hpTotal
            }`}</div>
            <div>
              {`Energy: ${this.state.opponentStats.curEnergy} / ${
                this.props.avatar.energyTotal
              }`}
            </div>
            <div>{`Speed: ${this.props.opponent.speed}`}</div>
          </div>
        </div>
        <h1>Battle Messages</h1>
        <div>
          <button type="button" value="charge" onClick={this.handleClick}>
            Charge
          </button>
          <button type="button" value="kiBlast" onClick={this.handleClick}>
            Ki Blast
          </button>
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
        <div>
          {/* {this.props.messages.map((message, idx) => {
            return <h5 key={idx}>{message}</h5>
          })} */}
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
    energyTotal: state.user.singleUser.energyTotal,
    energyCurrent: state.user.singleUser.energyCurrent,
    hpTotal: state.user.singleUser.hpTotal,
    hpCurrent: state.user.singleUser.hpCurrent,
    imgUrl: state.user.singleUser.imgUrl,
    speed: state.user.singleUser.speed
  },
  opponent: {
    nickname: state.battle.opponentStats.nickname,
    lvl: state.battle.opponentStats.lvl,
    energyTotal: state.battle.opponentStats.energyTotal,
    energyCurrent: state.battle.opponentStats.energyCurrent,
    hpTotal: state.battle.opponentStats.hpTotal,
    hpCurrent: state.battle.opponentStats.hpCurrent,
    imgUrl: state.battle.opponentStats.imgUrl,
    speed: state.battle.opponentStats.speed
  }
})

const mapDispatchToProps = dispatch => ({
  fetchNewMessage: message =>
    dispatch(getNewBattleMessageThunkCreator(message)),
  fetchMyStats: myStats => dispatch(gotMyStatsActionCreator(myStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
