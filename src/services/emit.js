import $ from 'jquery';
import app from './app';

const socketPlug = () => {
  window.WebSocketPlug = window.WebSocketPlugged ? window.WebSocketPlug : new WebSocket(app.hostURL("socket", 1));

  window.WebSocketPlug.addEventListener('open', () => {
    
    window.WebSocketPlugged = true;
    $(window).trigger("renewSocket");
    
    // setInterval(() => {
    //   console.log(window.messageRefresher, window.messageRefresher == "off" && window.messagePayload);
    //   if(window.messageRefresher == "off" && window.messagePayload) {
    //     window.WebSocketPlug.send(JSON.stringify({
    //       "event":   "GET_MESSAGES2",
    //       "payload": window.messagePayload
    //     }));
    //   }
    // }, 1000);

  });
  
  window.WebSocketPlug.onclose = (e) => {
    window.WebSocketPlugged = false;
    setTimeout(() => {
      socketPlug();
    }, 1000);
  };

};

export default socketPlug;