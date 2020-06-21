const router = require('express').Router()

router.get('/', (req, res) => res.json({ success: true, message: 'cryptoooo' }))
router.use('/auth', require('./auth'))
// router.use('/shop', require('./shop'))
router.use('/leaderboard', require('./leaderboard'))
router.use('/logs', require('./logs'))
router.use('/play', require('./play'))
router.use('/levels', require('./levels'))

router.use('*', (req, res) =>
  res.json({ success: false, message: 'Resource not found' })
)

module.exports = router
