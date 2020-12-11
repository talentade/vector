import $ from 'jquery';
import app from './app';

const socketPlug = () => {
  window.WebSocketPlug = window.WebSocketPlugged ? window.WebSocketPlug : new WebSocket(app.hostURL("socket", 1));

  window.WebSocketPlug.addEventListener('open', () => {

    window.WebSocketPlugged = true;
    $(window).trigger("renewSocket");

  });
  
  window.WebSocketPlug.onclose = (e) => {
    window.WebSocketPlugged = false;
    setTimeout(() => {
      socketPlug();
    }, 1000);
  };

};

export default socketPlug;