module.exports = {
  check: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.json({
        success: false,
        message: "Unauthorized",
        user: req.user,
      });
    }

    return next();
  },

  canPlay: (req, res, next) =>
    req.user
      ? !req.user.emailVerified || !req.user.discordVerified
        ? res.json({
            success: false,
            message: "Please verify your email",
            user: req.user,
          })
        : req.user.points < 0
        ? res.json({
            success: false,
            message: "Insufficient funds",
            user: req.user,
          })
        : next()
      : res.json({ success: false, message: "auth pls", user: req.user }),

  admin: (req, res, next) =>
    req.user.admin
      ? next()
      : res.json({
          success: false,
          message: "This functionality is only available to admins",
          user: req.user,
        }),
};
