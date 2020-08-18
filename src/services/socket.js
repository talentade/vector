// const socket = io(app.hostURL(), {
//   transports: ["websocket", "polling"]
// });

// const socket = new WebSocket(app.hostURL());

// socket.addEventListener('open', function (event) {
//   console.log("Connected to WS Server");
// });

// socket.addEventListener('message', function (event) {
//   console.log("Message from server ", event.data);
// });

// socket.emit("Hello from Client");


// Create WebSocket connection.
const socket = new WebSocket(app.hostURL("socket", 1));

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("Connected to WS Server");
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', ({data}) => {
  try {
    let pair_data = JSON.parse(`${data}`);
    console.log(pair_data);
  } catch (e) {
    throw e;
  }
});




            // let { hotStocks }  = this.state;
            // let new_stock = [];
            // let payload = message.payload;
            // payload.forEach(load => {
            //   let repair = load.pair;
            //   let buy   = load.meta.regularMarketPrice;
            //   let pid   = "#pair-buy-"+repair.replace(/[^\w]/g, "_");
            //   let exbuy = $(pid).text();
            //   let stock = hotStocks.filter(({pair}) =>
            //     pair.toLowerCase().match(repair.toLowerCase()),
            //   );
            //   stock[0].data.ask = buy || stock[0].data.ask;
            //   new_stock[stock[0]["_id"]] = stock[0];
            //   // console.log(repair, stock, exbuy, "-->", buy);
            //   // $("#pair-buy-"+repair.replace(/[^\w]/g, "_")).text(buy); //pair.replace("/", "");
            // });
            // this.setState({ hotStocks: new_stock });