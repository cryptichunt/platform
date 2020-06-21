const { client } = require('./prisma')

/**
 * @param {number} userId
 * @param {string} log
 * @param {boolean} adminOnly
 */
async function add(userId, log, adminOnly) {
  const logRecord = await client.log.create({
    data: { user: { connect: { id: userId } }, log, adminOnly },
  })

  return logRecord
}

module.exports = { add }
