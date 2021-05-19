const { isEmpty, lowerCase, uniqBy } = require("lodash");
const writeJson = require("write-json");

const dir = process.cwd() + "/src/data/";
const result = require(dir + "channels.json");
const items = [];

result.forEach(r => {
  if (isEmpty(r.category)) {
    r.category = "Uncategorized";
  }

  // update/set id
  if (isEmpty(r.tvg.id)) {
    r.tvg.id = lowerCase(r.name).replace(/ /g, ".");
  }

  // filter adults
  if (lowerCase(r.category) !== "xxx") {
    items.push(r);
  }
});

writeJson(
  dir + "data.json",
  uniqBy(items, el => {
    return el.name;
  }),
  () => {
    console.log("done");
  },
);
