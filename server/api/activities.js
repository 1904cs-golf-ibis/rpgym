const router = require('express').Router()
// const axios = require('axios')
const strava = require('strava-v3')
module.exports = router

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.get('/:stravaId', (req, res, next) => {
  strava.athlete.listActivities(
    {access_token: '7cf56e94919813a090a2ddd8bb4f1bf9b653f8dd'},
    (err, payload, limits) => {
      if (!err) {
        res.json(payload)
      } else {
        console.error(err)
        next(err)
      }
    }
  )
})
