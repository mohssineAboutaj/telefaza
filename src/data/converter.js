const { readFileSync } = require("fs");
const iptvPlaylistParser = require("iptv-playlist-parser");
const writeJson = require("write-json");

const dir = process.cwd() + "/src/data/";

const playlist = readFileSync(dir + "playlist.m3u", {
  encoding: "utf-8",
});

const result = iptvPlaylistParser.parse(playlist);

const items = [];

result.items.forEach(r => {
  r.group.title = r.group.title === "" ? "Ungrouped" : r.group.title;
  items.push(r);
});

writeJson(dir + "data.json", { ...result, items }, () => {
  console.log("done");
});
