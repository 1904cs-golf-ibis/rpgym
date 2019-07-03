export const defend = damage => {
  if (typeof damage === 'string') {
    console.log(damage)
  } else {
    this.hp -= damage
    if (this.hp <= 0) {
      //this.player loses
    }
  }
}
