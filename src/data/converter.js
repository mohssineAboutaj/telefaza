// modules
const { lowerCase, uniqBy, kebabCase } = require("lodash");
const writeJson = require("write-json");
const { get } = require("axios");

// variables
const dir = __dirname + "/";
const url = "https://iptv-org.github.io/api/channels.json";
const streamsUrl = "https://iptv-org.github.io/api/streams.json";
const dangerCategoriesList = ["xxx"];

get(url)
  .then(({ data }) => {
    const items = [];

    // get streams
    get(streamsUrl).then(({ data: streams }) => {
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
          // r.id = kebabCase(lowerCase(r.name));

          // remove non-used props
          delete r.logo;
          delete r.languages;
          delete r.countries;
          delete r.categories;
          delete r.tvg;

          // match streams with channels
          r.url = streams.find((s) => s.channel == r.id)?.url || "";

          // push it
          items.push(r);
        }
      });

      // filter channels to make it uniq
      const uniqData = uniqBy(items, (el) => {
        return el.name;
      }).filter((el) => {
        // only non-emty channels url
        return el.url != "";
      });

      writeJson(dir + "data.json", uniqData, () => {
        // show message
        console.log("Saved Channels Count:", uniqData.length);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
