const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { client } = require("../../lib/prisma");

router.post("/email", async (req, res, next) => {
  try {
    const { token } = req.body;

    const payload = jwt.verify(token, process.env.SECRET);

    await client.user.update({
      where: { id: payload.userId },
      data: { emailVerified: true },
    });

    return res.json({ success: true, message: "Email verified" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
