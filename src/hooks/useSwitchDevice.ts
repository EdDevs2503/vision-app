import { useRecoilState } from "recoil";

import cameraStatus from "../atoms/cameraStatus";

const useSwitchDevice = () => {
  const [status, setStatus] = useRecoilState(cameraStatus);

  return () => {
    setStatus({
      ...status,
      device: status.device === "front" ? "back" : "front",
    });
  };
};

export default useSwitchDevice;