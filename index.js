import Discord from "discord.js"
import {bluzelle} from "@bluzelle/sdk-js"
import axios from "axios"
import commaNumber from 'comma-number'
import DiscordButton, { MessageButton } from "discord-buttons"
import dotenv from "dotenv"
dotenv.config()

const sdk = await bluzelle({
    mnemonic:process.env.MNEMONIC,
    url:"wss://client.sentry.testnet.private.bluzelle.com:26657",
    maxGas:100000000,
    gasPrice:0.002
})

const client = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] } });

DiscordButton(client)

const prefix = "."
let inline = false

// command ".help"
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(message.content === ".help") {
        let embed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle('ℹ️ Commands')
        .setDescription('Commands to get information💁\n💰')
        .addField('Current price:  `.price [currency]`', 'Example: **.price inr**, **.price eur**\n📈')
        .addField('About Market Cap:  `.market [currency]`', 'Example: **.market inr**, **.market eur**\n☑️')
        .addField('About Active Validators:  `.validators [testnet | mainnet]`', 'Example: **.validators t**, **.validators main**\n🧱')
        .addField('About Blocks:  `.blocks [testnet | mainnet]`', 'Example: **.blocks t**, **.blocks main**\n⚖️')
        .addField('Balance of Account(use Direct message):  `.balance [address]`', 'Example: **.balance your_bluzelle_address**\n🏦')
        .addField('Mint testnet Account:  `.mint`', 'Example: **.mint**\n💱')
        .addField('Accepted currencies for *price* and *market* commands', 'aed, ars, aud, bch, bdt, bhd, bmd, bnb, brl, btc, cad, chf, clp, cny, czk, dkk, dot, eos, eth, eur, gbp, hkd, huf, idr, ils, inr, jpy, krw, kwd, lkr, ltc, mmk, mxn, myr, ngn, nok, nzd, php, pkr, pln, rub, sar, sek, sgd, thb, try, twd, uah, usd, vef, vnd, xag, xau, xdr, xlm, xrp, yfi, zar, bits, link, sats')
        message.reply(embed);
    }
})


// command: ".price [currency]"
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const parts = message.content.split(" ")

    if(parts[0] === ".price") {
        let currency = parts[1]

        if (currency == null) {
            currency = 'usd';
        } else {
            currency = currency.toLowerCase()
        }

        let uCurrency = currency.toUpperCase();
        axios.get("https://api.coingecko.com/api/v3/coins/bluzelle?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
        .then((response) => {
            let change = parseFloat(getCurrencyOf(response.data.market_data.price_change_percentage_24h_in_currency, currency)).toFixed(2)
            let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Price')
            .addField(uCurrency, getCurrencyOf(response.data.market_data.current_price, currency) + ' ' + uCurrency, inline)
            .addField('Price Change(24h)', (change >= 0 ? '+' : '') + change + "%", inline)
            .addField('Day\'s Range', getCurrencyOf(response.data.market_data.low_24h, currency) + ' ' + uCurrency + ' - ' + getCurrencyOf(response.data.market_data.high_24h, currency) + ' ' + uCurrency, inline)
            message.reply(embed);

        })
    }
})


// command ".market [currency]"
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const parts = message.content.split(" ")

    if(parts[0] === ".market") {
        let currency = parts[1]

        if (currency == null) {
            currency = 'usd';
        } else {
            currency = currency.toLowerCase()
        }

        let uCurrency = currency.toUpperCase();

        axios.get("https://api.coingecko.com/api/v3/coins/bluzelle?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
        .then((response) => {
            let change = parseFloat(getCurrencyOf(response.data.market_data.market_cap_change_percentage_24h_in_currency, currency)).toFixed(2)
            let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Market')
            .addField('Market Cap', commaNumber(parseInt(getCurrencyOf(response.data.market_data.market_cap, currency))) + ' ' + uCurrency, inline)
            .addField('Market Cap Rank', response.data.market_cap_rank, inline)
            .addField('Market Cap Change(24h)', commaNumber(parseFloat(getCurrencyOf(response.data.market_data.market_cap_change_24h_in_currency, currency)).toFixed(0))  + ' ' + uCurrency + '  (' + (change >= 0 ? '+' : '') +  change + '%)', inline)
            .addField('Circulating Supply', commaNumber(parseFloat(response.data.market_data.circulating_supply).toFixed(0)) + ' BLZ / ' + commaNumber(parseFloat(response.data.market_data.total_supply).toFixed(0)) + ' BLZ', inline)
            .addField('Total Volume', commaNumber(parseInt(getCurrencyOf(response.data.market_data.total_volume, currency))) + ' ' + uCurrency, inline)
            message.reply(embed);

        })
    }
})

// command ".validators [testnet | mainnet]"
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const parts = message.content.split(" ")

    if(parts[0] === ".validators") {
        const net = parts[1]
         
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
                message.reply('**Validators of?**', {
                    buttons: [mvButton, tvButton],
                })
        }
    }
})

// command ".blocks [testnet | mainnet]"
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const parts = message.content.split(" ")

    if(parts[0] === ".blocks") {
        const net = parts[1]
         
        const mvButton = new MessageButton()
        .setStyle('green')
        .setLabel('mainnet')
        .setID('mainnet_blocks')
        
        const tvButton = new MessageButton()
        .setLabel('testnet')
        .setStyle('blurple')
        .setID('testnet_blocks')

        switch(net) {
            case "t":
            case "test":
            case "testnet":
                sendTestnetBlocks(message.channel)
                break
            case "m":
            case "main":
            case "mainnet":
                sendMainnetBlocks(message.channel)
                break
            default:
                message.reply('**Blocks info of?**', {
                    buttons: [mvButton, tvButton],
                })
        }
    }
})

// .balance {address}
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const parts = message.content.split(" ")
    if(parts[0] == ".balance") {
        const address = parts[1]
        if (address == null) return

        sdk.bank.q.Balance({
            address: address,
            denom: "ubnt"
        }).then((response) => {
            let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Balance')
            .setDescription(commaNumber(response.balance.amount) + " BLZ")
            message.author.send(embed)
        }).catch(error => {
            message.author.send("Address is not valid")
        })

    }
})

// command ".mint"
client.on("message",(message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    if(message.content === ".mint") {
        axios.get("https://client.sentry.testnet.private.bluzelle.com:1317/mint")
        .then((response) => {
            let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Mint')
            .addField('Address', response.data.result.address, inline)
            .addField('Mnemonic', response.data.result.mnemonic, inline)
            message.author.send(embed)
        })
    }
})

// action of mainnet and testnet buttons
client.on('clickButton', (button) => {
    if (button.id == 'mainnet_validators') {
        button.defer();
        sendMainnetValidators(button.channel)
    } else if (button.id == 'testnet_validators') {
        button.defer();
        sendTestnetValidators(button.channel)
    }else if (button.id == 'mainnet_blocks') {
        button.defer();
        sendMainnetBlocks(button.channel)
    } else if (button.id == 'testnet_blocks') {
        button.defer();
        sendTestnetBlocks(button.channel)
    }
})

// message embed of information on validators(mainnet)
function sendMainnetValidators(message) {
    axios.get("http://sandbox.sentry.net.bluzelle.com:26657/validators").then((response) => {
        let embed = new Discord.MessageEmbed()
        .setColor('#3BA55D')
        .setTitle("Active Validators of mainnet")
        .addField("Count", commaNumber(response.data.result.count), inline)
        .addField("Block Height", commaNumber(response.data.result.block_height), inline)
        .addField("Voting Power", commaNumber(getTotalVotingPower(response.data.result.validators)), inline)
        message.send(embed);
    })
}

// message embed of information on validators(testnet)
function sendTestnetValidators(message) {
    axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/validators").then((response) => {
        let embed = new Discord.MessageEmbed()
        .setColor('#5865F2')
        .setTitle("Active Validators of testnet")
        .addField("Count", commaNumber(response.data.result.count), inline)
        .addField("Block Height", commaNumber(response.data.result.block_height), inline)
        .addField("Voting Power", commaNumber(getTotalVotingPower(response.data.result.validators)), inline)
        message.send(embed);                
    })
}

// message embed of information on blocks(mainnet)
function sendMainnetBlocks(message) {
    axios.get("http://sandbox.sentry.net.bluzelle.com:26657/status")
    .then((response) => {
        let embed = new Discord.MessageEmbed()
        .setColor('#3BA55D')
        .setTitle('Blocks info of Mainnet')
        .addField('Latest Block Time', msToTime(Date.now() - new Date(response.data.result.sync_info.latest_block_time).getTime()), inline)
        .addField('Latest Block Height', commaNumber(response.data.result.sync_info.latest_block_height), inline)
        message.send(embed);
    })
}

// message embed of information on blocks(testnet)
function sendTestnetBlocks(message) {
    axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/status")
    .then((response) => {
        let embed = new Discord.MessageEmbed()
        .setColor('#5865F2')
        .setTitle('Blocks info of testnet')
        .addField('Latest Block Time', msToTime(Date.now() - new Date(response.data.result.sync_info.latest_block_time).getTime()), inline)
        .addField('Latest Block Height', commaNumber(response.data.result.sync_info.latest_block_height), inline)
        message.send(embed);
    })
}

// finding total votiong power of all validators 
function getTotalVotingPower(validators) {
    let vp = 0;
    for (let i = 0; i < validators.length; ++i) {
        vp += parseInt(validators[i].voting_power)
    }
    return vp
}

// returns object based on the currency
function getCurrencyOf(obj, currency) {
    switch(currency) {
        case "aed":
            return obj.aed
        case "ars":
            return obj.ars
        case "aud":
            return obj.aud
        case "bch":
            return obj.bch
        case "bdt":
            return obj.bdt
        case "bhd":
            return obj.bhd
        case "bmd":
            return obj.bmd
        case "bnb":
            return obj.bnb
        case "brl":
            return obj.brl
        case "btc":
            return obj.btc
        case "cad":
            return obj.cad
        case "chf":
            return obj.chf
        case "clp":
            return obj.clp
        case "cny":
            return obj.cny
        case "czk":
            return obj.czk
        case "dkk":
            return obj.dkk
        case "dot":
            return obj.dot
        case "eos":
            return obj.eos
        case "eth":
            return obj.eth
        case "eur":
            return obj.eur
        case "gbp":
            return obj.gbp
        case "hkd":
            return obj.hkd
        case "huf":
            return obj.huf
        case "idr":
            return obj.idr
        case "ils":
            return obj.ils
        case "inr":
            return obj.inr
        case "jpy":
            return obj.jpy
        case "krw":
            return obj.krw
        case "kwd":
            return obj.kwd
        case "lkr":
            return obj.lkr
        case "ltc":
            return obj.ltc
        case "mmk":
            return obj.mmk
        case "mxn":
            return obj.mxn
        case "myr":
            return obj.myr
        case "ngn":
            return obj.ngn
        case "nok":
            return obj.nok
        case "nzd":
            return obj.nzd
        case "php":
            return obj.php
        case "pkr":
            return obj.pkr
        case "pln":
            return obj.pln
        case "rub":
            return obj.rub
        case "sar":
            return obj.sar
        case "sek":
            return obj.sek
        case "sgd":
            return obj.sgd
        case "thb":
            return obj.thb
        case "try":
            return obj.try
        case "twd":
            return obj.twd
        case "uah":
            return obj.uah
        case "usd":
            return obj.usd
        case "vef":
            return obj.vef
        case "vnd":
            return obj.vnd
        case "xag":
            return obj.xag
        case "xau":
            return obj.xau
        case "xdr":
            return obj.xdr
        case "xlm":
            return obj.xlm
        case "xrp":
            return obj.xrp
        case "yfi":
            return obj.yfi
        case "zar":
            return obj.zar
        case "bits":
            return obj.bits
        case "link":
            return obj.link
        case "sats":
            return obj.sats
    }
    return obj.usd
}

// converts milliseconds to seconds
function msToTime(ms) {
    return (ms / 1000).toFixed(2) + " seconds ago";
}

client.login(process.env.BOT_TOKEN)

console.log("Bot started")