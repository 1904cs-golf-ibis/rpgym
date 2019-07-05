'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      nickname: 'Vegeta',
      speed: 60,
      lvl: 5,
      wins: 9,
      imgUrl:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3316da0d-ec0c-47f0-a9d3-d6e0af5f9897/d9svkz1-5d6d659c-8926-4dfc-953e-eca24024b315.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMzMTZkYTBkLWVjMGMtNDdmMC1hOWQzLWQ2ZTBhZjVmOTg5N1wvZDlzdmt6MS01ZDZkNjU5Yy04OTI2LTRkZmMtOTUzZS1lY2EyNDAyNGIzMTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.03XuLSeqdsuZo_B9ZAgmDNEscCUWrvPukaIWtIh0L-w'
    }),
    User.create({
      nickname: 'Gohan',
      speed: 50,
      lvl: 2,
      wins: 6,
      imgUrl: 'http://pixelartmaker.com/art/c2d4c72511f461e.png'
    }),
    User.create({
      nickname: 'Trunks',
      speed: 40,
      lvl: 3,
      wins: 7,
      imgUrl: 'http://pixelartmaker.com/art/3bca430e007b849.png'
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
