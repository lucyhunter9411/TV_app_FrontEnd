type MessageHandler = (message: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();

  connect() {
    this.ws = new WebSocket('wss://app-sparc-dev-wus-001.azurewebsites.net/ws');

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);
      this.messageHandlers.forEach(handler => handler(data));
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  sendMessage(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  addMessageHandler(handler: unknown) {
    if (typeof handler === "function") {
      this.messageHandlers.add(handler as MessageHandler);
    } else {
      throw new Error("Invalid handler: must be a function");
    }
  }
  
  updateMessageHandler(id: string, newHandler: MessageHandler) {
    if (this.messageHandlers.has(id)) {
      this.messageHandlers.set(id, newHandler);
    } else {
      throw new Error(`Handler with id "${id}" does not exist.`);
    }
  }

  removeMessageHandler(handler: MessageHandler) {
    this.messageHandlers.delete(handler);
  }
}

export const websocketService = new WebSocketService(); 
