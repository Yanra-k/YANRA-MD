const axios = require('axios');
const { cmd, commands } = require('../command');

// Required modules
const fetch = require('node-fetch');  // For fetching external resources (if needed)
const yts = require('yt-search');     // For searching YouTube videos

// Command setup
cmd({
  pattern: "langcode",  // Trigger for the command
  desc: "Display all ISO 639-1 language codes.",  // Description of the command
  react: "🌍",  // Reaction emoji
  category: "info",  // Category of the command
  filename: __filename  // Current filename
}, async (bot, message, chat, { from, reply }) => {
  try {
    // Language codes list with ISO 639-1 codes and their country flags
    const languageList = `🌍 *Complete list of ISO 639-1 language codes* 🌍
━━━━━━━━━━━━━━━━━━━
🇦🇫 *Pashto* ➝ ps  
🇦🇱 *Albanian* ➝ sq  
🇩🇿 *Arabic* ➝ ar  
🇦🇲 *Armenian* ➝ hy  
🇦🇺 *English* ➝ en  
🇦🇿 *Azerbaijani* ➝ az  
🇧🇩 *Bengali* ➝ bn  
🇧🇬 *Bulgarian* ➝ bg  
🇧🇷 *Portuguese* ➝ pt  
🇨🇳 *Chinese* ➝ zh  
🇨🇿 *Czech* ➝ cs  
🇩🇪 *German* ➝ de  
🇩🇰 *Danish* ➝ da  
🇪🇸 *Spanish* ➝ es  
🇪🇪 *Estonian* ➝ et  
🇪🇺 *Basque* ➝ eu  
🇫🇷 *French* ➝ fr  
🇬🇷 *Greek* ➝ el  
🇮🇩 *Indonesian* ➝ id  
🇮🇪 *Irish* ➝ ga  
🇮🇹 *Italian* ➝ it  
🇯🇵 *Japanese* ➝ ja  
🇮🇳 *Hindi* ➝ hi  
🇰🇷 *Korean* ➝ ko  
🇱🇻 *Latvian* ➝ lv  
🇱🇹 *Lithuanian* ➝ lt  
🇲🇦 *Berber* ➝ ber  
🇲🇽 *Spanish* ➝ es  
🇳🇱 *Dutch* ➝ nl  
🇳🇴 *Norwegian* ➝ no  
🇵🇱 *Polish* ➝ pl  
🇷🇴 *Romanian* ➝ ro  
🇷🇺 *Russian* ➝ ru  
🇸🇦 *Arabic* ➝ ar  
🇸🇮 *Slovenian* ➝ sl  
🇸🇰 *Slovak* ➝ sk  
🇸🇪 *Swedish* ➝ sv  
🇹🇭 *Thai* ➝ th  
🇹🇷 *Turkish* ➝ tr  
🇺🇦 *Ukrainian* ➝ uk  
🇺🇿 *Uzbek* ➝ uz  
🇿🇦 *Afrikaans* ➝ af  
🇻🇳 *Vietnamese* ➝ vi  
━━━━━━━━━━━━━━━━━━━
✅ *Use these codes for translation and other language functions!*`;

    // Image URL: Use your own custom image URL here
    const imageUrl = "https://files.catbox.moe/jf2g4q.jpeg"; // Replace this URL with the link to your image

    // Sending the message with language list and image
    await bot.sendMessage(from, {
      image: { url: imageUrl },  // Sending your own image
      caption: languageList  // Sending the language list
    }, { quoted: message });

  } catch (error) {
    // Error handling
    console.log(error);  // Log the error for debugging
    reply("❌ An error occurred.");
  }
});