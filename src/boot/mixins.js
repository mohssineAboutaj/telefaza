export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      hi: () => {
        console.log("hi");
      },
    },
  });
};
