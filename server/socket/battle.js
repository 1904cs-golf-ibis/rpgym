class Battle {
  constructor() {
    this.playerOne = {
      socketId: '',
      stravaId: '',
      speed: 0,
      damage: 0,
      energy: 0,
      energyCurrent: 0,
      hpCurrent: 0
    }
    this.playerTwo = {
      socketId: '',
      stravaId: '',
      speed: 0,
      damage: 0,
      energy: 0,
      energyCurrent: 0,
      hpCurrent: 0
    }
  }
}

module.exports = Battle
