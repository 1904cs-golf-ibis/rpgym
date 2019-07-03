const router = require('express').Router()
const {Message} = require('../db/models')

module.exports = router

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const newMessage = await Message.create({
      name: req.body.message
    })
    res.send(newMessage)
  } catch (err) {
    next(err)
  }
})
