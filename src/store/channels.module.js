import { items } from "../data/data.json";

export default {
  state: { data: items },
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
  },
};
