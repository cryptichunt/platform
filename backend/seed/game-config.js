const { PrismaClient } = require('@prisma/client')
const client = new PrismaClient()

module.exports = async function main() {
  const gameConfigCreate = (key, value) =>
    client.gameConfig.upsert({
      where: { key },
      create: { key, value },
      update: { key, value },
    })

  console.log(`${Date.now()} Game config`)
  await Promise.all([
    gameConfigCreate('MYSTERY_TILE_LVL', 'Mystery oooohhhhh'),
    gameConfigCreate('MYSTERY_TILE_ANSWER', 'leedspls'),
    gameConfigCreate('MYSTERY_TILE_OPEN', false),
    gameConfigCreate('MYSTERY_TILE_SOLVED', false),
    gameConfigCreate('ALLY_POINTS', 10000),
    gameConfigCreate('PICKPOCKET_POINTS', 10000),
    gameConfigCreate('GUARD_BRIBE', 15000),
    gameConfigCreate('GO_TILE_GRANT', 15000),
    gameConfigCreate('GO_TILE_TIMES', 5),
  ])
  console.log(`${Date.now()} Game config done`)

  return
}
