// modules
const { rmSync } = require("fs");
const { isEmpty, lowerCase, uniqBy } = require("lodash");
const writeJson = require("write-json");
const Downloader = require("nodejs-file-downloader");

// variables
const dir = __dirname + "/";
const url = "https://iptv-org.github.io/iptv/channels.json";
const jsonFilePath = dir + "channels.json";
const dangerCategoriesList = ["xxx"];

// remove old
rmSync(jsonFilePath);

// download and parse new file
new Downloader({ url, directory: dir })
  .download()
  .then(() => {
    const result = require(jsonFilePath);
    const items = [];

    result.forEach((r) => {
      // filter adults
      if (!dangerCategoriesList.includes(lowerCase(r.category))) {
        // set default category for non-categorized
        if (isEmpty(r.category)) {
          r.category = "Uncategorized";
        }

        // update/set props
        r.id = lowerCase(r.tvg.id).replace(/ /g, ".");

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
      uniqBy(items, (el) => {
        return el.name;
      }),
      () => {
        console.log("done");
      },
    );
  })
  .catch((err) => {
    console.log(err);
  });
