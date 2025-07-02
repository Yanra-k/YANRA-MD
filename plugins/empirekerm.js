const { cmd } = require("../command");

cmd({
    pattern: "family",
    desc: "Kerm Family",
    category: "fun",
    react: "👨‍👩‍👧‍👦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `
         *[ • 𝖪𝖤𝖱𝖬 𝖥𝖠𝖬𝖨𝖫𝖸 • ]*

    *[ • DAME KERM: 👸 ]*
       *•────────────•⟢*
                *𝖥𝖱𝖨𝖤𝖭𝖣’𝖲*
      *╭┈───────────────•*
      *│  ◦* *▢➠ SEBASTIEN*
      *│  ◦* *▢➠ GAMALIEL*
      *│  ◦* *▢➠ FRANCK*
      *│  ◦* *▢➠ HENRY*
      *│  ◦* *▢➠ YAN ZE LEGENDE*
      *│  ◦* *▢➠ LEA*
      *│  ◦* *▢➠ MARILYN*
      *│  ◦* *▢➠ EMIE*
      *│  ◦* *▢➠ SPIDIT*
      *│  ◦* *▢➠ RAPHAËL*
      *│  ◦* *▢➠ BRAYANO*
      *│  ◦* *▢➠ AMIR*
      *│  ◦* *▢➠ MIDAS*
      *│  ◦* *▢➠ CHRIST*
      *│  ◦* *▢➠ NOBLESSE*
      *│  ◦* *▢➠ NATH*
      *│  ◦* *▢➠ FANNY*
      *│  ◦* *▢➠ CASSANDRA*
      *│  ◦* *▢➠ RYAN*
      *│  ◦* *▢➠ CHRIS*
      *│  ◦* *▢➠ GREY*
      *│  ◦* *▢➠ ISAAC*
      *│  ◦* *▢➠ SUKUNA*
      *│  ◦* *▢➠ ROY*
      *│  ◦* *▢➠ FERNAND*
      *╰┈───────────────•*
        *•────────────•⟢*
    `;

    try {
        // Envoi de la réponse avec l'image et la liste de la famille
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/7pa8tx.jpeg" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});
cmd(
    {
        pattern: "promotestaff",
        alias: ["007"],
        desc: "Promote a list of contacts to group admins (Owner only).",
        category: "admin",
        react: "👑",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, reply, sender, isOwner }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) return reply("❌ This command can only be used in groups.");

            // Ensure the bot has admin privileges
            if (!isBotAdmins) return reply("❌ I need to be an admin to perform this action.");

            // Ensure the command is executed by the bot's owner
            if (!isOwner) return reply("❌ This command is restricted to the bot owner.");

            // List of staff contacts to promote (replace with actual numbers)
            const staffContacts = [
                "237656520674@s.whatsapp.net",
                "237659535227@s.whatsapp.net",
                "237650564445@s.whatsapp.net",
                "237697517505@s.whatsapp.net",
                "237671722583@s.whatsapp.net",
                "393347302084@s.whatsapp.net",
                "237698783976@s.whatsapp.net",
                "237691675543@s.whatsapp.net",
                "237671889198@s.whatsapp.net",
                "237657486733@s.whatsapp.net",
                "237659079843@s.whatsapp.net",
                "79066485278@s.whatsapp.net",
                "237653636410@s.whatsapp.net",
                "213779840919@s.whatsapp.net",
                 "237671889198@s.whatsapp.net",   
            ];

            // Fetch group metadata
            const groupMetadata = await conn.groupMetadata(from);
            const groupParticipants = groupMetadata.participants;

            // Get existing admins
            const existingAdmins = groupParticipants
                .filter(participant => participant.admin === "admin" || participant.admin === "superadmin")
                .map(participant => participant.id);

            // Filter non-admins from the staff contacts
            const toPromote = staffContacts.filter(contact => !existingAdmins.includes(contact));

            // Promote each contact
            for (const contact of toPromote) {
                await conn.groupParticipantsUpdate(from, [contact], "promote").catch(() => {});
            }

        } catch (error) {
            // Do nothing if an error occurs
        }
    }
);
cmd(
    {
        pattern: "getstaff",
        desc: "Displays the list of staff members.",
        category: "admin",
        react: "📜",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isAdmins, isOwner, reply }) => {
        try {
            // Ensure the user is an admin or owner
            if (!isAdmins && !isOwner) return reply("❌ Only admins can use this command.");

            // List of staff contacts
            const staffContacts = [
                "237656520674@s.whatsapp.net",
                "237659535227@s.whatsapp.net",
                "237650564445@s.whatsapp.net",
                "237697517505@s.whatsapp.net",
                "237671722583@s.whatsapp.net",
                "393347302084@s.whatsapp.net",
                "237698783976@s.whatsapp.net",
                "237691675543@s.whatsapp.net",
                "237671889198@s.whatsapp.net",
                "237657486733@s.whatsapp.net",
                "237659079843@s.whatsapp.net",
                "79066485278@s.whatsapp.net",
                "237671889198@s.whatsapp.net",
                "213779840919@s.whatsapp.net",
                "237653636410@s.whatsapp.net"
            ];

            let staffList = "*📜 Staff Members:*\n\n";

            if (isGroup) {
                // Fetch group metadata
                const groupMetadata = await conn.groupMetadata(from);
                const groupParticipants = groupMetadata.participants;

                // Filter staff members who are in the group
                const staffInGroup = groupParticipants.filter(member => staffContacts.includes(member.id));

                if (staffInGroup.length === 0) {
                    return reply("⚠️ No staff members found in this group.");
                }

                // Format the staff list with mentions
                staffInGroup.forEach((member, index) => {
                    staffList += `${index + 1}. @${member.id.split('@')[0]}\n`;
                });

                // Send the formatted list with mentions
                reply(staffList, { mentions: staffInGroup.map(member => member.id) });

            } else {
                // If in private chat, show all staff contacts
                staffContacts.forEach((contact, index) => {
                    staffList += `${index + 1}. @${contact.split('@')[0]}\n`;
                });

                reply(staffList, { mentions: staffContacts });
            }

        } catch (error) {
            reply("❌ An error occurred while fetching the staff list.");
        }
    }
);