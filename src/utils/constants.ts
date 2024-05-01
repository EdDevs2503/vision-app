import { Camera } from "react-native-vision-camera";

export const devices = Camera.getAvailableCameraDevices();
export const expectedResolutions = [
  {
    name: "720p",
    value: [1280, 720],
  },
  {
    name: "1080p",
    value: [1920, 1080],
  },
  {
    name: "4k",
    value: [3840, 2160],
  },
];
