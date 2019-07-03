import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  getBattleMessagesThunkCreator
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
      curHp: 0,
      curEnergy: 0
    }
  }

  componentDidMount() {
    this.setState({
      curHp: this.props.avatar.hpCurrent,
      curEnergy: this.props.avatar.energyCurrent
    })
  }

  handleClick = event => {
    event.preventDefault()
    console.log(event.target.value)
    const curAttack = event.target.value
    this.setState({
      curAttack
    })

    const curHp = this.state.curHp
    const curEnergy = this.state.curEnergy

    switch (curAttack) {
      case 'charge':
        this.setState({
          curEnergy: curEnergy + atkDict.charge.energy
        })
        break
      case 'kiBlast':
        this.setState({
          curHp: curHp - atkDict.kiBlast.dmg,
          curEnergy: curEnergy + atkDict.kiBlast.energy
        })
        break
      default:
        console.log('NOT A VALID MOVE')
    }

    this.props.fetchNewMessage(curAttack)
  }

  render() {
    console.log('curHp: ', this.state.curHp)
    console.log('curEnergy: ', this.state.curEnergy)
    return (
      <div>
        <h1>My Stats</h1>
        <div>{`HP: ${this.state.curHp} / ${this.props.avatar.hpTotal}`}</div>
        <div>
          {`Energy: ${this.state.curEnergy} / ${this.props.avatar.energyTotal}`}
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
        <div>
          <button type="button" value="kamehameha" onClick={this.handleClick}>
            Kamehameha
          </button>
          <button type="button" value="spiritBomb" onClick={this.handleClick}>
            Spirit Bomb
          </button>
        </div>
        <div>
          {this.props.messages.map((message, idx) => {
            return <h5 key={idx}>{message}</h5>
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.battle,
  avatar: {
    nickname: state.user.singleUser.nickname,
    lvl: state.user.singleUser.lvl,
    energyTotal: state.user.singleUser.energyTotal,
    energyCurrent: state.user.singleUser.energyCurrent,
    hpTotal: state.user.singleUser.hpTotal,
    hpCurrent: state.user.singleUser.hpCurrent,
    imgUrl: state.user.singleUser.imgUrl,
    speed: state.user.singleUser.speed
  }
})

const mapDispatchToProps = dispatch => ({
  fetchNewMessage: message => dispatch(getNewBattleMessageThunkCreator(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
