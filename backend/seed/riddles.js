const { PrismaClient } = require('@prisma/client')
const client = new PrismaClient()

module.exports = async function main() {
  // Create riddles
  console.log(`${Date.now()} Game riddles`)
  const rawRiddles = Array(45)
    .fill('x')
    .map((_, i) => ({
      riddle: `This is riddle ${i + 1}`,
      points: (i + 1) * 250,
      answer: 'leedspls',
    }))
  const riddleRecords = []
  for (let riddle of rawRiddles) {
    riddleRecords.push(await client.riddle.create({ data: riddle }))
  }
  console.log(`${Date.now()} Game riddles done`)

  return
}
