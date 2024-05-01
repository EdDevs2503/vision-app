import { useRecoilState, useRecoilValue } from "recoil";

import useCameraResolution from "./useCameraResolution";
import cameraStatus from "../atoms/CameraStatus";
import isFrontSelector from "../atoms/CameraStatus/selectors/isFront";
import { getResolutions } from "../utils/getResolutions";

type TMode = "video" | "photo" | "video-audio";
const checkIsVideo = (mode: TMode) =>
  mode === "video" || mode === "video-audio";
const useCameraMode = () => {
  const [status, setStatus] = useRecoilState(cameraStatus);
  const isFront = useRecoilValue(isFrontSelector);
  const { currentResolutionName, setResolution } = useCameraResolution();

  const setCorrectResolutions = (mode: TMode) => {
    const isVideo = checkIsVideo(mode);
    const resolutions = getResolutions({
      isVideo,
      isFront,
    });
    const newResolution =
      resolutions.find(
        (resolution) => resolution.name === currentResolutionName,
      ) || resolutions[0];
    setResolution(newResolution);
  };

  return (mode: TMode) => {
    const isVideo = checkIsVideo(mode);
    const newStatus = {
      ...status,
      mode,
    };
    if (isVideo && status.flash) {
      newStatus.flash = false;
      newStatus.torch = true;
    } else if (!isVideo && status.torch) {
      newStatus.flash = true;
      newStatus.torch = false;
    }
    setCorrectResolutions(mode);
    setStatus(newStatus);
  };
};

export default useCameraMode;
