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

// TODO
router.post("/buy", async (req, res, next) => {
  try {
    res.json({ success: true, message: "TODO" });
  } catch (e) {
    return next(e);
  }
});
