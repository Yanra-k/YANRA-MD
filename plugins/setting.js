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

const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    react: "⚙️",
    desc: "settings the bot",
    category: "owner"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) {
            return reply("*⛔️You are not the owner.*");
        }

        let desc = `
        
╭┈┉┉⚡⚙  MD BOT SETTINGS ⚙⚡┉┉┈
┇
┇💼 Work Mode : 𝙿𝚄𝙱𝙻𝙸𝙲🌎/𝙿𝚁𝙸𝙑𝙰𝚃𝙴
┇🔊 Auto Voice : ♻ 𝙾𝙽/𝙾𝙵𝙵
┇📝 Auto Status : ♻ 𝙾𝙽/𝙾𝙵𝙵
┇⌨ Auto Typing : ♻ 𝙾𝙽/𝙾𝙵𝙵
┇🛠 Auto Read Command : ♻ 𝙾𝙽/𝙾𝙵𝙵
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

   🔗  CUSTOMIZE YOUR SETTINGS ⤵️
   
↪ʀᴇᴘʟʏ ᴡɪᴛʜ ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ sᴇʟᴇᴄᴛ

    🔧 OPTIONS MENU 🔧

┣━ WORK MODE ⤵️
┃   ┣ 1.1 🔹 Public Work
┃   ┣ 1.2 🔹 Private Work

┣━ AUTO VOICE ⤵️
┃   ┣ 2.1 🔊 Auto Voice On
┃   ┗ 2.2 🔕 Auto Voice Off

┣━ AUTO STATUS SEEN ⤵️
┃   ┣ 3.1 👁‍🗨 Auto Read Status On
┃   ┗ 3.2 👁❌ Auto Read Status Off

┣━ AUTO TYPING ⤵️
┃   ┣ 4.1 📝 Activate Auto Typing
┃   ┗ 4.2 📝❌ Deactivate Auto Typing

┣━ AUTO STICKER ⤵️
┃   ┣ 5.1 🎉 Activate Auto Sticker
┃   ┗ 5.2 🎉❌ Deactivate Auto Sticker

┣━ ANTI BAD ⤵️
┃   ┣ 6.1 🚫 Activate Anti Bad
┃   ┗ 6.2 🚫❌ Deactivate Anti Bad

┣━ AUTO REPLY ⤵️
┃   ┣ 7.1 💬 Activate Auto Reply
┃   ┗ 7.2 💬❌ Deactivate Auto Reply

┣━ AUTO RECORDING ⤵️
┃   ┣ 8.1 🎥 Activate Auto Recording
┃   ┗ 8.2 🎥❌ Deactivate Auto Recording

┣━ ALWAYS ONLINE ⤵️
┃   ┣ 9.1 🌐 Activate Always Online
┃   ┗ 9.2 🌐❌ Deactivate Always Online

┣━ ANTI LINK ⤵️
┃   ┣ 10.1 🔗 Activate Anti Link
┃   ┗ 10.2 🔗❌ Deactivate Anti Link
┗━━━━━━━━━━━━━━━━━━━━━`;

        const vv = await conn.sendMessage(from, { 
            image: { url: "https://files.catbox.moe/1e05nm.jpeg" }, // Ici, l'utilisateur peut changer l'URL directement
            caption: desc
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        reply(".restart");
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        reply(".restart");
                        break;
                    case '2.1':     
                        reply(".update AUTO_VOICE:true");
                        reply(".restart");
                        break;
                    case '2.2':     
                        reply(".update AUTO_VOICE:false");
                        reply(".restart");
                        break;
                    case '3.1':    
                        reply(".update AUTO_READ_STATUS:true");
                        reply(".restart");
                        break;
                    case '3.2':    
                        reply(".update AUTO_READ_STATUS:false");
                        reply(".restart");
                        break;
                    case '4.1': 
                        reply(".update FAKE_TYPING:true");
                        reply(".restart");
                        break;
                    case '4.2': 
                        reply(".update FAKE_TYPING:false");
                        reply(".restart");
                        break;
                    case '5.1':      
                        reply(".update AUTO_STICKER:true");
                        reply(".restart");
                        break;
                    case '5.2':   
                        reply(".update AUTO_STICKER:false");
                        reply(".restart");
                        break;
                    case '6.1': 
                        reply(".update ANTI_BAD:true");
                        reply(".restart");
                        break;
                    case '6.2':   
                        reply(".update ANTI_BAD:false");
                        reply(".restart");
                        break;
                    case '7.1': 
                        reply(".update AUTO_REPLY:true");
                        reply(".restart");
                        break;
                    case '7.2':   
                        reply(".update AUTO_REPLY:false");
                        reply(".restart");
                        break;
                    case '8.1': 
                        reply(".update FAKE_RECORDING:true");
                        reply(".restart");
                        break;
                    case '8.2':   
                        reply(".update FAKE_RECORDING:false");
                        reply(".restart");
                        break;
                    case '9.1': 
                        reply(".update ALWAYS_ONLINE:true");
                        reply(".restart");
                        break;
                    case '9.2':   
                        reply(".update ALWAYS_ONLINE:false");
                        reply(".restart");
                        break;
                    case '10.1': 
                        reply(".update ANTI_LINK:true");
                        reply(".restart");
                        break;
                    case '10.2':   
                        reply(".update ANTI_LINK:false");
                        reply(".restart");
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});