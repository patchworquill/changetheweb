const Path = require("path");
const fs = require("fs");
const util = require("util");
const crypto = require("crypto");

// Virtual DOM
const HTMLToHScriptParser = require("html2hscript");
const h = require("virtual-dom/h");
const vDOMDiff = require("virtual-dom/diff");
const vDOMPatchSerializer = require("@zharktas/vdom-serialize");

// Bundler, WebSocket
const Bundler = require("parcel-bundler");
const WebSocket = require("ws");

/**
 *
 * @param {*} data any data
 * @returns Digest in the form of a hexidecimal string
 */
const sha256Digest = (data) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest().toString("hex");
};

/**
 *
 * @param {string} fileName
 * @returns last fileExtension (string)
 */
const fileExtension = (fileName) => fileName.split(".").pop();

const HTMLToHScriptParserAsync = util.promisify(HTMLToHScriptParser);
const HTMLToVDOM = async (HTMLString) => {
  const HScriptString = await HTMLToHScriptParserAsync(HTMLString);
  return new Function(
    "h",
    "return " + HScriptString.replace(/"\\n",/, "").slice(0, -6)
  )(h);
};

const entryFilePath = Path.join(__dirname, "./index.html");
const fileMapFileName = "file-map.json";
const fileMapFilePath = Path.join(__dirname, `./${fileMapFileName}`);
const srcPath = Path.join(__dirname, "../src");
const distPath = Path.join(__dirname, "../dist");
const prevPath = Path.join(__dirname, "../prev");

// Bundler options
const bundlerOptions = {
  outDir: distPath, // The out directory to put the build files in, defaults to dist
  watch: false, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: false, // Enabled or disables caching, defaults to true
  // cacheDir: ".cache", // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
  // global: "moduleName", // Expose modules as UMD under this name, disabled by default
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  // scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  target: "browser", // Browser/node/electron, defaults to browser
  logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
  hmr: false, // Enable or disable HMR while watching
  sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: false, // Enable or disable auto install of missing dependencies found during bundling
};
const bundler = new Bundler(entryFilePath, bundlerOptions);

const webSocket = new WebSocket("ws://changetheweb.xyz", {
  perMessageDeflate: false,
});
webSocket.on("message", (data) => {
  console.log("data received from server: ", data);
});
webSocket.on("open", heartbeat);
webSocket.on("ping", heartbeat);
webSocket.on("close", () => {
  console.log("websocket closed");
  clearTimeout(this.pingTimeout);
});
function heartbeat() {
  clearTimeout(this.pingTimeout);
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 20000 + 1000);
}

webSocket.on("open", () => {
  fs.watch(srcPath, async (event, name) => {
    try {
      if (name === fileMapFileName) {
        return;
      }
      const fileMapSerialized = fs.readFileSync(fileMapFilePath, {
        encoding: "utf8",
      });
      const fileMap = JSON.parse(fileMapSerialized);
      const extension = fileExtension(name);
      const serialized = fs.readFileSync(Path.join(srcPath, name), {
        encoding: "utf8",
      });
      const digest = sha256Digest(serialized);

      // If file has already been initialized and there is no difference in digests, ignore it.
      if (fileMap[name] && fileMap[name].digest === digest) {
        return;
      }

      // If new file, initialize first
      if (fileMap[name] === undefined) {
        fileMap[name] = {
          extension,
          digest,
          history: [digest],
          timestamp: Date.now().toString(),
          counter: 0,
          patch: undefined,
        };
      } else {
        // Update
        fileMap[name].timestamp = Date.now().toString();
        fileMap[name].counter++;
        fileMap[name].digest = digest;
        fileMap[name].history.push(digest);
      }
      switch (extension) {
        case "html":
          const vDOM = await HTMLToVDOM(serialized);
          if (fs.existsSync(Path.join(prevPath, name))) {
            const prevSerialized = fs.readFileSync(Path.join(prevPath, name), {
              encoding: "utf8",
            });
            const prevVDOM = await HTMLToVDOM(prevSerialized);
            const vDOMPatch = vDOMDiff(prevVDOM, vDOM);
            const serializedvDOMPatch = vDOMPatchSerializer.serializePatches(
              vDOMPatch
            );
            // dont include the full vDOM data in the patch
            serializedvDOMPatch.a = undefined;
            fileMap[name].patch = serializedvDOMPatch;
          }
          fs.writeFileSync(Path.join(prevPath, name), serialized, {
            flag: "w",
          });

          break;
        case "js":
          break;
        case "css":
          break;
        default:
          break;
      }
      fs.writeFileSync(fileMapFilePath, JSON.stringify(fileMap, null, 2));
      await bundler.bundle();
      webSocket.send(
        JSON.stringify({
          fileMap: fileMap,
          fileName: name,
          fileSerialied: serialized,
          apiKey: process.env.API_KEY, // DO NOT LEAK API KEY
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  });
});
