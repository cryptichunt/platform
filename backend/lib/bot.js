const Discord = require("discord.js");
const { client } = require("./prisma");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async (msg) => {
  // if (msg.member.roles.find((r) => r.name === 'Admin')) {
  // if (msg.member.roles.includes('Admin')) {
  if (msg.content.startsWith("crypto ")) {
    const command = msg.content.split(" ")[1];

    // Get logs for a user
    if (command === "logs") {
      const username = msg.content.split(" ")[2];

      const logs = await client.log.findMany({
        where: { user: { username } },
        orderBy: {
          createdAt: "desc",
        },
        take: 30,
      });

      const res = logs
        .map(
          (log) => `${log.createdAt.toLocaleTimeString("en-US")}: ${log.log}`
        )
        .join("\n");

      console.log(`Logs were requested for ${username}`);
      await msg.reply(res);
    }

    if (command === "tile") {
      const username = msg.content.split(" ")[2];
      console.log(username);

      const { currentTileId } = await client.user.findOne({
        where: { username },
      });
      const { number, type } = await client.tile.findOne({
        where: { id: currentTileId },
      });

      const res = `${username} is currently on tile number ${number} with id ${currentTileId} and type '${type}'.`;
      console.log(res);
      await msg.reply(res);
    }

    if (command === "hint") {
      const username = msg.content.split(" ")[2];

      const { hasHintCard } = await client.user.findOne({
        where: { username },
      });

      const res = hasHintCard
        ? `${username} has a hint card`
        : `${username} does not have a hint card`;

      console.log(res);
      await msg.reply(res);
    }

    // Show suspicious activity
    if (command === "flagged") {
      // TODO: Get flagged logs with timestamps and usernames

      const flaggedLogs = await client.log.findMany({
        where: { flagged: true },
        orderBy: {
          createdAt: "desc",
        },
        take: 30,
      });

      const res = flaggedLogs
        .map(
          (log) =>
            `${log.createdAt.toLocaleTimeString("en-US")}: (${log.userId}) ${
              log.log
            }`
        )
        .join("\n");
      console.log(res);
      await msg.reply(res);
    }
  }
});

// bot.login(process.env.DISCORD_TOKEN);
bot.login("NzIzMjQ1OTg3OTA4NDE5NjU2.XvR1sg.q8Ha_9GI4dLGxzGAI8kgloRAdQ4");
