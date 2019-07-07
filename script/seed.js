'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      nickname: 'S-classVii',
      speed: 60,
      lvl: 5,
      wins: 9,
      imgUrl:
        'https://www.sccpre.cat/mypng/full/148-1482585_cloud-kingdom-hearts-8-bit-cloud-strife.png'
    }),
    User.create({
      nickname: 'ssj2Gohan',
      speed: 50,
      lvl: 2,
      wins: 6,
      imgUrl: 'http://pixelartmaker.com/art/a060dd22d6e53a2.png'
    }),
    User.create({
      nickname: 'yellowRodent',
      speed: 50,
      lvl: 2,
      wins: 6,
      imgUrl: 'https://thumbs.gfycat.com/UnpleasantAgonizingBettong.webp'
    }),
    User.create({
      nickname: 'MegaManPXL',
      speed: 40,
      lvl: 3,
      wins: 7,
      imgUrl: 'http://pixelartmaker.com/art/1e2484ec9da3bd6.png'
    }),
    User.create({
      nickname: 'rightBack@YA',
      speed: 40,
      lvl: 3,
      wins: 7,
      imgUrl: 'https://avatarfiles.alphacoders.com/103/103109.gif'
    }),
    User.create({
      nickname: 'iMB-man',
      speed: 40,
      lvl: 3,
      wins: 7,
      imgUrl: 'http://www.infinitymugenteam.com/images/BatmanStance.gif'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
