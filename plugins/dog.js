/*
_  ______   _____ _____ _____ _   _
| |/ / ___| |_   _| ____/___ | | | |
| ' / |  _    | | |  _|| |   | |_| |
| . \ |_| |   | | | |__| |___|  _  |
|_|\_\____|   |_| |_____\____|_| |_|

ANYWAY, YOU MUST GIVE CREDIT TO MY CODE WHEN COPY IT
CONTACT ME HERE +237656520674
YT: KermHackTools
Github: Kgtech-cmr
*/

const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "dog",
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: 'YANRA-MD DOWNLOAD DOG 🐕 PICS\n\n\n> *🐕BY KG TECH🐕*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error Fetching Dog Image🤕: ${e.message}`);
    }
});
cmd({
    pattern: "cat",
    desc: "Fetch a random cat image.",
    category: "fun",
    react: "🐱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // API URL to fetch a random cat image
        const apiUrl = `https://api.thecatapi.com/v1/images/search`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Send the cat image with a caption
        await conn.sendMessage(from, { image: { url: data[0].url }, caption: 'YANRA-MD DOWNLOAD CAT 🐈 PICS\n\n> *🐈BY KG TECH🐈*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error Fetching Cat Image 🤕: ${e.message}`);
    }
});