import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log(props)
  const {
    stravaId,
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
  } = props

  return (
    <div>
      <h3>{`Welcome, ${nickname}!`}</h3>
      <img src={imgUrl} alt="Your Avatar" />
      <div>{`Level: ${lvl}`}</div>
      <div>{`XP: ${xpCurrent} / ${xpToNextLvl}`}</div>
      <div>{`Energy: ${energyCurrent} / ${energyTotal}`}</div>
      <div>{`HP: ${hpCurrent} / ${hpTotal}`}</div>
      <div>{`Speed: ${speed}`}</div>
      <br />
      <div>{`You have been a member since ${memberSince.slice(0, 10)}.`}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stravaId: state.user.stravaId,
    userToken: state.user.stravaId,
    nickname: state.user.nickname,
    imgUrl: state.user.imgUrl,
    lvl: state.user.lvl,
    xpCurrent: state.user.xpCurrent,
    xpToNextLvl: state.user.xpToNextLvl,
    energyCurrent: state.user.energyCurrent,
    energyTotal: state.user.energyTotal,
    hpCurrent: state.user.hpCurrent,
    hpTotal: state.user.hpTotal,
    speed: state.user.speed,
    memberSince: state.user.createdAt
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
