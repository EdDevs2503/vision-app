import { atom } from "recoil";

export interface ICameraConfiguration {
  hdrMaxFps: number;
  activeHdr: boolean;
  resolution: {
    width: number;
    height: number;
  };
  FPS: number;
  maxFPS: number;
  minFPS: number;
  disablePreview: boolean;
  formatName: string;
}
export const key = "camera-configuration";

const defaultData: ICameraConfiguration = {
  activeHdr: false,
  formatName: "720p",
  hdrMaxFps: 0,
  resolution: {
    width: 1280,
    height: 720,
  },
  FPS: 30,
  maxFPS: 30,
  minFPS: 1,
  disablePreview: false,
};

const cameraConfiguration = atom<ICameraConfiguration>({
  key,
  default: defaultData,
});

export default cameraConfiguration;
