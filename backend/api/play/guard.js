const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { rollDice } = require("../../lib/helpers");
const logs = require("../../lib/logs");

const client = new PrismaClient();

router.use(async (req, res, next) => {
  try {
    const [currentTile] = await client.visitedTile.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
      include: { tile: true },
    });

    if (
      currentTile.tile.type === "RAND_PERSON" &&
      currentTile.randomPersonType === "GUARD"
    ) {
      return next();
    }

    return res.json({ success: false, message: "Not available" });
  } catch (e) {
    return next(e);
  }
});

router.post("/bribe", async (req, res, next) => {
  try {
    if (req.user.points < 126) {
      return res.json({ success: true, message: "not enough points" });
    }

    await client.user.update({
      where: { id: req.user.id },
      data: { points: req.user.points - 125 },
    });

    await logs.add(req.user.id, `${req.user.username} bribed a guard`);

    const [currentTile] = await client.visitedTile.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
      include: { tile: true },
    });

    await client.visitedTile.update({
      where: { id: currentTile.id },
      data: { guardPassed: true },
    });

    return res.json({
      success: true,
      message: "You bribed the guard",
      user: req.user,
    });
  } catch (e) {
    return next(e);
  }
});

router.post("/fight", async (req, res, next) => {
  try {
    const roll = rollDice();
    console.log({ roll });

    if (roll < 3) {
      const newUser = await client.user.update({
        where: { id: req.user.id },
        data: {
          incarcerated: true,
          incarceratedAt: new Date(),
          currentTile: { connect: { id: 12 } },
        },
      });

      await logs.add(
        req.user.id,
        `${req.user.username} fought a guard and lost`
      );

      await client.visitedTile.create({
        data: {
          user: { connect: { id: req.user.id } },
          tile: { connect: { id: 12 } },
        },
      });

      return res.json({
        success: true,
        won: false,
        message: "You fought the guard and lost",
        user: newUser,
      });
    }

    const [currentTile] = await client.visitedTile.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
      include: { tile: true },
    });

    await client.visitedTile.update({
      where: { id: currentTile.id },
      data: { guardPassed: true },
    });

    await logs.add(req.user.id, `${req.user.username} fought a guard and won`);

    return res.json({
      success: true,
      won: true,
      message: "You fought the guard and won",
      user: req.user,
    });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
