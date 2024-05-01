import { selector } from "recoil";

import cameraStatus, { key } from "../index";

const isFront = selector({
  key: key + "is-front",
  get: ({ get }) => {
    const status = get(cameraStatus);
    return status.device === "front";
  },
});

export default isFront;
