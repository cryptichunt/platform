const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const logs = require("../../lib/logs");
const client = new PrismaClient();

router.post("/bribe", async (req, res, next) => {
  try {
    await client.user.update({
      where: { id: req.user.id },
      data: {
        incarcerated: false,
        incarceratedAt: null,
        points: req.user.points - 150,
      },
    });

    await logs.add(req.user.id, `${req.user.username} escaped from jail`);

    res.json({
      success: true,
      user: req.user,
      message: "You escaped from jail",
    });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
