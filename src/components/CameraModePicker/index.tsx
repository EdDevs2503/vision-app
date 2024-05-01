import { HStack, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import isVideoSelector from "../../atoms/CameraStatus/selectors/isVideo";
import useCameraMode from "../../hooks/useCameraMode";

const CameraModePicker: React.FC = () => {
  const isVideo = useRecoilValue(isVideoSelector);
  const cameraMode = useCameraMode();

  return (
    <HStack space="md" flex={1} justifyContent="center">
      <TouchableOpacity onPress={() => cameraMode("photo")}>
        <Text color={!isVideo ? "yellow" : "gray"}>Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cameraMode("video-audio")}>
        <Text color={isVideo ? "yellow" : "gray"}>Video</Text>
      </TouchableOpacity>
    </HStack>
  );
};

export default CameraModePicker;
