const router = require("express").Router();
const { client } = require("../../lib/prisma");

router.get("/in", async (req, res, next) => {
  try {
    const levels = await client.userLevel.count({
      where: { completed: true, userId: req.user.id },
    });

    res.json({ success: true, levels, allowed: levels > 23 });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
