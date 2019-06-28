const router = require('express').Router()
// const axios = require('axios')
const strava = require('strava-v3')
module.exports = router

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.get('/:stravaId', (req, res, next) => {
  console.log('STRAVA ------->', strava.athlete.listActivities)
  strava.athlete.listActivities(req.params.stravaId, (err, payload, limits) => {
    if (!err) {
      res.json(payload)
    } else {
      console.error(err)
      next(err)
    }
  })
})
