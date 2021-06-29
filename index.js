import Discord from "discord.js"
import config from "./config.json"
import {bluzelle} from "@bluzelle/sdk-js"
import axios from "axios"
import commaNumber from 'comma-number'
import DiscordButton, { MessageButton } from "discord-buttons"

const uuid = "0f4016c4-47f6-4cdb-ad48-4a6c3971bc24" 

const sdk = await bluzelle({
    mnemonic:"trade lobster opera sauce rapid basket clown diary cattle desert sand decade planet woman symptom vintage track test chalk month cinnamon hello alien west",
    url:"wss://client.sentry.testnet.private.bluzelle.com:26657",
    maxGas:100000000,
    gasPrice:0.002
})


const client = new Discord.Client()
DiscordButton(client)

const prefix = "."

// .ping
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

    if(message.content === ".price") {
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=usd&include_24hr_change=true")
        .then((response) => {
            let change = parseFloat(response.data.bluzelle.usd_24h_change).toFixed(2)
            let color = change >= 0 ? '#8bc34a' : '#f44336';
            let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Price')
            .addField('USD', '$' + response.data.bluzelle.usd)
            .addField('Price Change(24h)', (change >= 0 ? '+' : '') + change + "%")
            message.reply(embed);

        })
    }
})




//.validators
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(message.content.startsWith(".validators")){
        const net = message.content.split(" ")[1]
         
        const mvButton = new MessageButton()
        .setStyle('green')
        .setLabel('mainnet')
        .setID('mainnet_validators')
        
        const tvButton = new MessageButton()
        .setLabel('testnet')
        .setStyle('blurple')
        .setID('testnet_validators')

        switch(net) {
            case "t":
            case "test":
            case "testnet":
                sendTestnetValidators(message.channel)
                break
            case "m":
            case "main":
            case "mainnet":
                sendMainnetValidators(message.channel)
                break
            default:
                message.reply('**Validators from?**', {
                    buttons: [mvButton, tvButton],
                })
        }
    }
})

client.on('clickButton', (button) => {
    if (button.id == 'mainnet_validators') {
        button.defer();
        sendMainnetValidators(button.channel)
    } else if (button.id == 'testnet_validators') {
        button.defer();
        sendTestnetValidators(button.channel)
    }
})

function sendMainnetValidators(message) {
    axios.get("http://sandbox.sentry.net.bluzelle.com:26657/validators").then((response) => {
        let embed = new Discord.MessageEmbed()
        .setColor('#3BA55D')
        .setTitle("Active Validators of mainnet")
        .addField("Count", commaNumber(response.data.result.count))
        .addField("Block Height", commaNumber(response.data.result.block_height))
        .addField("Voting Power", commaNumber(getTotalVotingPower(response.data.result.validators)))
        message.send(embed);
    })
}

function sendTestnetValidators(message) {
    axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/validators").then((response) => {
        let embed = new Discord.MessageEmbed()
        .setColor('#5865F2')
        .setTitle("Active Validators of testnet")
        .addField("Count", commaNumber(response.data.result.count))
        .addField("Block Height", commaNumber(response.data.result.block_height))
        .addField("Voting Power", commaNumber(getTotalVotingPower(response.data.result.validators)))
        message.send(embed);                
    })
}

function getTotalVotingPower(validators) {
    let vp = 0;
    for (let i = 0; i < validators.length; ++i) {
        vp += parseInt(validators[i].voting_power)
    }
    return vp
}


client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(message.content.startsWith(".fetchDB")){
        sdk.db.q.Read({
            uuid:uuid,
            key:"test"
        }).then(response => {
            message.reply(new TextDecoder().decode(response.value))
        })
    }
})

client.login(config.BOT_TOKEN)


