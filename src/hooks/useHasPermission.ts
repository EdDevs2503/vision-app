import {
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

const useHasPermission = () => {
  const { hasPermission: camPermStatus } = useCameraPermission();
  const { hasPermission: microPermStatus } = useMicrophonePermission();
  return camPermStatus && microPermStatus;
};

export default useHasPermission;
