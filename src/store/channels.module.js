import { items } from "../data/data.json";

export default {
  state: {
    data: items,
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
      const list = [];

      data.forEach(d => {
        const cat = d.group.title;
        if (!list.includes(cat)) {
          list.push(cat);
        }
      });

      return list;
    },
    getChannelsByCategory: ({ data }) => cat => {
      return data.filter(d => d.group.title === cat);
    },
  },
};
