const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const { client } = require("../lib/prisma");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await client.user.findOne({
          where: { email },
        });

        if (!user) {
          return done("Your account could not be found", null);
        }

        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        }

        return done("Incorrect password");
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((token, done) =>
  client.user
    .findOne({ where: { id: token } })
    .then((u) => (u ? done(null, u) : done("User not found")))
    .catch(done)
);
