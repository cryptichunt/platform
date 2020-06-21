const jwt = require('jsonwebtoken')

module.exports = {
  against: (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body)
      return next()
    } catch (err) {
      if (err.toString().match(/^ValidationError:/)) {
        return res.json({ success: false, message: err.errors[0] })
      }

      err.statusCode = 500
      next(err)
    }
  },
  generateVerificationURL: async (target, user) => {
    const jot = jwt.sign({ userId: user.id, target }, process.env.SECRET)

    return `https://play.cryptichunt.com/verify/${target}?token=${jot}`
  },
}
