const axios = require('axios').default

module.exports = {
  verify: (secret = process.env.RECAPTCHA_SECRET_KEY) => async (
    req,
    res,
    next
  ) => {
    try {
      if (!req.body.recaptcha) {
        return res.json({ success: false, message: 'Recaptcha token missing' })
      }

      const { data } = await axios.get(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          params: {
            secret,
            response: req.body.recaptcha,
          },
        }
      )

      const { success, score } = data

      if (success && score > 0.5) {
        delete req.body.recaptcha
        next()
      }

      if (success && score < 0.5) {
        return res.json({ success: false, message: 'Stop spamming robot' })
      }

      if (!success) {
        return res.json({ success: false, message: 'Recaptcha error' })
      }
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
}
