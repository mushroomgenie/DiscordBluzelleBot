import Discord from "discord.js"
import config from "./config.json"
import {bluzelle} from "@bluzelle/sdk-js"
import axios from "axios"

const sdk = await bluzelle({
    mnemonic:"trade lobster opera sauce rapid basket clown diary cattle desert sand decade planet woman symptom vintage track test chalk month cinnamon hello alien west",
    url:"wss://client.sentry.testnet.private.bluzelle.com:26657",
    maxGas:100000000,
    gasPrice:0.002
})

const client = new Discord.Client()
const prefix = "."

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

    else if(message.content === ".price"){
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=usd").then((response) => {
            message.reply(response.data.bluzelle.usd + "$")
        })
    }
})


client.login(config.BOT_TOKEN)


