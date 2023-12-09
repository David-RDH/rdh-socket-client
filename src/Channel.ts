import { Socket } from 'socket.io-client'; 

export default class Channel {
    private channel: string;
    private socket: Socket;

    constructor(channel: string, socket: Socket) {
        this.channel = channel;
        this.socket = socket;
        this.init();
    }

    init() {
        this.socket.emit('subscribe', {
            channel: this.channel
        })
    }

    on(event_name: string, callback: (...args: any[]) => void) {
        const real_event = this.channel+"."+event_name;
        this.socket.on(real_event, callback);
    }

    emit(event_name: string, data: any[]) {
        // this.socket.on(event_name, callback);
        this.socket.emit(event_name, { data: data, _channel_name: this.channel})
    }
}