import { isEmpty, lowerCase, findIndex } from "lodash";
import data from "../data/data.json";
const { toggleArrayValue } = require("@mohssineaboutaj/utils");
const favListLocalStorageKey = "fav";

export default {
  state: {
    data: [
      ...data,
      ...JSON.parse(window.localStorage.getItem("customs") || []),
    ],
    favList: [],
  },
  getters: {
    getAllChannels({ data }) {
      return data;
    },
    getChannelById: ({ data }) => id => {
      return data.find(c => c.id === id);
    },
    getChannelByName: ({ data }) => name => {
      return data.find(c => c.name === name);
    },
    getCategories({ data }) {
      const list = ["All"];

      data.forEach(d => {
        const cat = d.category;
        if (!list.includes(cat)) {
          list.push(cat);
        }
      });

      // result
      return list.sort();
    },
    getChannelsByCategory: ({ data }) => cat => {
      return data.filter(d => lowerCase(d.category) === lowerCase(cat));
    },
    // favourite fn
    getFavList({ favList, data }) {
      return data.filter(c => {
        if (favList.includes(c.name)) {
          return c;
        }
      });
    },
    checkFav: ({ favList }) => toCheck => {
      return favList.includes(toCheck);
    },
  },
  mutations: {
    // customs
    addCustomToList(state, payload) {
      state.data.push(payload);
    },
    updateCustomInList(state, item) {
      const index = findIndex(state.data, {
        uuid: item.uuid,
      });
      Object.assign(state.data[index], item);
    },
    deleteCustomInList(state, item) {
      const index = findIndex(state.data, {
        uuid: item.uuid,
      });
      state.data.splice(index, 1);
    },
    // favourites
    toggleFav(state, payload) {
      const { favList } = state;
      state.favList = toggleArrayValue(favList, payload);
      window.localStorage.setItem(
        favListLocalStorageKey,
        JSON.stringify(favList),
      );
    },
    setFav(state) {
      const localStorageDataFavList = JSON.parse(
        window.localStorage.getItem(favListLocalStorageKey),
      );
      if (!isEmpty(localStorageDataFavList)) {
        state.favList = localStorageDataFavList;
      }
    },
    deleteAllFav(state) {
      const { favList } = state;
      state.favList = [];
      window.localStorage.setItem(
        favListLocalStorageKey,
        JSON.stringify(favList),
      );
    },
  },
};
