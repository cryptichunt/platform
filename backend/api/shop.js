const router = require("express").Router();
const yup = require("yup");
const auth = require("../lib/auth");
const { against } = require("../lib/validation");
const recaptcha = require("../lib/recaptcha");
const logs = require("../lib/logs");
const shopItems = require("../config/shop-items");
const { client } = require("../lib/prisma");

router.use(auth.check);
router.use(auth.canPlay);

router.post("/buy", async (req, res, next) => {
  try {
    if (req.user.points < 126 || req.user.hasHintCard) {
      res.json({ success: true, message: "No" });
    }

    const newUser = await client.user.update({
      where: { id: req.user.id },
      data: { hasHintCard: true, points: req.user.points - 125 },
    });

    await logs.add(newUser.id, `${newUser.username} bought a hint card`);

    res.json({ success: true, message: "Hint card purchased", user: newUser });
  } catch (e) {
    return next(e);
  }
});
