const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { check, canPlay } = require("../lib/auth");
const yup = require("yup");
const { against } = require("../lib/validation");
const logs = require("../lib/logs");

const client = new PrismaClient();

router.use(check);
router.use(canPlay);

router.get("/", async (req, res, next) => {
  try {
    const [lvl] = await client.userLevel.findMany({
      where: { completed: false, userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
      include: { level: true },
    });

    lvl.level.answer = "nicetry";
    lvl.level.createdAt = new Date();
    lvl.level.updatedAt = new Date();

    res.json({ success: true, lvl });
  } catch (e) {
    return next(e);
  }
});

router.post("/answer", async (req, res, next) => {
  try {
    const [lvl] = await client.userLevel.findMany({
      where: { completed: false, userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
      include: { level: true },
    });

    if (!lvl) {
      return res.json({
        success: false,
        message: "You're not currently on a level.",
        user: req.user,
      });
    }

    await client.levelAttempt.create({
      data: {
        level: { connect: { id: lvl.level.id } },
        user: { connect: { id: req.user.id } },
        attempt: req.body.answer,
      },
    });

    if (req.body.answer === lvl.level.answer) {
      await client.user.update({
        where: { id: req.user.id },
        data: { points: req.user.points + lvl.level.points },
      });

      await logs.add(
        req.user.id,
        `${req.user.username} solved level ${lvl.levelId}`
      );

      await client.userLevel.update({
        where: { id: lvl.id },
        data: { completed: true, completedAt: new Date() },
      });

      return res.json({
        success: true,
        message: `You gave the correct answer to level ${lvl.levelId}!`,
        user: req.user,
      });
    }

    return res.json({
      success: false,
      message: "Wrong answer, please try again.",
      user: req.user,
    });
  } catch (e) {
    return next(e);
  }
});

router.post("/skip", async (req, res, next) => {
  try {
    if (req.user.points < 351) {
      return res.json({ success: false, user: req.user });
    }

    const [lvl] = await client.userLevel.findMany({
      where: { completed: false, userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
      include: { level: true },
    });

    if (!lvl) {
      return res.json({
        success: false,
        message: "You're not currently on a level.",
        user: req.user,
      });
    }

    await logs.add(
      req.user.id,
      `${req.user.username} skipped level ${lvl.level.id}`
    );

    await client.user.update({
      where: { id: req.user.id },
      data: { points: req.user.points - 350 },
    });

    await client.userLevel.update({
      where: { id: lvl.id },
      data: { completed: true, completedAt: new Date() },
    });

    res.json({ success: true, message: "Skipped", user: req.user });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
