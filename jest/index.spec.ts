import {Message} from "discord.js"
import {messageHandler} from './index'
import axios from "axios"

describe("Message Handler", () => {
    const message = ({
        channel: {
            send: jest.fn()
        },
        author: {
            bot: false
        }
    } as unknown) as Message;
    
    it("should call help command", async () => {
        message.content = '.help';
        await messageHandler(message);
        expect(message.channel.send).toHaveBeenCalledWith("ℹ️ Commands")
    })

    it("should call price command", async () => {
        message.content = '.price';
        await messageHandler(message);
        let response = await axios.get("https://api.coingecko.com/api/v3/coins/bluzelle?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
        expect(message.channel.send).toHaveBeenCalledWith(response.data.market_data.current_price.usd)
    })

    it("should call market command", async () => {
        message.content = '.market';
        await messageHandler(message);
        let response = await axios.get("https://api.coingecko.com/api/v3/coins/bluzelle?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
        expect(message.channel.send).toHaveBeenCalledWith(response.data.market_data.market_cap.usd)
    })

    it("should call validators command", async () => {
        message.content = '.validators';
        await messageHandler(message);
        let response = await axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/validators")
        expect(message.channel.send).toHaveBeenCalledWith(response.data.result.count)
    })

    it("should call blocks command", async () => {
        message.content = '.blocks';
        await messageHandler(message);
        let response = await axios.get("https://client.sentry.testnet.private.bluzelle.com:26657/status")
        expect(message.channel.send).toHaveBeenCalledWith(response.data.result.sync_info.latest_block_height)
    })

})