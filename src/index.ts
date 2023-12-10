import axios from "axios";
import Channel from "./Channel";
import { Options } from "./types";
import io, { Socket } from 'socket.io-client'; 

export default class RdhClientSocket {
    private options: Options;
    private ws_host: string;
    private socket: Socket;
    private api_url: string;

    constructor(options: Options) {
        this.api_url = "https://rdh-socket.wuaze.com/api/subscribe"

        if (!options.app_ws) {
            this.ws_host = "https://rdh-websocket.onrender.com"
        } else {
            this.ws_host = options.app_ws
        }

        this.options = options;
        this.init();
    }

    async init() {
        const status = await this.verifyToken()
        this.options.status = status;
        this.socket = io(this.ws_host, {
            query: this.options
        });

        if (!status) {
            console.error("Invalid TOKEN");
        }
    }

    async verifyToken() {
        const fullURL = this.api_url+`?app_id=${this.options.app_id}&app_key=${this.options.app_key}`

        return await axios.get(fullURL).then(response => {
            return response.data.status;
        }).catch(() => {
            return false;
        })
    }

    channel(channel_name: string): Channel {
        let finalChannelName = this.options.app_id+'_'+channel_name;
        return new Channel(finalChannelName, this.socket);
    }
}