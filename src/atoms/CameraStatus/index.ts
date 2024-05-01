import { atom } from "recoil";

export interface ICameraStatus {
  device: "front" | "back";
  mode: "video" | "photo" | "video-audio";
  isRecording: boolean;
}
export const key = "camera-status";

const defaultData: ICameraStatus = {
  isRecording: false,
  device: "back",
  mode: "photo",
};

const cameraStatus = atom<ICameraStatus>({
  key,
  default: defaultData,
});

export default cameraStatus;
