const passport = require('passport')
const router = require('express').Router()
const StravaStrategy = require('passport-strava-oauth2').Strategy

const {User} = require('../db/models')

module.exports = router

if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
  console.log('Strava client ID / secret not found. Skipping Strava OAuth.')
} else {
  const stravaConfig = {
    accessToken: process.env.STRAVA_ACCESS_TOKEN,
    refreshToken: process.env.STRAVA_REFRESH_TOKEN,
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALLBACK
  }

  const strategy = new StravaStrategy(
    stravaConfig,
    (accessToken, refreshToken, profile, done) => {
      const stravaId = profile.id
      const nickname =
        profile.name.givenName[0] +
        profile.name.givenName.slice(1).toLowerCase()
      const email = profile.emails[0].value
      const userToken = accessToken
      // console.log('userToken: >>>>>>>>>>>>>>>>>', userToken)
      // console.log('Profile inside STRAVA STRAT', profile)
      User.findOne({where: {stravaId}})
        //If user is found, need to update user with new access token
        .then(async foundUser => {
          // console.log('foundUser: >>>>>>>>>>>>>', foundUser)
          if (foundUser) {
            const updatedFoundUser = await foundUser.update(
              {userToken},
              {returning: true, plain: true}
            )
            // console.log('updatedFoundUser: >>>>>>>>>>>>>', updatedFoundUser)
            const ifResult = done(null, updatedFoundUser)
            // console.log('ifResult: >>>>>>>>>>>>>', ifResult)
            return ifResult
          } else {
            const elseResult = User.create({
              nickname,
              email,
              stravaId,
              userToken
            }).then(createdUser => done(null, createdUser))
            // console.log('elseResult: >>>>>>>>>>>>>', elseResult)
            return elseResult
          }
        })
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('strava', {scope: 'activity:read_all'}))

  router.get('/test', (req, res, next) => {
    res.send(stravaConfig)
  })

  router.get(
    '/callback',
    passport.authenticate('strava', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
