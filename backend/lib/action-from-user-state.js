const { PrismaClient } = require("@prisma/client");
const logs = require("./logs");
const client = new PrismaClient();

module.exports = {
  "go-moveable": (user) => async (req, res, next) =>
    res.json({ success: true, user, message: "You landed on the Go tile!" }),
  "story-moveable": (user, ct) => async (req, res, next) =>
    res.json({ success: true, message: "You landed on s story tile! ", user }),
  "levelsolved-moveable": (user, ct) => async (req, res, next) => {
    try {
      const lvl = ct.tile.levelId
        ? await client.userLevel.findOne({
            where: { id: ct.tile.levelId, userId: req.user.id },
          })
        : null;

      if (!lvl) {
        return res.json({ success: false, message: "No such level", user });
      }

      res.json({
        success: true,
        message: "You've already solved this level",
        user,
      });
    } catch (e) {
      return next(e);
    }
  },
  "randchance-moveable": (user, ct) => async (req, res, next) => {
    try {
      const types = {
        JAIL: async () => {
          await client.user.update({
            where: { id: req.user.id },
            data: {
              incarcerated: true,
              incarceratedAt: new Date(),
              currentTile: { connect: { id: 12 } },
            },
          });

          await client.visitedTile.create({
            data: {
              tile: { connect: { id: 12 } },
              user: { connect: { id: req.user.id } },
            },
          });

          return res.json({
            success: true,
            message:
              "You were caught forging your job contracts and are now in jail",
            user,
          });
        },
        BRIBE: async () => {
          await client.user.update({
            where: { id: user.id },
            data: { points: user.points - 50 },
          });

          return res.json({
            success: true,
            message:
              "You had to bribe a toll guard to let you cross into enemy territory without travel documents",
            user,
          });
        },
        BOUNTY: async () => {
          await client.user.update({
            where: { id: user.id },
            data: { points: user.points + 50 },
          });

          return res.json({
            success: true,
            message: "You were given a bounty by your employer",
            user,
          });
        },
      };

      types[ct.randomChanceType]();
    } catch (e) {
      next(e);
    }
  },
  "jailvisiting-moveable": (user) => async (req, res, next) =>
    res.json({ success: true, message: "Visiting jail", user }),
  "rp-moveable": (user, ct) => async (req, res, next) => {
    if (ct.randomPersonType === "ALLY") {
      await client.user.update({
        where: { id: req.user.id },
        data: { points: req.user.points + 50 },
      });

      return res.json({
        success: true,
        message: "An ally gave you 50 points",
        user,
      });
    }

    if (ct.randomPersonType === "PICKPOCKET") {
      await client.user.update({
        where: { id: req.user.id },
        data: { points: req.user.points - 50 },
      });

      return res.json({
        success: true,
        message: "A pickpocket stole 50 points",
        user,
      });
    }

    return res.json({
      success: false,
      message: "Invalid randomPersonType",
      user,
    });
  },
  "gate-moveable": (user, ct) => async (req, res, next) =>
    res.json({ success: true, user, message: "You're on a Gate tile" }),
  "visited-moveable": (user, ct) => async (req, res, next) =>
    res.json({
      success: true,
      user,
      message: "You've already visited this tile",
    }),
  "mystery-moveable": (user, ct) => async (req, res, next) =>
    res.json({ success: true, user, message: "You're on the mystery tile" }),
  "rp-riddle": (user, ct) => async (req, res, next) =>
    res.json({ success: true, user, message: "You encountered a sphinx" }),
  level: (user, ct) => async (req, res, next) =>
    res.json({ success: true, user, message: "You are on a level tile" }),
  "rp-guard": (user, ct) => async (req, res, next) =>
    res.json({
      success: true,
      user,
      message: "A guard has stopped you for questioning",
    }),
  "rp-sidequest-skippable": (user, ct) => async (req, res, next) =>
    res.json({
      success: true,
      user,
      message: "A villager approached you with a sidequest",
    }),
  "rp-riddle-skippable": (user, ct) => async (req, res, next) =>
    res.json({ success: true, user, message: "You encountered a sphinx" }),
  jail: (user, ct) => async (req, res, next) =>
    res.json({ success: true, user, message: "You are in jail" }),
  center: (user, ct) => async (req, res, next) =>
    res.json({
      success: true,
      user,
      message: "Congratulations for making it to the center tile",
    }),
  "gate-inner-moveable": (user, ct) => async (req, res, next) =>
    res.json({
      success: true,
      user,
      message: "You're on a Gate tile",
    }),
};
