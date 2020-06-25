const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { against, generateVerificationURL } = require("../../lib/validation");
const recaptcha = require("../../lib/recaptcha");
const logs = require("../../lib/logs");
const { client } = require("../../lib/prisma");

async function sendMail(email, url) {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Team Cryptocracy" <admin@cryptichunt.com>',
    to: email, // list of receivers
    subject: "Please verify your email", // Subject line
    html: `Click the following link - <a href="${url}">${url}</a>`, // html body
  });

  return info;
}

module.exports = [
  recaptcha.verify(),
  // against(require("./register-schema")),
  async (req, res, next) => {
    try {
      const { email, username, password, discord, edu, name } = req.body;

      const user = await client.user.create({
        data: {
          email,
          username,
          password: await bcrypt.hash(password, 14),
          discord,
          edu,
          name,
          points: 200,
          emailVerified: true,
          discordVerified: true,
          currentTile: { connect: { id: 1 } },
        },
      });

      await client.visitedTile.create({
        data: {
          tile: { connect: { id: 1 } },
          user: { connect: { id: user.id } },
        },
      });

      // const emailUrl = await generateVerificationURL('email', user)
      // await sendMail(user.email, emailUrl)

      await logs.add(user.id, `${user.username} accepted their mission`);

      res.json({
        success: true,
        message: "User created",
        id: user.id,
      });
    } catch (e) {
      if (e.message.match(/Unique constraint/g)) {
        return res.json({
          success: false,
          message: `An account already exists with this ${e.meta.target}`,
        });
      } else {
        e.statusCode = 500;
        next(e);
      }
    }
  },
];
