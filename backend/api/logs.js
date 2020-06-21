const router = require('express').Router()
const auth = require('../lib/auth')
const { client } = require('../lib/prisma')

router.use(auth.check)
router.use(auth.canPlay)

router.get('/', auth.admin, async (req, res, next) => {
  try {
    const logs = await client.log.findMany({
      where: {},
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true, log: true },
    })

    res.json({
      success: true,
      logs,
    })
  } catch (e) {
    e.status = 500
    return next(e)
  }
})

router.get('/self', async (req, res, next) => {
  try {
    const logs = await client.log.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true, log: true },
    })

    res.json({
      success: true,
      logs,
    })
  } catch (e) {
    e.status = 500
    return next(e)
  }
})

router.get('/:userId', auth.admin, async (req, res, next) => {
  try {
    const logs = await client.log.findMany({
      where: { userId: parseInt(req.params.userId, 10) },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true, log: true },
    })

    res.json({
      success: true,
      logs,
    })
  } catch (e) {
    e.status = 500
    return next(e)
  }
})

module.exports = router
