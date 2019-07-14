import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import {updateSpeedThunkCreator} from '../store/user'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      speed: 0
    }
  }

  async componentDidMount() {
    try {
      let maxSpeed = 0
      const {data} = await axios.get(`/api/activities/${this.props.stravaId}`)
      if (data.length) {
        const speedData = data.map(el => el.max_speed)
        maxSpeed = Math.max(...speedData)
      }
      const speedObj = {
        stravaId: this.props.stravaId,
        speed: maxSpeed
      }
      this.props.updateSpeedThunk(speedObj)
      this.setState({
        speed: maxSpeed
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {
      stravaId,
      userToken,
      nickname,
      imgUrl,
      lvl,
      xpCurrent,
      xpToNextLvl,
      energyCurrent,
      energyTotal,
      hpCurrent,
      hpTotal,
      speed,
      memberSince
    } = this.props
    return (
      <div className="homePage">
        <div className="profileCard">
          <div id="topCardContainer">
            <div id="lvlIcon">
              <h3>Lv: {lvl}</h3>
            </div>
            <div id="name">
              <h2>{`${nickname}`}</h2>
            </div>
            <div id="level">
              <h3>Lv: {lvl}</h3>
            </div>
          </div>
          <div>
            <h1 align="center">
              <img src={imgUrl} alt="Your Avatar" width="50%" />
            </h1>
          </div>
          <div className="xpInfoBox">
            {/* {`XP: ${xpCurrent}/${xpToNextLvl}`} */}
            <div>XP:</div>
            <div className="barAndDigits">
              <progress id="xp" value={xpCurrent} max={xpToNextLvl} />
              <br />
              <div className="barDigits">
                {xpCurrent} / {xpToNextLvl}
              </div>
            </div>
          </div>
          <br />
          <div className="stats">
            <div className="eachCardStat">
              <div>
                <img src="https://img.icons8.com/nolan/64/000000/lightning-bolt.png" />
              </div>
              {`E: ${energyCurrent}/${energyTotal}`}
            </div>
            <div className="eachCardStat">
              <div>
                <img src="https://img.icons8.com/nolan/64/000000/heart-health.png" />
              </div>
              {`HP: ${hpCurrent}/${hpTotal}`}
            </div>
            <div className="eachCardStat">
              <div>
                <img src="https://img.icons8.com/nolan/64/000000/fast-forward.png" />
              </div>
              {`Speed: ${this.state.speed}`}
            </div>
          </div>
          <div className="statsInfoBox">{`Member since ${memberSince.slice(
            0,
            10
          )}.`}</div>
        </div>
        <div className="profileCardInfo" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stravaId: state.user.singleUser.stravaId,
    userToken: state.user.singleUser.userToken,
    nickname: state.user.singleUser.nickname,
    imgUrl: state.user.singleUser.imgUrl,
    lvl: state.user.singleUser.lvl,
    xpCurrent: state.user.singleUser.xpCurrent,
    xpToNextLvl: state.user.singleUser.xpToNextLvl,
    energyCurrent: state.user.singleUser.energyCurrent,
    energyTotal: state.user.singleUser.energyTotal,
    hpCurrent: state.user.singleUser.hpCurrent,
    hpTotal: state.user.singleUser.hpTotal,
    speed: state.user.singleUser.speed,
    memberSince: state.user.singleUser.createdAt
  }
}

const mapDispatch = dispatch => ({
  updateSpeedThunk: speedObj => dispatch(updateSpeedThunkCreator(speedObj))
})

export default connect(mapState, mapDispatch)(UserHome)
