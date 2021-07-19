import {Message} from "discord.js"
import axios from "axios"

export const messageHandler = async (message: Message) => {
    if (message.author.bot) return;

    if (message.content === '.help') {
        message.channel.send("ℹ️ Commands")
    } else if (message.content === '.price') {
        let response = await axios.get("https://api.coingecko.com/api/v3/coins/bluzelle?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
        message.channel.send(response.data.market_data.current_price.usd)
    } else if (message.content === '.market') {
        let response = await axios.get("https://api.coingecko.com/api/v3/coins/bluzelle?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
        message.channel.send(response.data.market_data.market_cap.usd)
    } else if (message.content === '.validators') {
        let response = await axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/validators")
        message.channel.send(response.data.result.count)
    } else if (message.content === '.blocks') {
        let response = await axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/status")
        message.channel.send(response.data.result.sync_info.latest_block_height)

    }
}