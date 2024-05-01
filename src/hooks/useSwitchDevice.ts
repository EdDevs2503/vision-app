import { getCameraDevice } from "react-native-vision-camera";
import { useRecoilState } from "recoil";

import cameraStatus from "../atoms/CameraStatus";
import { devices } from "../utils/constants";

const useSwitchDevice = () => {
  const [status, setStatus] = useRecoilState(cameraStatus);

  return () => {
    const devicePosition = status.device === "front" ? "back" : "front";
    const device = getCameraDevice(devices, devicePosition);
    setStatus({
      ...status,
      hasFlash: device?.hasFlash || false,
      hasTorch: device?.hasTorch || false,
      device: status.device === "front" ? "back" : "front",
    });
  };
};

export default useSwitchDevice;
