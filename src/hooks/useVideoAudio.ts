import { useRecoilValue } from "recoil";

import useCameraMode from "./useCameraMode";
import cameraStatusAtom from "../atoms/CameraStatus";
import isVideoAtom from "../atoms/CameraStatus/selectors/isVideo";

const useVideoAudio = () => {
  const status = useRecoilValue(cameraStatusAtom);
  const isVideo = useRecoilValue(isVideoAtom);
  const setCameraMode = useCameraMode();
  const audio = isVideo ? status.mode === "video-audio" : false;
  return {
    allowed: isVideo,
    audio,
    switchAudio: () => {
      if (isVideo) {
        setCameraMode(audio ? "video" : "video-audio");
      }
    },
  };
};

export default useVideoAudio;
