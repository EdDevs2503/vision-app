import { usePermissions } from "expo-media-library";
import {
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

const useHasPermission = () => {
  const [cameraRollResponse] = usePermissions();
  const { hasPermission: camPermStatus } = useCameraPermission();
  const { hasPermission: microPermStatus } = useMicrophonePermission();

  console.log("cameraRollResponse", cameraRollResponse);

  return {
    isLoading: cameraRollResponse === null,
    value: camPermStatus && microPermStatus && !!cameraRollResponse?.granted,
  };
};

export default useHasPermission;
