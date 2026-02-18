import Channel from "./Channel";
import { Options } from "./types";
import io, { Socket } from 'socket.io-client'; 

export default class RdhClientSocket {
    private options: Options;
    private ws_host: string;
    private socket!: Socket;

    constructor(options: Options) {

        if (!options.app_ws) {
            this.ws_host = "https://rdh-websocket.onrender.com"
        } else {
            this.ws_host = options.app_ws
        }

        this.options = options;
        this.init();
    }

    async init() {
        this.socket = io(this.ws_host, {
            query: this.options
        });
    }

    channel(channel_name: string): Channel {
        let finalChannelName = this.options.app_id+'_'+channel_name;
        return new Channel(finalChannelName, this.socket);
    }
}