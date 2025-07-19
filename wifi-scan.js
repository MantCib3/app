const wifi = require('node-wifi');
const WebSocket = require('ws');

// Initialize node-wifi
wifi.init({ iface: null });

// Start WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Web app connected via WebSocket');

  // Scan Wi-Fi networks every 10 seconds
  setInterval(() => {
    wifi.scan((error, networks) => {
      if (error) {
        console.error('Wi-Fi scan error:', error);
        return;
      }
      const ssids = networks.map(network => ({
        ssid: network.ssid,
        mac: network.mac,
        signal: network.signal_level,
      }));
      ws.send(JSON.stringify(ssids));
    });
  }, 10000); // Scan every 10 seconds
});

console.log('Wi-Fi scanning script running on ws://localhost:8080');