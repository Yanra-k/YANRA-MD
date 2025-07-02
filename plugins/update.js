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

const { cmd } = require('../command'),
  axios = require('axios'),
  fs = require('fs'),
  path = require('path'),
  AdmZip = require('adm-zip')
cmd(
  {
    pattern: 'update',
    alias: ['upgrade', 'sync'],
    react: '\uD83D\uDD04',
    desc: 'Update the bot to the latest version.',
    category: 'misc',
    filename: __filename,
  },
  async (
    _0x2f42ed,
    _0xf65f6b,
    _0x42b29f,
    { from: _0x2dc00f, reply: _0x33b9fc, sender: _0x172d97, isOwner: _0xa49f7e }
  ) => {
    if (!_0xa49f7e) {
      return _0x33b9fc('This command is only for the bot owner.')
    }
    try {
      await _0x33b9fc('```\uD83D\uDD0D Checking for KERM-MD updates...```\n')
      const { data: _0x1258fc } = await axios.get(
          'https://api.github.com/repos/Yanra-k/YANRA-MD/commits/main'
        ),
        _0x190d17 = _0x1258fc.sha
      let _0x429064 = 'unknown'
      try {
        const _0x303e5b = require('../package.json')
        _0x429064 = _0x303e5b.commitHash || 'unknown'
      } catch (_0x38ee37) {
        console.error('Error reading package.json:', _0x38ee37)
      }
      if (_0x190d17 === _0x429064) {
        return _0x33b9fc(
          '```\u2705 Your YANRA-MD bot is already up-to-date!```\n'
        )
      }
      await _0x33b9fc('```Yanra Md Bot Updating...\uD83D\uDE80```\n')
      const _0x4a7e72 = path.join(__dirname, 'latest.zip'),
        { data: _0x99182c } = await axios.get(
          'https://github.com/Yanra-k/YANRA-MD/archive/main.zip',
          { responseType: 'arraybuffer' }
        )
      fs.writeFileSync(_0x4a7e72, _0x99182c)
      await _0x33b9fc('```\uD83D\uDCE6 Extracting the latest code...```\n')
      const _0x74484 = path.join(__dirname, 'latest'),
        _0x4249ba = new AdmZip(_0x4a7e72)
      _0x4249ba.extractAllTo(_0x74484, true)
      await _0x33b9fc('```\uD83D\uDD04 Replacing files...```\n')
      const _0x552090 = path.join(_0x74484, 'YANRA-MD-main'),
        _0x3c64ef = path.join(__dirname, '..')
      copyFolderSync(_0x552090, _0x3c64ef)
      fs.unlinkSync(_0x4a7e72)
      fs.rmSync(_0x74484, {
        recursive: true,
        force: true,
      })
      const _0x200872 = path.join(__dirname, '../package.json'),
        _0x448791 = require(_0x200872)
      _0x448791.commitHash = _0x190d17
      fs.writeFileSync(_0x200872, JSON.stringify(_0x448791, null, 2))
      await _0x33b9fc(
        '```\uD83D\uDD04 Restarting the bot to apply updates...```\n'
      )
      process.exit(0)
    } catch (_0x5b3921) {
      console.error('Update error:', _0x5b3921)
      _0x33b9fc('\u274C Update failed. Please try manually.')
    }
  }
)
function copyFolderSync(_0xd448a9, _0x39d9fa) {
  !fs.existsSync(_0x39d9fa) && fs.mkdirSync(_0x39d9fa, { recursive: true })
  const _0x161f01 = fs.readdirSync(_0xd448a9)
  for (const _0x2d2a03 of _0x161f01) {
    const _0x57877b = path.join(_0xd448a9, _0x2d2a03),
      _0x116374 = path.join(_0x39d9fa, _0x2d2a03)
    if (_0x2d2a03 === 'config.js' || _0x2d2a03 === 'app.json') {
      console.log('Skipping ' + _0x2d2a03 + ' to preserve custom settings.')
      continue
    }
    fs.lstatSync(_0x57877b).isDirectory()
      ? copyFolderSync(_0x57877b, _0x116374)
      : fs.copyFileSync(_0x57877b, _0x116374)
  }
}
