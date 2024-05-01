import { useRecoilState, useRecoilValue } from "recoil";

import useCameraResolution from "./useCameraResolution";
import cameraStatus from "../atoms/CameraStatus";
import isFrontSelector from "../atoms/CameraStatus/selectors/isFront";
import { getResolutions } from "../utils/getResolutions";

type TMode = "video" | "photo" | "video-audio";

const useCameraMode = () => {
  const [status, setStatus] = useRecoilState(cameraStatus);
  const isFront = useRecoilValue(isFrontSelector);
  const { currentResolutionName, setResolution } = useCameraResolution();

  const setCorrectResolutions = (mode: TMode) => {
    const isVideo = mode === "video" || mode === "video-audio";
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
    setCorrectResolutions(mode);
    setStatus({
      ...status,
      mode,
    });
  };
};

export default useCameraMode;
