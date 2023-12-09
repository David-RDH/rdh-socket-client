import { Options } from "./types";
import io, { Socket } from 'socket.io-client'; 

export default class RdhClientSocket {
    private options: Options;
    private ws_host: string;
    private status: boolean;
    private socket: Socket;

    constructor(options: Options) {
        this.ws_host = "https://rdh-websocket.onrender.com"
        this.options = options;
        this.status = false;
        this.init();
    }

    async init() {
        this.socket = io(this.ws_host, {
            query: this.options
        });
    }

    channel(channel_name: string): this {
        let finalChannelName = this.options.app_id+'_'+channel_name;
        this.socket.emit('subscribe', {
            channel: finalChannelName
        })
        return this;
    }

    on(event_name: string, callback: (...args: any[]) => void) {
        this.socket.on(event_name, callback);
    }

    emit(event_name: string, data: any[]) {
        // this.socket.on(event_name, callback);
        this.socket.emit(event_name, data)
    }
}