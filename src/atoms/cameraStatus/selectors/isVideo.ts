import { selector } from "recoil";

import cameraStatus, { key } from "../index";

const isFront = selector({
  key: key + "is-video",
  get: ({ get }) => {
    const status = get(cameraStatus);
    return status.mode === "video" || status.mode === "video-audio";
  },
});

export default isFront;
