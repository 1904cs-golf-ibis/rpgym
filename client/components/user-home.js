import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

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
    const {data} = await axios.get(`/api/activities/${this.props.stravaId}`)
    const speedData = data.map(el => el.max_speed)
    const maxSpeed = Math.max(...speedData)
    this.setState({
      speed: maxSpeed
    })
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
      <div>
        <h3>{`Welcome, ${nickname}!`}</h3>
        <img src={imgUrl} alt="Your Avatar" />
        <div>{`Level: ${lvl}`}</div>
        <div>{`XP: ${xpCurrent} / ${xpToNextLvl}`}</div>
        <div>{`Energy: ${energyCurrent} / ${energyTotal}`}</div>
        <div>{`HP: ${hpCurrent} / ${hpTotal}`}</div>
        <div>{`Speed: ${this.state.speed}`}</div>
        <br />
        <div>{`You have been a member since ${memberSince.slice(0, 10)}.`}</div>
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
