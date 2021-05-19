const { isEmpty, lowerCase } = require("lodash");
const writeJson = require("write-json");

const dir = process.cwd() + "/src/data/";
const result = require(dir + "channels.json");
const items = [];

result.forEach(r => {
  if (isEmpty(r.category)) {
    r.category = "Uncategorized";
  }

  // filter adults
  if (lowerCase(r.category) !== "xxx") {
    items.push(r);
  }
});

writeJson(dir + "data.json", items, () => {
  console.log("done");
});
