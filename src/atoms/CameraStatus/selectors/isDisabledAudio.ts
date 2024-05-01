import { selector } from "recoil";

import cameraStatus, { key } from "../index";

const isDisabledAudio = selector({
  key: key + "is-disabled-audio",
  get: ({ get }) => {
    const status = get(cameraStatus);
    return status.mode === "video";
  },
});

export default isDisabledAudio;
