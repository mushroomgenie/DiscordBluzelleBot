import Discord from "discord.js"
import config from "./config.json"
import {bluzelle} from "@bluzelle/sdk-js"
import axios from "axios"
import DiscordButton, { MessageButton } from "discord-buttons"

const sdk = await bluzelle({
    mnemonic:"trade lobster opera sauce rapid basket clown diary cattle desert sand decade planet woman symptom vintage track test chalk month cinnamon hello alien west",
    url:"wss://client.sentry.testnet.private.bluzelle.com:26657",
    maxGas:100000000,
    gasPrice:0.002
})

const client = new Discord.Client()
const dButton = DiscordButton(client);
const prefix = "."

// .pring
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ')
    const command = args.shift().toLocaleLowerCase()

    if(command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong!Time taken = ${timeTaken}`)
    }
})

// .read {address}
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(message.content.startsWith(".read")){
        const args = message.content.split(" ")
        sdk.bank.q.Balance({
            address:args[1],
            denom:"ubnt"
        }).then((response) => {
            message.reply(response.balance.amount)
        })
    }
})

// .price
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    // const rButton = new MessageButton()
    // .setLabel('🔄')
    // .setStyle('gray')
    // .setID('refreshPrice')

    if(message.content === ".price") {
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=usd&include_24hr_change=true")
        .then((response) => {
            let change = parseFloat(response.data.bluzelle.usd_24h_change).toFixed(2)
            let color = change >= 0 ? '#8bc34a' : '#f44336';
            let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle(`The price in USD is $${response.data.bluzelle.usd}`)
            .setDescription('Price Change(24h): ' + (change >= 0 ? '+' : '') + change)
            message.reply(embed);
            // message.reply('', {
            //     buttons: [rButton],
            //     embed: embed
            // })
        })
    }
})

// client.on('clickButton', (button) => {

//     if (button.id == 'refreshPrice') {
//         button.defer();
//         console.log(button);
//     }
// })

client.login(config.BOT_TOKEN)


