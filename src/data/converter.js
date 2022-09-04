// modules
const { lowerCase, uniqBy, kebabCase } = require("lodash");
const writeJson = require("write-json");
const { get } = require("axios");

// variables
const dir = __dirname + "/";
const url = "https://iptv-org.github.io/iptv/channels.json";
const dangerCategoriesList = ["xxx"];

get(url)
  .then(({ data }) => {
    const items = [];

    data.forEach((r) => {
      // convert categories array ot objects to array of string
      r.categories = Array.from(r.categories, (cat) => {
        return cat.name;
      });

      // set default category for non-categorized
      if (r.categories.length > 0) {
        r.category = r.categories[0];
      } else {
        r.category = "Uncategorized";
      }

      // filter adults
      if (!dangerCategoriesList.includes(lowerCase(r.category))) {
        // update/set props
        r.id = kebabCase(lowerCase(r.name));

        // remove non-used props
        delete r.logo;
        delete r.languages;
        delete r.countries;
        delete r.categories;
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
    });
  })
  .catch((err) => {
    console.log(err);
  });
