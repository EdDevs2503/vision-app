import { useRecoilState, useRecoilValue } from "recoil";

import cameraStatus from "../atoms/CameraStatus";
import isVideoAtom from "../atoms/CameraStatus/selectors/isVideo";

const useFlash = () => {
  const isVideo = useRecoilValue(isVideoAtom);
  const [status, setStatus] = useRecoilState(cameraStatus);
  return {
    allowed: isVideo ? status.hasTorch : status.hasFlash,
    flash: isVideo ? status.torch : status.flash,
    switchFlash: () => {
      if (isVideo) {
        setStatus({ ...status, flash: false, torch: !status.torch });
      } else {
        setStatus({ ...status, torch: false, flash: !status.flash });
      }
    },
  };
};

export default useFlash;
