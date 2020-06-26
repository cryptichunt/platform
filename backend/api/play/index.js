const router = require("express").Router();
const { client } = require("../../lib/prisma");
const logs = require("../../lib/logs");
const { check, canPlay } = require("../../lib/auth");
const {
  findUserState,
  actionFromUserState,
  chooseRandomChance,
  checkCenter,
  chooseRandomPerson,
  rollDice,
  calculateNextTileId,
} = require("../../lib/helpers");

router.use(check);
router.use(canPlay);

router.use(async (req, res, next) => {
  try {
    req.session.userState = await findUserState(req.user);

    return next();
  } catch (e) {
    return next(e);
  }
});

router.use("/guard", require("./guard"));
router.use("/story", require("./story"));
router.use("/gate", require("./gate"));
// router.use("/riddle", require("./riddle"));
router.use("/jail", require("./jail"));

router.get("/ping", async (req, res, next) => {
  try {
    if (req.user && req.user.incarcerated) {
      console.log("validating incarceration");
      const dt = new Date(req.user.incarceratedAt).getTime();
      const hour = 30 * 60 * 1000;
      const now = Date.now();
      const tl = (dt + hour - now) / 1000;
      if (tl < 0) {
        console.log("resetting incarceration");
        await client.user.update({
          where: { id: req.user.id },
          data: { incarcerated: false, incarceratedAt: null },
        });
      }
    }

    const RawVTiles = await client.visitedTile.findMany({
      where: { userId: req.user.id },
    });

    const vTiles = [];

    for (let tile of RawVTiles) {
      if (vTiles.indexOf(tile.tileId) === -1) {
        vTiles.push(tile.tileId);
      }
    }

    res.json({
      success: true,
      userState: req.session.userState,
      vTiles,
      user: req.user,
    });
  } catch (e) {
    return next(e);
  }
});

// Add middleware to check user state
router.post(
  "/move",
  async (req, res, next) => {
    try {
      if (req.session.userState.match(/moveable/)) {
        return next();
      }

      if (
        req.session.userState.match(/skippable/) ||
        req.session.userState === "rp-riddle"
      ) {
        return next();
      }

      if (req.session.userState === "gate-moveable" && req.body.goIn) {
        const levels = await client.userLevel.findMany({
          where: { completed: true, userId: req.user.id },
        });

        if (levels.length < 24) {
          return res.json({ success: false, message: "Eh" });
        }
      }

      return res.json({ success: false, message: "Tile is not moveable" });
    } catch (e) {
      return next(e);
    }
  },
  async (req, res, next) => {
    try {
      const oldTileId = req.user.currentTileId;
      const diceRoll = rollDice();
      let nextTileId = calculateNextTileId(
        req.user.currentTileId,
        diceRoll,
        req.session.userState,
        req.body.goIn,
        req.body.goOut
      );

      if (await checkCenter(req.user)) {
        nextTileId = 81;
      }

      console.log({ nextTileId });

      // Check if tile with id nextTileId exists
      const tile = await client.tile.findOne({
        where: { id: nextTileId },
        include: { level: true },
      });

      if (!tile) {
        return res.json({ success: false, message: "No such tile" });
      }

      let points = req.user.points;
      let timesPassedGo = req.user.timesPassedGo;
      if (
        oldTileId > 38 &&
        oldTileId < 45 &&
        tile.id < 7 &&
        timesPassedGo < 6
      ) {
        await logs.add(
          req.user.id,
          `${req.user.username} passed the Go tile and was awarded 200 points`
        );
        points += 200;
        timesPassedGo += 1;
      }

      const user = await client.user.update({
        where: { id: req.user.id },
        data: {
          currentTile: { connect: { id: tile.id } },
          points,
          timesPassedGo,
        },
      });

      const rc = chooseRandomChance();
      const rp = chooseRandomPerson();

      const vTile = await client.visitedTile.create({
        data: {
          tile: { connect: { id: tile.id } },
          user: { connect: { id: req.user.id } },
          randomChanceType: tile.type === "RAND_CHANCE" ? rc : null,
          randomPersonType: tile.type === "RAND_PERSON" ? rp : null,
        },
      });

      const m = {
        STORY: "a story tile",
        LEVEL: "a level tile",
        RAND_PERSON: "a random person tile",
        RAND_CHANCE: "a random chance tile",
        GO: "the Go tile",
        JAIL: "the Jail tile",
        GATE: "the Gate tile",
        MYSTERY: "the Mystery tile",
        CENTER: "the Center tile",
      };

      if (tile.type === "RAND_CHANCE") {
        const n = {
          JAIL: "was caught evading taxes, they're being sent to jail",
          BRIBE: "has to bribe the game",
          BOUNTY: "was awarded a bounty by the game",
        };

        await logs.add(req.user.id, `${req.user.username} ${n[rc]}`);
      }

      if (tile.type === "RAND_PERSON") {
        const n = {
          ALLY: "was greeted by an ally and given 50 points",
          PICKPOCKET: "lost 50 points to a pickpocket",
          SPHINX: "met a sphinx",
          GUARD: "encountered a guard",
          VILLAGER: "met a villager",
        };

        await logs.add(req.user.id, `${req.user.username} ${n[rp]}`);
      }

      await logs.add(
        req.user.id,
        `${req.user.username} moved to ${m[tile.type]}`
      );

      vTile.tile = tile;

      await actionFromUserState[await findUserState(req.user)](user, vTile)(
        req,
        res,
        next
      );
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
