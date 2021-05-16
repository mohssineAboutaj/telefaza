import { isEmpty, lowerCase, startCase } from "lodash";

export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      // lodash
      isEmpty: c => isEmpty(c),
      lowerCase: c => lowerCase(c),
      startCase: c => startCase(c),
      titleCase: c => startCase(c),
      // custom
      hi: () => {
        console.log("hi");
      },
    },
  });
};
