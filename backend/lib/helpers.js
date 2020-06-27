const { client } = require("./prisma");

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
  RAND_CHANCE: async () => "randchance-moveable",
  RAND_PERSON: async (ct, user) => {
    if (ct.randomPersonType === "SPHINX") {
      const [riddle] = await client.userRiddle.findMany({
        where: { userId: user.id, tileId: ct.id },
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
  JAIL: async (_, user) => {
    return user.incarcerated ? "jail" : "jailvisiting-moveable";
  },
  GATE: async () => "gate-moveable",
  GATEI: async () => "gatei-moveable",
  MYSTERY: async (ct, user) => {
    if (!ct.tile.mysteryTileOpen) {
      return "mystery-moveable";
    }

    let [level] = await client.userLevel.findMany({
      where: { level: { id: 47 } },
    });

    if (!level) {
      level = await client.userLevel.create({
        data: {
          level: { connect: { id: 47 } },
          user: { connect: { id: user.id } },
          completed: false,
        },
      });
    }

    if (level.completed) {
      return "mystery-completed-moveable";
    }

    return "mystery";
  },
  CENTER: async (ct, user) => {
    let [lvl] = await client.userLevel.findMany({
      where: { userId: user.id, levelId: ct.tile.levelId },
      include: { level: true },
    });

    if (!lvl) {
      lvl = await client.userLevel.create({
        data: {
          level: { connect: { id: ct.tile.levelId } },
          user: { connect: { id: user.id } },
          completed: false,
        },
      });
    }

    if (lvl.completed) {
      return "finished";
    }

    return "center";
  },
};

async function findUserState(user) {
  const [currentTile] = await client.visitedTile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 1,
    include: { tile: true },
  });

  console.log({ currentTile });

  const tiles = await client.visitedTile.findMany({
    where: { tileId: currentTile.tileId, userId: user.id },
  });

  if (tiles.length > 1) {
    console.log(currentTile.tile.type);
    const moveable = ["STORY", "LEVEL", "RAND_PERSON", "RAND_CHANCE"];

    if (moveable.indexOf(currentTile.tile.type) !== -1) {
      console.log("visited-moveable");
      return "visited-moveable";
    }
  }

  const state = await userStateFromTileType[currentTile.tile.type](
    currentTile,
    user
  );
  console.log(state);
  return state;
}

const rollDice = () => Math.ceil(Math.random() * 6);

// Dice roll special cases:
// currentTileId === 44: 0 + dice roll
// currentTileId === 76: 40 + dice roll
const calculateNextTileId = (
  currentTileId,
  diceRollV,
  userState,
  goIn,
  goOut
) => {
  const next = currentTileId + diceRollV;

  if (userState === "gate-moveable" && goIn) {
    console.log("movein", 44 + diceRollV);
    return 44 + diceRollV;
  }

  if (userState === "gatei-moveable" && goOut) {
    console.log("moveout", 23 + diceRollV);
    return 23 + diceRollV;
  }
  if (currentTileId <= 44 && next > 44) {
    return 0 + diceRollV - (44 - currentTileId);
  }

  if (currentTileId <= 80 && next > 80) {
    console.log("over 80");
    return 44 + diceRollV - (80 - currentTileId);
  }

  return next;
};

const chooseRandomChance = () => {
  const r = Math.random();

  if (r < 0.45) {
    return "BRIBE";
  }

  if (r < 0.9) {
    return "BOUNTY";
  }

  return "JAIL";
};

const chooseRandomPerson = () => {
  const rp = ["ALLY", "PICKPOCKET", "SPHINX", "GUARD", "VILLAGER"];
  const random = Math.floor(Math.random() * rp.length);

  return rp[random];
};

const checkCenter = async (user) => {
  const tiles = await client.visitedTile.findMany({
    where: { userId: user.id },
  });
  const levels = await client.userLevel.findMany({
    where: { userId: user.id },
  });

  const vTiles = [];

  for (let tile of tiles) {
    if (vTiles.indexOf(tile.tileId) === -1) {
      vTiles.push(tile.tileId);
    }
  }

  if (levels.length > 44 && vTiles.length > 79) {
    return true;
  }

  return false;
};

module.exports = {
  findUserState,
  actionFromUserState: require("./action-from-user-state"),
  calculateNextTileId,
  rollDice,
  chooseRandomChance,
  chooseRandomPerson,
  checkCenter,
};
