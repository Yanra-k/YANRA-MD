const { cmd } = require('../command');
const util = require('util');
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "eval",
    desc: "system",
    category: "Evaluate code",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    let c = q;
    if (!c) return reply(`_Please provide code to run_`);

    try {
      let s = await eval(c);
      if (typeof s !== "string") s = util.inspect(s);
      await reply(s);
    } catch (e) {
      await reply(util.format(e));
    }
  }
);