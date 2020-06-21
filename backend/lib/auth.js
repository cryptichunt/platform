module.exports = {
  check: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.json({ success: false, message: 'Unauthorized' })
    }

    return next()
  },

  canPlay: (req, res, next) =>
    !req.user?.emailVerified || !req.user?.discordVerified
      ? res.json({
          success: false,
          message: 'Please verify your email',
        })
      : req.user?.points < 0
      ? res.json({ success: false, message: 'Insufficient funds' })
      : next(),

  admin: (req, res, next) =>
    req.user.admin
      ? next()
      : res.json({
          success: false,
          message: 'This functionality is only available to admins',
        }),
}
