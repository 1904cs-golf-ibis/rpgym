export const attack = move => {
  // if player selects 'charge', player gain energy
  if (move === 'charge') {
    this.energy -= move.energy // energy is coming in as a negative number
  } else {
    this.energy -= move.cost // any other moves, player's energy decreases by the cost
    let randomHit = Math.floor(Math.random() * 101) // randomly generates a number from 1-100
    if (randomHit >= move.accuracy) {
      // checks if attack's accuracy >= random number
      return move.damage
    } else {
      console.log('missed!')
      return 'Your opponent missed...'
    }
  }
}
