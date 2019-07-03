/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('it has a nickname and lvl', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          nickname: 'Cody',
          lvl: 200
        })
      })

      it('the name is equal to Cody', () => {
        expect(cody.nickname).to.equal('Cody')
      })

      it('lvl is equal to 200', () => {
        expect(cody.lvl).to.equal(200)
      })
    }) // end describe('correctNickname')
  }) // end describe('instanceMethods')
}) // end describe('User model')
