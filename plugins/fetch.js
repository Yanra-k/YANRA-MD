const { cmd } = require("../command");
const fetch = require("node-fetch");
const cheerio = require('cheerio');

// Fonction principale de fetch
const fetchContent = async (url, client, m) => {
    try {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');

        if (!contentType) {
            return m.reply("The server did not return a content-type.");
        }

        console.log("Content-Type:", contentType);

        if (contentType.includes('application/json')) {
            const data = await response.json();
            return m.reply(JSON.stringify(data, null, 2));
        }

        if (contentType.includes('text/html')) {
            const html = await response.text();
            return m.reply(html);
        }

        if (contentType.includes('image')) {
            const imageBuffer = await response.buffer();
            return client.sendMessage(
                m.chat,
                { image: imageBuffer, caption: url },
                { quoted: m }
            );
        }

        if (contentType.includes('video')) {
            const videoBuffer = await response.buffer();
            return client.sendMessage(
                m.chat,
                { video: videoBuffer, caption: url },
                { quoted: m }
            );
        }

        if (contentType.includes('audio')) {
            const audioBuffer = await response.buffer();
            const filename = url.split('/').pop();
            return client.sendMessage(
                m.chat,
                {
                    audio: { url: url },
                    mimetype: "audio/mpeg",
                    fileName: filename,
                },
                { quoted: m }
            );
        }

        if (contentType.includes('application/pdf')) {
            return client.sendMessage(
                m.chat,
                {
                    document: { url: url },
                    mimetype: "application/pdf",
                    fileName: url.split('/').pop(),
                },
                { quoted: m }
            );
        }

        if (contentType.includes('application')) {
            return client.sendMessage(
                m.chat,
                {
                    document: { url: url },
                    mimetype: contentType,
                    fileName: url.split('/').pop(),
                },
                { quoted: m }
            );
        }

        return m.reply("The content type is unsupported or could not be determined.");
    } catch (error) {
        console.error(error);
        return m.reply("An error occurred while fetching the URL.");
    }
};

// Commande pour fetch
cmd({
    pattern: 'fetch',
    desc: 'Fetch content from a provided URL.',
    category: 'utility',
    react: '🌐',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("Provide a valid URL to fetch!");
    await fetchContent(q, conn, m);
});

const fetchAndParseWebsite = async (url, client, m, reply) => {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const mediaFiles = [];
        $('img[src], video[src], audio[src]').each((i, element) => {
            let src = $(element).attr('src');
            if (src) {
                mediaFiles.push(src);
            }
        });

        const cssFiles = [];
        $('link[rel="stylesheet"]').each((i, element) => {
            let href = $(element).attr('href');
            if (href) {
                cssFiles.push(href);
            }
        });

        const jsFiles = [];
        $('script[src]').each((i, element) => {
            let src = $(element).attr('src');
            if (src) {
                jsFiles.push(src);
            }
        });

        await reply(`**Full HTML Content**:\n\n${html}`);

        if (cssFiles.length > 0) {
            for (const cssFile of cssFiles) {
                const cssResponse = await fetch(new URL(cssFile, url));
                const cssContent = await cssResponse.text();
                await reply(`**CSS File Content**:\n\n${cssContent}`);
            }
        } else {
            await reply("No external CSS files found.");
        }

        if (jsFiles.length > 0) {
            for (const jsFile of jsFiles) {
                const jsResponse = await fetch(new URL(jsFile, url));
                const jsContent = await jsResponse.text();
                await reply(`**JavaScript File Content**:\n\n${jsContent}`);
            }
        } else {
            await reply("No external JavaScript files found.");
        }

        if (mediaFiles.length > 0) {
            await reply(`**Media Files Found**:\n${mediaFiles.join('\n')}`);
        } else {
            await reply("No media files (images, videos, audios) found.");
        }
    } catch (error) {
        console.error(error);
        return reply("An error occurred while fetching the website content.");
    }
};

// Commande pour fetch avec cheerio
cmd({
    pattern: 'web',
    desc: 'Fetch and parse content from a provided web link.',
    category: 'utility',
    react: '🌐',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("Provide a valid web link to fetch! The bot will crawl the website and fetch its HTML, CSS, JavaScript, and any media embedded in it.");
    if (!/^https?:\/\//i.test(q)) {
        return reply("Please provide a URL starting with http:// or https://");
    }
    await fetchAndParseWebsite(q, conn, m, reply);
});