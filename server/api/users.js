const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'stravaId',
        'lvl',
        'nickname',
        'speed',
        'wins',
        'imgUrl'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const newUserData = {
//       id: req.body.id,
//       stravaId: req.body.stravaId,
//       lvl: req.body.lvl,
//       nickname: req.body.nickname,
//       speed: req.body.speed,
//       wins: req.body.wins,
//       imgUrl: req.body.imgUrl
//     }
//     const newUser = await User.create(newUserData)
//     res.json(newUser)
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// })

router.get('/:stravaId', async (req, res, next) => {
  try {
    const curUserStravaId = req.params.stravaId
    const curUser = await User.findOne({
      where: {
        stravaId: curUserStravaId
      }
    })
    res.json(curUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.put('/:stravaId', async (req, res, next) => {
  try {
    let updatedUserData
    const curUserStravaId = req.params.stravaId
    if (req.body.isDefeated === false) {
      updatedUserData = {
        isDefeated: false
      }
    } else if (req.body.wins >= 0 && req.body.xpCurrent >= 0) {
      updatedUserData = {
        wins: req.body.wins,
        xpCurrent: req.body.xpCurrent
      }
    } else {
      updatedUserData = {
        speed: req.body.speed
      }
    }

    const updatedCurUser = await User.update(updatedUserData, {
      where: {stravaId: curUserStravaId},
      returning: true,
      plain: true
    })
    res.json(updatedCurUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:stravaId', async (req, res, next) => {
  try {
    const curUserStravaId = req.params.stravaId
    const deletedCurUser = await User.destroy({
      where: {
        stravaId: curUserStravaId
      },
      returning: true,
      plain: true
    })
    res.json(deletedCurUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
