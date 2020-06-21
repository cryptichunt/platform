const { PrismaClient } = require('@prisma/client')

module.exports = {
  client: new PrismaClient(),
}
