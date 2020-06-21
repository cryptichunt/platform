const { PrismaClient } = require("@prisma/client");
const logs = require("./logs");

const client = new PrismaClient();

const userStateFromTileType = {
  GO: async () => "go-moveable",
  STORY: async () => "story-moveable",
  LEVEL: async (ct, user) => {
    let [lvl] = await client.userLevel.findMany({
      where: { levelId: ct.tile.levelId, userId: user.id },
    });

    if (!lvl) {
      lvl = await client.userLevel.create({
        data: {
          level: { connect: { id: ct.tile.levelId } },
          user: { connect: { id: user.id } },
        },
      });
    }

    if (lvl.completed) {
      return "levelsolved-moveable";
    }

    return "level";
  },
  RAND_CHANCE: async (ct) => "randchance-moveable",
  RAND_PERSON: async (ct, user) => {
    if (ct.randomPersonType === "SPHINX") {
      const [riddle] = await client.userRiddle.findMany({
        where: { userId: user.id, completed: false },
      });

      return !riddle
        ? "rp-riddle-skippable"
        : riddle.completed
        ? "rp-moveable"
        : "rp-riddle";
    }

    if (ct.randomPersonType === "GUARD") {
      return ct.guardPassed ? "rp-guard-moveable" : "rp-guard";
    }

    return {
      ALLY: "rp-moveable",
      PICKPOCKET: "rp-moveable",
      VILLAGER: "rp-sidequest-skippable",
    }[ct.randomPersonType];
  },
  JAIL: async (ct, user) =>
    user.incarcerated ? "jail" : "jailvisiting-moveable",
  GATE: async () => "gate-moveable",
  MYSTERY: async (ct, user) => "mystery-moveable",
  CENTER: async () => "center",
};

async function findUserState(user) {
  const [currentTile] = await client.visitedTile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 1,
    include: { tile: true },
  });

  const tiles = await client.visitedTile.findMany({
    where: { tileId: currentTile.tileId, userId: user.id },
  });

  if (
    tiles.length > 1 &&
    (currentTile.tile.type !== "GATE" ||
      currentTile.tile.type !== "STORY" ||
      currentTile.tile.type !== "MYSTERY" ||
      currentTile.tile.type !== "CENTER")
  ) {
    return "visited-moveable";
  }

  return await userStateFromTileType[currentTile.tile.type](currentTile, user);
}

const rollDice = () => Math.ceil(Math.random() * 6);

// Dice roll special cases:
// currentTileId === 44: 0 + dice roll
// currentTileId === 76: 40 + dice roll
const calculateNextTileId = (currentTileId, diceRollV) => {
  const next = currentTileId + diceRollV;
  return currentTileId <= 44 && next > 44
    ? next - currentTileId - (44 - currentTileId)
    : currentTileId <= 80 && next > 80
    ? 44 + diceRollV - (44 - currentTileId)
    : next;
};

const chooseRandomChance = () => {
  const rc = ["JAIL", "BRIBE", "BOUNTY"];
  const random = Math.floor(Math.random() * rc.length);

  return rc[random];
};

const chooseRandomPerson = () => {
  const rp = ["ALLY", "PICKPOCKET", "SPHINX", "GUARD", "VILLAGER"];
  const random = Math.floor(Math.random() * rp.length);

  // return 'SPHINX'
  return rp[random];
};

// TODO: Run this after level/answer and actionFromUserState['story']
// const checkCenter = (user) => {
//   const levelCount = await client.userLevel.count({where: {completed: true}})
//   const storyTiles = await client.visitedTile.findMany({where: {}})

//   if(levelCount === 45) {

//   }
// }

module.exports = {
  findUserState,
  actionFromUserState: require("./action-from-user-state"),
  calculateNextTileId,
  rollDice,
  chooseRandomChance,
  chooseRandomPerson,
};
