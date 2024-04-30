import { useRecoilState } from "recoil";

import cameraStatus from "../atoms/cameraStatus";

const useCameraMode = () => {
  const [status, setStatus] = useRecoilState(cameraStatus);

  return (mode: "video" | "photo" | "video-audio") => {
    setStatus({
      ...status,
      mode,
    });
  };
};

export default useCameraMode;
