const domparser = new DOMParser();
const webSocket = new WebSocket("wss://changetheweb.xyz");
webSocket.onmessage = (event) => {
  const data = JSON.parse(event);
  if (data.name === "index.html") {
    const newDom = domparser.parseFromString(data.serialized);
    // TODO diff DOM
    location.reload();
    return;
  }
  if (data.name === "client.js") {
    location.reload();
  }
  console.log(data);
};
