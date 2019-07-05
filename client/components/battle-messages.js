import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getNewBattleMessageThunkCreator,
  gotMyStatsActionCreator
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
      curEnergy: 0,
      speed: 0
    }
  }

  componentDidMount() {
    this.setState({
      curHp: this.props.avatar.hpCurrent,
      curEnergy: this.props.avatar.energyCurrent,
      speed: this.props.avatar.speed
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
        <div id="battleStats">
          <h3 align="center">My Stats</h3>
          <div>{`HP: ${this.state.curHp} / ${this.props.avatar.hpTotal}`}</div>
          <div>
            {`Energy: ${this.state.curEnergy} / ${
              this.props.avatar.energyTotal
            }`}
          </div>
          <div>{`Speed: ${this.state.speed}`}</div>
          <br />
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
  }
})

const mapDispatchToProps = dispatch => ({
  fetchNewMessage: message =>
    dispatch(getNewBattleMessageThunkCreator(message)),
  fetchMyStats: myStats => dispatch(gotMyStatsActionCreator(myStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleMessages)
