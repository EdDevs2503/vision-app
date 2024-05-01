import { useRecoilState } from "recoil";

import cameraStatus from "../atoms/CameraStatus";

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
