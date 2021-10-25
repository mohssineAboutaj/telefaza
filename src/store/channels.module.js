import { isEmpty, lowerCase, findIndex } from "lodash";
import {
  customsListLocalStorageKey,
  favListLocalStorageKey,
  getLocal,
  setLocal,
} from "src/config";
import data from "../data/data.json";
const { toggleArrayValue } = require("@mohssineaboutaj/utils");

export default {
  state: {
    data: [...data, ...getLocal(customsListLocalStorageKey)],
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
      setLocal(favListLocalStorageKey, favList);
    },
    setFav(state) {
      const localStorageDataFavList = getLocal(favListLocalStorageKey);
      if (!isEmpty(localStorageDataFavList)) {
        state.favList = localStorageDataFavList;
      }
    },
    deleteAllFav(state) {
      const { favList } = state;
      state.favList = [];
      setLocal(favListLocalStorageKey, favList);
    },
  },
};
