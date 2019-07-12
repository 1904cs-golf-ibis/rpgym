const router = require('express').Router()
const strava = require('strava-v3')

const {User} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.get('/:stravaId', async (req, res, next) => {
  try {
    const curUserStravaId = req.params.stravaId
    const curUserData = await User.findOne({
      where: {
        stravaId: curUserStravaId
      }
    })
    // console.log('curUserData: ', curUserData)
    const curUserAccessToken = curUserData.userToken
    // console.log('curUserAccessToken: >>>>>>>>>>>>>>', curUserAccessToken)
    strava.athlete.listActivities(
      {access_token: curUserAccessToken},
      (err, payload, limits) => {
        if (!err) {
          res.json(payload)
        } else {
          console.error(err)
          next(err)
        }
      }
    )
  } catch (error) {
    console.error(error)
    next(error)
  }
})
