import { isEmpty, lowerCase, startCase, findIndex } from "lodash";
import { v4 as uuid } from "uuid";

export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      // lodash
      isEmpty,
      lowerCase,
      titleCase: c => startCase(c),
      findIndex,
      uuid,
      // custom
      isUrl: value => {
        return (
          !isEmpty(value) && value.startsWith("http") && value.endsWith(".m3u8")
        );
      },
    },
  });
};
