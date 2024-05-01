import { useRecoilState, useRecoilValue } from "recoil";

import cameraStatusAtom from "../atoms/CameraStatus";
import isVideoSelector from "../atoms/CameraStatus/selectors/isVideo";

const useVideoStatus = () => {
  const [cameraStatus, setCameraStatus] = useRecoilState(cameraStatusAtom);
  const isVideo = useRecoilValue(isVideoSelector);

  const switchRecordingStatus = (newVal: boolean) =>
    isVideo && setCameraStatus({ ...cameraStatus, isRecording: newVal });

  return {
    isRecording: cameraStatus.isRecording,
    switchRecordingStatus,
  };
};

export default useVideoStatus;
