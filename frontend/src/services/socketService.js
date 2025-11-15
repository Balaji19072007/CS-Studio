// frontend/src/services/socketService.js
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventCallbacks = new Map();
  }

  connect(token) {
    if (this.socket) return;

    // Use import.meta.env for Vite instead of process.env
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    this.socket = io(API_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('🔌 Connected to server');
      this.isConnected = true;
      
      // Join user's notification room
      const user = JSON.parse(localStorage.getItem('userData') || '{}');
      if (user && user.id) {
        this.socket.emit('join-notifications', user.id);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('new-notification', (notification) => {
      console.log('📢 New notification received:', notification);
      this.triggerCallbacks('new-notification', notification);
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  on(event, callback) {
    if (!this.eventCallbacks.has(event)) {
      this.eventCallbacks.set(event, []);
    }
    this.eventCallbacks.get(event).push(callback);

    // Also register with socket if connected
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    const callbacks = this.eventCallbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }

    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  triggerCallbacks(event, data) {
    const callbacks = this.eventCallbacks.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} callback:`, error);
      }
    });
  }

  // Specific notification methods
  onNotification(callback) {
    this.on('new-notification', callback);
  }

  offNotification(callback) {
    this.off('new-notification', callback);
  }
}

export default new SocketService();