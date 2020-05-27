const serializer = require("@zharktas/vdom-serialize");
const patch = require("virtual-dom/patch");
const { url } = require("./common");
console.log(fileName);
const webSocket = new WebSocket(url);
webSocket.onmessage = (event) => {
  console.log(event);
  const data = JSON.parse(event);
  const deserializedPatch = serializer.deserializePatches(data.htmlPatch);
  console.log(deserializedPatch);
};
