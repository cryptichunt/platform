const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { check, canPlay } = require('../../lib/auth')

const client = new PrismaClient()

router.get('/:tileId', async (req, res, next) => {
  try {
    const [tile] = await client.visitedTile.findMany({
      where: {
        tileId: parseInt(req.params.tileId),
        userId: req.user.id,
        tile: { type: 'STORY' },
      },
      include: { tile: true },
    })

    res.json({ success: true, tile: tile?.tile })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
