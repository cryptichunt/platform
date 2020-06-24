const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const rawTiles = require("../lib/tiles");
const tiles = [...rawTiles];

const transformers = {
  GO: (t) => ({ type: t.type }),
  JAIL: (t) => ({ type: t.type }),
  GATE: (t) => ({ type: t.type }),
  GATEI: (t) => ({ type: t.type, number: t.number }),
  MYSTERY: (t) => ({ type: t.type, level: { connect: { id: t.levelId } } }),
  CENTER: (t) => ({ type: t.type, level: { connect: { id: t.levelId } } }),
  LEVEL: (t) => ({
    type: t.type,
    number: t.number,
    level: { connect: { id: t.levelId } },
  }),
  RAND_CHANCE: (t) => ({
    type: t.type,
    number: t.number,
  }),
  RAND_PERSON: (t) => ({
    type: t.type,
    number: t.number,
  }),
  STORY: (t) => ({
    type: t.type,
    number: t.number,
    story: t.story,
  }),
};

module.exports = async function main() {
  console.log(`${Date.now()} Game tiles`);
  for (let tile of tiles) {
    await client.tile.create({
      data: transformers[tile.type](tile),
    });
  }
  console.log(`${Date.now()} Game tiles done`);

  return;
};
