# RDH Socket Client

## Installation

To install the RDH Socket Client package, run the following command in your command line:

```bash
npm i rdh-socket-client
```
## USAGE

```js
import rdhClientSocket from 'rdh-socket-client';

// Initialize the client with your app ID and app key
const client = new rdhClientSocket({
    app_id: 'APP_ID',
    app_key: 'APP_key'
});

// Subscribe to a channel and listen for an event
client.channel('channelName').on('eventName', (data) => {
    console.log(data.message);
});

// Emit a custom event with data
client.emit('myEvent', mydata);
```
eplace `APP_ID` and `APP_key` with your actual application ID and key. Make sure to customize the channel name, event name, and data according to your application's requirements.

Feel free to explore more features and options provided by the RDH Socket Client package documentation for a comprehensive understanding of its capabilities.