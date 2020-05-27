// const serializer = require("@zharktas/vdom-serialize");
// const patch = require("virtual-dom/patch");

const webSocket = new WebSocket("wss://changetheweb.xyz");
webSocket.onmessage = (event) => {
  const data = JSON.parse(event);
  console.log(data);
  // const deserializedPatch = serializer.deserializePatches(data.htmlPatch);
  // console.log(deserializedPatch);
};
