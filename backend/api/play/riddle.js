const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const logs = require('../../lib/logs')

const client = new PrismaClient()

router.get('/', async (req, res, next) => {
  try {
    const [riddle] = await client.userRiddle.findMany({
      where: { completed: false, userId: req.user.id },
      include: { riddle: true },
    })

    riddle.riddle.answer = 'nicetry'
    riddle.riddle.createdAt = new Date()
    riddle.riddle.updatedAt = new Date()

    res.json({ success: true, riddle })
  } catch (e) {
    return next(e)
  }
})

router.post('/accept', async (req, res, next) => {
  try {
    if (req.session.userState !== 'rp-riddle-skippable') {
      return res.json({ success: false, message: 'E H' })
    }

    await logs.add(
      req.user.id,
      `${req.user.username} accepted the sphinx's challenge`
    )

    // Get a riddle the user hasn't seen
    const riddleCount = await client.riddle.count()
    const getRandId = () => Math.ceil(Math.random() * riddleCount)
    const userRiddles = await client.userRiddle.findMany({
      include: { riddle: true },
    })

    let found = false
    let riddleId = 0

    while (!found) {
      const id = getRandId()
      const r = userRiddles.find((u) => u.riddleId === id)
      found = !!!r
      riddleId = id
    }

    const [currentTile] = await client.visitedTile.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 1,
      include: { tile: true },
    })

    await client.userRiddle.create({
      data: {
        riddle: { connect: { id: riddleId } },
        user: { connect: { id: req.user.id } },
        tile: { connect: { id: currentTile.id } },
      },
    })

    return res.json({ success: true, user: req.user })
  } catch (e) {
    return next(e)
  }
})

router.post('/answer', async (req, res, next) => {
  try {
    const [riddle] = await client.userRiddle.findMany({
      where: { completed: false, userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 1,
      include: { riddle: true },
    })

    if (!riddle) {
      return res.json({
        success: false,
        message: 'E H',
        user: req.user,
      })
    }

    await client.riddleAttempt.create({
      data: {
        riddle: { connect: { id: riddle.id } },
        attempt: req.body.answer,
      },
    })

    if (req.body.answer === riddle.riddle.answer) {
      await client.user.update({
        where: { id: req.user.id },
        data: { points: req.user.points + 300 },
      })

      await logs.add(req.user.id, `${req.user.username} solved the riddle`)

      await client.userRiddle.update({
        where: { id: riddle.id },
        data: { completed: true, completedAt: new Date() },
      })

      return res.json({
        success: true,
        message: `You solved the riddle!`,
        user: req.user,
      })
    }

    return res.json({
      success: false,
      message: 'Wrong answer, please try again.',
      user: req.user,
    })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
