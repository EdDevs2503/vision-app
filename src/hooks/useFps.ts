import { useRecoilState } from "recoil";

import cameraConfigurationAtom from "../atoms/CameraConfiguration";

const fpsOptions = [30, 60, 120, 240];

const useFps = () => {
  const [cameraConf, setCameraConf] = useRecoilState(cameraConfigurationAtom);

  const setFps = (fpsSelection: number) =>
    setCameraConf({
      ...cameraConf,
      FPS: fpsSelection,
      activeHdr:
        fpsSelection > cameraConf.hdrMaxFps ? false : cameraConf.activeHdr,
    });

  return {
    fpsOptions: fpsOptions.filter((fps) => fps <= cameraConf.maxFPS),
    setFps,
    currentFps: cameraConf.FPS,
  };
};

export default useFps;
