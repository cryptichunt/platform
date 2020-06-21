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
        take: 50,
      });

      await msg.reply(
        logs
          .map(
            (log) => `${log.createdAt.toLocaleTimeString("en-US")}: ${log.log}`
          )
          .join("\n")
      );
    }

    // Show suspicious activity
    if (command === "flagged") {
      // TODO: Get flagged logs with timestamps and usernames

      msg.reply("ok showing u lots of flags....");
    }
  }
});

bot.login(process.env.DISCORD_TOKEN);
