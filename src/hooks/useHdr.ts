import { useRecoilState } from "recoil";

import cameraConfigurationAtom from "../atoms/CameraConfiguration";

const useHdr = () => {
  const [camConfiguration, setCamConfiguration] = useRecoilState(
    cameraConfigurationAtom,
  );

  return {
    isAllowed: camConfiguration.FPS <= camConfiguration.hdrMaxFps,
    isActive: camConfiguration.activeHdr,
    switchStatus: () =>
      setCamConfiguration({
        ...camConfiguration,
        activeHdr: !camConfiguration.activeHdr,
      }),
  };
};

export default useHdr;
