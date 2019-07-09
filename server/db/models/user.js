// const crypto = require('crypto');
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  stravaId: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  socketId: {
    type: Sequelize.INTEGER
  },
  nickname: {
    type: Sequelize.STRING,
    defaultValue: 'Goku'
  },
  userToken: {
    type: Sequelize.TEXT,
    defaultValue: 0
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'http://pixelartmaker.com/art/6bb9673b65fade0.png'
  },
  lvl: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  xpCurrent: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  xpToNextLvl: {
    type: Sequelize.INTEGER,
    defaultValue: 1000
  },
  energyCurrent: {
    type: Sequelize.INTEGER,
    defaultValue: 300
  },
  energyTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 300
  },
  hpCurrent: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  hpTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  speed: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  isDefeated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isInBattle: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User
