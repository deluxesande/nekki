class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  check_messages() {
    console.log("NEW");
    this.socketRef.onmessage = (e) => {
      // Sending message
      this.socketNewMessage(e.data);
    };
  }

  connect(chat_id) {
    const path = `ws://127.0.0.1:8000/ws/chat/${chat_id}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("Websocket open");
    };

    this.socketRef.onmessage = (e) => {
      // Sending message
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.info(e.message);
    };

    this.socketRef.onclose = () => {
      console.log("Websocket closed");
      // Reconnect the websocket
      this.connect();
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);

    if (Object.keys(this.callbacks).length === 0) {
      console.log("No callbacks");
      return;
    }
    try {
      if (parsedData.length > 0) {
        this.callbacks["fetch_messages"](parsedData);
      }
      if (parsedData.length === 1) {
        this.callbacks["new_message"](parsedData);
      }
    } catch {
      return;
    }
  }

  fetchMessages(userid, chat_id) {
    if (this.callbacks) {
      if (chat_id != 0) {
        this.sendMessage({
          command: "fetch_messages",
          sender: userid,
          chat_id: chat_id,
        });
      }
    }
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      sender: message.sender,
      receiver: message.receiver,
      content: message.content,
      chat_id: message.chat_id,
    });
  }

  addCallBacks(messagesCallback, newMessageCallback) {
    this.callbacks["fetch_messages"] = messagesCallback;
    this.callbacks["new_messages"] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;

    setTimeout(() => {
      if (socket.readyState === 1) {
        console.log("Connection secure");

        if (callback != null) {
          callback();
        }

        return;
      } else {
        console.log("Waiting for connection");
        // Repeat until connection is established
        recursion(callback);
      }
    }, 1);
  }
}

const websocketinstance = WebSocketService.getInstance();

export default websocketinstance;
