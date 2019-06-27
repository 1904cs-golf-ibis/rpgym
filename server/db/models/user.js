// const crypto = require('crypto');
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  // email: {
  //   type: Sequelize.STRING,
  //   unique: true
  //   // allowNull: false
  // },
  // password: {
  //   type: Sequelize.STRING,
  //   // Making `.password` act like a func hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('password')
  //   }
  // },
  // salt: {
  //   type: Sequelize.STRING,
  //   // Making `.salt` act like a function hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('salt')
  //   }
  // },

  stravaId: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  nickname: {
    type: Sequelize.STRING,
    defaultValue: 'Goku'
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://vignette.wikia.nocookie.net/supersmashbrosfanon/images/b/b5/Kid_goku_sprite.png/revision/latest/scale-to-width-down/148?cb=20180112013230'
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
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User

// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// /**
//  * classMethods
//  */
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

// /**
//  * hooks
//  */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// User.beforeCreate(setSaltAndPassword)
// User.beforeUpdate(setSaltAndPassword)
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword)
// })
