module.exports = {
  apps: [
    {
      name: "crypto",
      script: "./bin/serve",
      env: {
        EMAIL: "admin@cryptichunt.com",
        MYSQL_URL:
          "mysql://ragasur:techyon_rocks_so_much@cryptocracy-1.cluster-czcl04dl4lui.ap-south-1.rds.amazonaws.com:3306/cryptocracy",
        PASSWORD: "https://www.youtube.com/watch?v=-6_7NywjE6I",
        RECAPTCHA_SECRET_KEY: "6Ldy1AAVAAAAAPZz83hcEZo4U5symjUuR7Ysw5I-",
        RECAPTCHA_SKIP_TOKEN: "hahaha_gay_6_7NywjE6I",
        REDIS_URL: "redis://3.6.182.147:6379",
        SECRET: "AIzaSyCPWJdSXcwnH4nSduZasxeTM6JFCXILu_kiqjwoiqjwoijowijqoiwjq",
        SENTRY_DSN:
          "https://b4ab4347592443c6909f58d5a6bb15e3@o404156.ingest.sentry.io/5267498",
        PORT: "62442",
      },
    },
    {
      name: "bot",
      script: "./lib/bot.js",
    },
  ],
};
