const router = require('express').Router()
const { client } = require('../lib/prisma')

router.get('/', async (req, res, next) => {
  try {
    const users = await client.user.findMany({
      where: {
        admin: false,
        emailVerified: true,
        discordVerified: true,
        bountyBanned: false,
        dqed: false,
      },
      orderBy: { points: 'desc' },
      select: { username: true, points: true },
    })

    res.json({
      success: true,
      message: `${users.length} users on leaderboard`,
      users,
    })
  } catch (e) {
    e.status = 500
    return next(e)
  }
})

module.exports = router
