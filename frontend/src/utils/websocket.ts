import type { Store } from "../stores/store";

const url = "ws://192.168.4.1:1337/";

export const websocket = new WebSocket(url);

// let websocketStates = {
//     0: 'CONNECTING',
//     1: 'OPEN',
//     2: 'CLOSING',
//     3: 'CLOSED',
// }


type Message = Partial<Store> & {
    type: string
    value?: number
}

// Sends a message to the server (and prints it to the console)
export function send(messageObj: Message) {
    try {
        if(websocket.readyState <= 1) {
            console.log('Sending message:', messageObj)
            websocket.send(JSON.stringify(messageObj));
        }
    }
    catch(e) {
        console.log('Error sending message')
        // console.log(e)
    }
}
