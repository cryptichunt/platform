const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const logs = require('../../lib/logs')

const client = new PrismaClient()

router.get('/in', async (req, res, next) => {
  try {
    const levels = await client.userLevel.count({
      where: { completed: true, userId: req.user.id },
    })

    res.json({ success: true, levels, allowed: levels > 23 })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
