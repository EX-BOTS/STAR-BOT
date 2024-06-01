import axios from 'axios'

let handler = async (m, { text, conn, usedPrefix, command }) => {


 await conn.sendButton(m.chat,result, author, 'https://telegra.ph/file/8eb79a63a0bed4cd90c76.jpg', [['GROUPS', `${usedPrefix}groups`]], null, [['STREAM ANIME', `https://www.anime-planet.com/anime/watch-online/`]], m)

  }

handler.help = ['stream']

handler.tags = ['main']

handler.command = ['stream']

export default handler