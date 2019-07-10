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
    }),
    User.create({
      nickname: 'V_JOE<3',
      speed: 25,
      lvl: 90,
      wins: 52,
      imgUrl:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8e630ee8-95bb-4b93-9b1a-7813eaeb9e4c/d3aepa9-e2542e78-8926-4b7e-b416-b274c1ba6d53.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhlNjMwZWU4LTk1YmItNGI5My05YjFhLTc4MTNlYWViOWU0Y1wvZDNhZXBhOS1lMjU0MmU3OC04OTI2LTRiN2UtYjQxNi1iMjc0YzFiYTZkNTMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mrpt5iyTVvikG_Y5z6vqsUMU7J3688Zo8Jf7oyBAsA4'
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
