import { useRecoilState, useRecoilValue } from "recoil";

import cameraStatusAtom from "../atoms/CameraStatus";
import isVideoSelector from "../atoms/CameraStatus/selectors/isVideo";

const usePhotoStatus = () => {
  const [cameraStatus, setCameraStatus] = useRecoilState(cameraStatusAtom);
  const isVideo = useRecoilValue(isVideoSelector);

  const switchTakingPhotoStatus = (newVal: boolean) =>
    !isVideo && setCameraStatus({ ...cameraStatus, isTakingPhoto: newVal });

  return {
    isTakingPhoto: cameraStatus.isTakingPhoto,
    switchTakingPhotoStatus,
  };
};

export default usePhotoStatus;
