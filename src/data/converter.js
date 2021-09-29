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
  r.id = lowerCase(r.tvg.id).replace(/ /g, ".");

  // filter adults
  if (lowerCase(r.category) !== "xxx") {
    // remove non-used props
    delete r.logo;
    delete r.languages;
    delete r.countries;
    delete r.tvg;

    // push it
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
