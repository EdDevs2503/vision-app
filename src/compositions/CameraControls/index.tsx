import {
  Box,
  Center,
  HStack,
  Icon,
  RepeatIcon,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import isVideoSelector from "../../atoms/CameraStatus/selectors/isVideo";
import CameraModePicker from "../../components/CameraModePicker";
import FPSPicker from "../../components/FPSPicker";
import HDRButton from "../../components/HDRButton";
import useCameraMode from "../../hooks/useCameraMode";
import useSwitchDevice from "../../hooks/useSwitchDevice";
import useVideoStatus from "../../hooks/useVideoStatus";

interface ICameraControls {
  onTakePhoto: () => void;
  onStartVideo: () => void;
  onStopVideo: () => void;
}
const CameraControls: React.FC<ICameraControls> = ({
  onTakePhoto,
  onStartVideo,
  onStopVideo,
}) => {
  const { isRecording } = useVideoStatus();
  const switchDevice = useSwitchDevice();
  const cameraMode = useCameraMode();
  const isVideo = useRecoilValue(isVideoSelector);

  return (
    <VStack
      backgroundColor="black"
      py="$2"
      space="md"
      alignItems="center"
      width="100%"
    >
      <HStack width="100%" px="$3">
        <FPSPicker />
        <CameraModePicker />
        <HDRButton />
      </HStack>
      <HStack
        width="100%"
        justifyContent="space-between"
        px="$10"
        alignItems="center"
      >
        <Box height={60} width={40} />
        <TouchableOpacity
          onPress={
            !isVideo ? onTakePhoto : !isRecording ? onStartVideo : onStopVideo
          }
        >
          <Center
            height={65}
            width={65}
            borderRadius={65 / 2}
            borderWidth={2}
            borderColor="snow"
          >
            <Box
              height={55}
              width={55}
              borderRadius={55 / 2}
              backgroundColor={isVideo ? "red" : "snow"}
            />
          </Center>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchDevice}>
          <Center
            height={40}
            width={40}
            borderRadius={20}
            backgroundColor="gray"
          >
            <Icon color="white" as={RepeatIcon} m="$2" w="$4" h="$4" />
          </Center>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

export default CameraControls;
