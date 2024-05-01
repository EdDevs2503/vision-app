import { Box, Center } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import isVideoSelector from "../../atoms/CameraStatus/selectors/isVideo";
import useVideoStatus from "../../hooks/useVideoStatus";

interface ICameraButton {
  onPress: () => void;
}

const CameraButton: React.FC<ICameraButton> = ({ onPress }) => {
  const { isRecording } = useVideoStatus();
  const isVideo = useRecoilValue(isVideoSelector);

  return (
    <TouchableOpacity onPress={onPress}>
      <Center
        height={65}
        width={65}
        borderRadius={65 / 2}
        borderWidth={2}
        borderColor="snow"
      >
        <Box
          height={isRecording ? 30 : 55}
          width={isRecording ? 30 : 55}
          borderRadius={isRecording ? 5 : 55 / 2}
          backgroundColor={isVideo ? "red" : "snow"}
        />
      </Center>
    </TouchableOpacity>
  );
};

export default CameraButton;
