import { Box, Center, Icon, VStack } from "@gluestack-ui/themed";
import {
  Flashlight,
  FlashlightOff,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

import useFlash from "../../hooks/useFlash";
import useVideoAudio from "../../hooks/useVideoAudio";

const CameraModifiers: React.FC = () => {
  const { flash, switchFlash, allowed: allowedFlash } = useFlash();
  const { audio, switchAudio, allowed: allowedAudio } = useVideoAudio();
  return (
    <VStack backgroundColor="$trueGray900" borderRadius="$lg">
      <TouchableOpacity onPress={switchFlash} disabled={!allowedFlash}>
        <Center h={50} w={30}>
          <Icon
            color={allowedFlash ? (flash ? "yellow" : "gray") : "$trueGray800"}
            as={flash ? Flashlight : FlashlightOff}
          />
        </Center>
      </TouchableOpacity>
      <Box h={0.5} w={30} backgroundColor="gray" />
      <TouchableOpacity onPress={switchAudio} disabled={!allowedAudio}>
        <Center h={50} w={30}>
          <Icon
            color={allowedAudio ? (audio ? "yellow" : "gray") : "$trueGray800"}
            as={audio ? Volume2 : VolumeX}
          />
        </Center>
      </TouchableOpacity>
    </VStack>
  );
};

export default CameraModifiers;
