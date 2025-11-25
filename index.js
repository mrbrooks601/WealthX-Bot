// =============== IMPORTS ===============
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const fetch = require("node-fetch");
const cron = require("cron");

// =============== DISCORD BOT CLIENT ===============
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.DISCORD_TOKEN;

// =============== CHANNEL IDS ===============
const CHANNELS = {
  motivation: "1442718270275981463",
  smcAlerts: "1442690036566069331",
  econData: "1442690139032916150",
  marketNews: "1442690226148347956",
  credit: "1442692177074327653",
  realEstate: "1442692316518289448",
  health: "1442692434856247466"
};

// =============== EXPRESS KEEP-ALIVE SERVER (REQUIRED FOR RAILWAY) ===============
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("WealthX Bot Running"));
app.listen(3000, () => console.log("WealthX server online!"));

// =============== TRADINGVIEW WEBHOOK ENDPOINT ===============
app.post("/webhook", (req, res) => {
  try {
    const alertMessage = req.body.message || "Smart Money Alert Triggered!";
    const channel = client.channels.cache.get(CHANNELS.smcAlerts);
    if (channel) channel.send(`📈 **SMART MONEY ALERT**\n${alertMessage}`);
    res.status(200).send("Alert delivered.");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error.");
  }
});

// =============== MOTIVATION DAILY POST ==============
