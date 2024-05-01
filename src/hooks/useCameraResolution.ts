import { useRecoilState } from "recoil";

import cameraConfigurationAtom from "../atoms/CameraConfiguration";
import { TResolution } from "../types/resolution";

const useCameraResolution = () => {
  const [configuration, setConfiguration] = useRecoilState(
    cameraConfigurationAtom,
  );

  const setResolution = (resolution: TResolution) => {
    setConfiguration({
      activeHdr: false,
      formatName: resolution.name,
      hdrMaxFps: resolution.supportHdr.maxFps,
      resolution: {
        width: resolution.width,
        height: resolution.height,
      },
      FPS:
        configuration.FPS > resolution.maxFps
          ? resolution.maxFps
          : configuration.FPS,
      maxFPS: resolution.maxFps,
      disablePreview: false,
    });
  };

  return {
    setResolution,
    currentResolutionName: configuration.formatName,
  };
};

export default useCameraResolution;
