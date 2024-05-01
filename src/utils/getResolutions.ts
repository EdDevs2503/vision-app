import {
  Camera,
  CameraDeviceFormat,
  getCameraDevice,
} from "react-native-vision-camera";

import { filterFormats } from "./filterFormats";
import { TFormat } from "../types/format";

type TGetResolutions = {
  isVideo: boolean;
  isFront: boolean;
};

const expectedResolutions = [
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

export const getResolutions = ({ isVideo, isFront }: TGetResolutions) => {
  const devices = Camera.getAvailableCameraDevices();

  const backDevice = getCameraDevice(devices, "back");
  const frontDevice = getCameraDevice(devices, "front");

  let deviceRawFormats: CameraDeviceFormat[] = [];
  if (isFront && frontDevice) {
    deviceRawFormats = frontDevice.formats;
  }
  if (!isFront && backDevice) {
    deviceRawFormats = backDevice.formats;
  }

  const resolutions: TFormat[] = [];
  deviceRawFormats.forEach((format) => {
    const width = isVideo ? format.videoWidth : format.photoWidth;
    const height = isVideo ? format.videoHeight : format.photoHeight;

    const expectedResolution = expectedResolutions.find(
      (resolution) =>
        resolution.value[0] === width && resolution.value[1] === height,
    );

    if (expectedResolution) {
      resolutions.push({
        name: expectedResolution.name,
        height,
        width,
        maxFps: format.maxFps,
        minFps: format.minFps,
        hdr: isVideo ? format.supportsVideoHdr : format.supportsPhotoHdr,
      });
    }
  });

  return filterFormats(resolutions);
};
