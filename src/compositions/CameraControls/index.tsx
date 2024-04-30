import {
  Box,
  Center,
  HStack,
  Icon,
  RepeatIcon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import isVideoSelector from "../../atoms/cameraStatus/selectors/isVideo";
import useCameraMode from "../../hooks/useCameraMode";
import useSwitchDevice from "../../hooks/useSwitchDevice";

interface ICameraControls {
  onAction: () => void;
}
const CameraControls: React.FC<ICameraControls> = ({ onAction }) => {
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
      <HStack space="md">
        <TouchableOpacity onPress={() => cameraMode("photo")}>
          <Text color={!isVideo ? "yellow" : "gray"}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => cameraMode("video-audio")}>
          <Text color={isVideo ? "yellow" : "gray"}>Video</Text>
        </TouchableOpacity>
      </HStack>
      <HStack
        width="100%"
        justifyContent="space-between"
        px="$10"
        alignItems="center"
      >
        <Box height={60} width={40} />
        <TouchableOpacity onPress={onAction}>
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
