const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

module.exports = async function main() {
  // Create levels
  console.log(`${Date.now()} Game levels`);
  const rawLevels = Array(47)
    .fill("x")
    .map((_, i) => ({
      level: i === 46 ? "Mystery lvl" : `This is level ${i + 1}`,
      points: (i + 1) * 250,
      answer: "leedspls",
    }));
  const lvlRecords = [];
  for (let lvl of rawLevels) {
    lvlRecords.push(await client.level.create({ data: lvl }));
  }
  console.log(`${Date.now()} Game levels done`);

  return;
};
