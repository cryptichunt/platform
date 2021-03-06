const router = require("express").Router();
const { client } = require("../../lib/prisma");

router.get("/:tileId", async (req, res, next) => {
  try {
    const tiles = await client.visitedTile.findMany({
      where: {
        tileId: parseInt(req.params.tileId),
        userId: req.user.id,
        tile: { type: "STORY" },
      },
      include: { tile: true },
    });

    res.json({ success: true, tile: tiles.length > 0 ? tiles[0].tile : null });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
