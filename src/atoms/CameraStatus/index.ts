import { atom } from "recoil";

export interface ICameraStatus {
  device: "front" | "back";
  mode: "video" | "photo" | "video-audio";
  isRecording: boolean;
  hasFlash: boolean;
  hasTorch: boolean;
  torch: boolean;
  flash: boolean;
}
export const key = "camera-status";

const defaultData: ICameraStatus = {
  hasFlash: false,
  hasTorch: false,
  torch: false,
  flash: false,
  isRecording: false,
  device: "back",
  mode: "photo",
};

const cameraStatus = atom<ICameraStatus>({
  key,
  default: defaultData,
});

export default cameraStatus;
