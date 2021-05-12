const { readFileSync } = require("fs");
const iptvPlaylistParser = require("iptv-playlist-parser");
const writeJson = require("write-json");

const dir = process.cwd() + "/src/data/";

const playlist = readFileSync(dir + "playlist.m3u", {
  encoding: "utf-8",
});
const result = iptvPlaylistParser.parse(playlist);

writeJson(dir + "data.json", result, () => {
  console.log("done");
});
