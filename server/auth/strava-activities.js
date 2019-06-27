const strava = require('strava-v3')
const router = require('express').Router()
module.exports = router

router.get('/:stravaId', (req, res, next) => {
  strava.athlete.listActivities(req.params.stravaId, (err, payload, limits) => {
    if (!err) {
      res.json(payload)
    } else {
      console.error(err)
    }
  })
})
