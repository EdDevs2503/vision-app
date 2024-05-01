import { useRecoilState } from "recoil";

import cameraConfigurationAtom from "../atoms/CameraConfiguration";

const useHdr = () => {
  const [camConfiguration, setCamConfiguration] = useRecoilState(
    cameraConfigurationAtom,
  );

  return {
    isAllowed: camConfiguration.minFPS <= camConfiguration.hdrMaxFps,
    isActive: camConfiguration.activeHdr,
    switchStatus: () =>
      setCamConfiguration({
        ...camConfiguration,
        FPS: !camConfiguration.activeHdr
          ? camConfiguration.hdrMaxFps
          : camConfiguration.FPS,
        activeHdr: !camConfiguration.activeHdr,
      }),
  };
};

export default useHdr;
