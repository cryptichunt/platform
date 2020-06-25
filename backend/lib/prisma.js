const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

client.on("query", (prismaEvent) => {
  console.log({ prismaEvent });
});

module.exports = { client };
