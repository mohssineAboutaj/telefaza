// modules
const { rmSync } = require("fs");
const { isEmpty, lowerCase, uniqBy } = require("lodash");
const writeJson = require("write-json");
const Downloader = require("nodejs-file-downloader");

// variables
const dir = __dirname + "/";
const url = "https://iptv-org.github.io/iptv/channels.json";
const dangerCategoriesList = ["xxx"];

// remove old
// rmSync(jsonFilePath);

// download and parse new file
new Downloader({ url, directory: dir })
  .download()
  .then(() => {
    const jsonFilePath = dir + "channels.json";
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

    // filter channels to make it uniq
    const uniqData = uniqBy(items, (el) => {
      return el.name;
    });

    writeJson(dir + "data.json", uniqData, () => {
      // show message
      console.log("Saved Channels Count:", uniqData.length);

      // remove old
      rmSync(jsonFilePath);
    });
  })
  .catch((err) => {
    console.log(err);
  });
