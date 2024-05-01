import { selector } from "recoil";

import cameraConfiguration, { key } from "../index";

const isDisabledPreview = selector({
  key: key + "is-disabled-preview",
  get: ({ get }) => {
    const status = get(cameraConfiguration);
    return status.disablePreview;
  },
});

export default isDisabledPreview;
