import { useCallback } from "react";
import { getCameraDevice } from "react-native-vision-camera";
import { useSetRecoilState } from "recoil";

import cameraConfigurationAtom from "../atoms/CameraConfiguration";
import cameraStatusAtom from "../atoms/CameraStatus";
import { devices } from "../utils/constants";
import { getResolutions } from "../utils/getResolutions";

const useSetDefault = () => {
  const setConfiguration = useSetRecoilState(cameraConfigurationAtom);
  const setStatus = useSetRecoilState(cameraStatusAtom);

  return useCallback(() => {
    const resolution = getResolutions({
      isVideo: false,
      isFront: false,
    }).sort((a, b) => b.maxFps - a.maxFps)[1];

    const devicePosition = "back";
    const device = getCameraDevice(devices, devicePosition);
    setConfiguration({
      activeHdr: false,
      formatName: resolution.name,
      hdrMaxFps: resolution.supportHdr.maxFps,
      resolution: {
        width: resolution.width,
        height: resolution.height,
      },
      FPS: resolution.maxFps >= 60 ? 60 : resolution.maxFps,
      maxFPS: resolution.maxFps,
      minFPS: resolution.minFps,
      disablePreview: false,
    });
    setStatus({
      hasFlash: device?.hasFlash || false,
      hasTorch: device?.hasTorch || false,
      torch: false,
      flash: false,
      isRecording: false,
      device: "back",
      mode: "photo",
    });
  }, []);
};

export default useSetDefault;
