import { atom } from "recoil";

export interface ICameraStatus {
  device: "front" | "back";
  mode: "video" | "photo" | "video-audio";
}
export const key = "camera-status";

const defaultData: ICameraStatus = {
  device: "back",
  mode: "photo",
};

const cameraStatus = atom<ICameraStatus>({
  key,
  default: defaultData,
});

export default cameraStatus;
