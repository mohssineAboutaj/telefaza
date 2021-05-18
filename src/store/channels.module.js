import { items } from "../data/data.json";
const { toggleArrayValue } = require("@mohssineaboutaj/utils");

export default {
  state: {
    data: items,
    favList: [],
  },
  getters: {
    getAllChannels({ data }) {
      return data;
    },
    getChannelById: ({ data }) => id => {
      return data.find(c => c.tvg.id === id);
    },
    getChannelByName: ({ data }) => name => {
      return data.find(c => c.name === name);
    },
    getCategories({ data }) {
      const list = ["All"];

      data.forEach(d => {
        const cat = d.group.title;
        if (!list.includes(cat)) {
          list.push(cat);
        }
      });

      // result
      return list.sort();
    },
    getChannelsByCategory: ({ data }) => cat => {
      return data.filter(d => d.group.title === cat);
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
    toggleFav({ favList }, payload) {
      favList = toggleArrayValue(favList, payload);
    },
  },
  actions: {
    toggleFavChannels({ state, getters, commit }, payload) {
      commit("toggleFav", payload);
      return getters.getFavList;
    },
  },
};
