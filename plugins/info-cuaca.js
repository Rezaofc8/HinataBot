import axios from 'axios'

let handler = async (m, { conn, args  , usedPrefix, command })=>{
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let namemu = await conn.getName(who)

if(!args[0]) throw " please provide place or location name"
    try{
        const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`)
        const res = await response

        const name = res.data.name
        const Country = res.data.sys.country
        const Weather= res.data.weather[0].description
        const Temperature = res.data.main.temp + 'Ā°C'
        const Minimum_Temperature= res.data.main.temp_min + 'Ā°C'
        const Maximum_Temperature= res.data.main.temp_max + 'Ā°C'
        const Humidity= res.data.main.humidity + '%'
        const Wind= res.data.wind.speed + 'km/h'


        let caption = `
        šø Place: ${name}\nš® Country: ${Country}\nš Weather: ${Weather}\nš Temperature: ${Temperature}\nš  Minimum Temperature: ${Minimum_Temperature}\nš Maximum Temperature: ${Maximum_Temperature}\nš¦ Humidity: ${Humidity}\nš Wind: ${Wind}
        `.trim()
        
        conn.sendButton(m.chat, caption, wm, await(await fetch(pp)).buffer(), [['š Menu', '/menu']], m, { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: {
          externalAdReply :{
    mediaUrl: sig,
    mediaType: 2,
    description: wm, 
    title: 'š Hai, ' + namemu + ' ' + ucapan,
    body: botdate,
    thumbnail: await(await fetch(hwaifu.getRandom())).buffer(),
    sourceUrl: 'https://api.openweathermap.org'
     }}
  })
    }catch(e){
throw 'location not found' 
console.log(e)
    }
}

handler.help = ['infocuaca <city>']
handler.tags = ['info']
handler.command = /^infocuaca|weather$/i
handler.limit = true

export default handler