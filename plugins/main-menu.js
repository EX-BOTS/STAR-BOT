import db from '../lib/database.js'
import fs from 'fs'
import { blueh } from '../../../FussionScreen/loadings.js'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
const {
    proto,
    generateWAMessage,
    areJidsSameUser
} = (await import('@whiskeysockets/baileys')).default
import { promises } from 'fs'
import fs from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone' 

let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length
let tags = {
  'main': 'Main'
}
const defaultMenu = {
before: `
 ╭━━━〔丂ㄒ卂尺〕━━━┈⊷
┃✰│𝗨𝘀𝗲𝗿: %name    
┃✰│𝗗𝗲𝘃:𝙴𝚇𝙲𝙴𝙻
┃✰│𝗠𝗼𝗱𝗲: %mode
┃✰│𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: %platform
┃✰│𝗧𝘆𝗽𝗲: 𝙽𝚘𝚍𝚎𝙹𝚜
┃✰│𝗕𝗮𝗶𝗹𝗲𝘆𝘀: 𝙼𝚞𝚕𝚝𝚒 𝙳𝚎𝚟𝚒𝚌𝚎
┃✰│𝗣𝗿𝗲𝗳𝗶𝘅: [ *%_p* ]
┃✰│𝗨𝗽𝘁𝗶𝗺𝗲: %muptime
┃✰│𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲:  %totalreg
┃✰│𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: %totalfeatures 
┃✰│
┃✰╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
 *©ＳＴＡＲ-ＭＤ-Ｖ２*

  %readmore`.trimStart(),
  header: '╭─┉┉┈◈ *%category* ◈┈┉┉𓆩ꨄ︎𓆪 ',
  body: '┇ ☆  %cmd',
  footer: '╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉𓆩ꨄ︎𓆪\n',
   after: `©𝚂𝚃𝙰𝚁-𝙼𝙳-𝚅𝟸`,
  }

export default handler;
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
let sdevs = global.db.data.chats[m.chat].menud

    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { rank } = global.db.data.users[m.sender]
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '[🅛]' : '')
                .replace(/%isPremium/g, menu.premium ? '[🅟]' : '')
                .replace(/%isVip/g, menu.vip ? '[🅥]' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './media/contact.png')

let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: text.replace()
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `${global.stkowner}`
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "",
            subtitle: "",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Owner\",\"id\":\"/owner\"}{\"display_text\":\"Script \",\"id\":\"*script\"}{\"display_text\":\"Bot Speed 🚀\",\"id\":\"*ping\"}"
              }
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})

};

  } catch (e) {
   // conn.reply(m.chat, 'ERROR IN MENU', m)
    throw stop
  }
}

handler.command = /^(menu|help)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

