import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import useFps from "../../hooks/useFps";

const FPSPicker: React.FC = () => {
  const [isOpen, setisOpen] = useState(false);
  const { fpsOptions, setFps, currentFps } = useFps();

  const switchStatus = () => setisOpen(!isOpen);
  const manageSetFps = (fps: number) => () => {
    setFps(fps);
    switchStatus();
  };

  return (
    <VStack space="sm" position="relative" alignItems="center">
      {isOpen && (
        <VStack
          position="absolute"
          bottom={25}
          alignItems="center"
          backgroundColor="black"
          space="lg"
          paddingBottom={20}
        >
          {fpsOptions.reverse().map((fps, index) => (
            <TouchableOpacity key={index} onPress={manageSetFps(fps)}>
              <Box width={40} height={30}>
                <Text
                  textAlign="center"
                  color={currentFps === fps ? "yellow" : "gray"}
                >
                  {fps}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </VStack>
      )}
      <TouchableOpacity onPress={switchStatus}>
        <VStack alignItems="center" height={30}>
          <Text color={isOpen ? "yellow" : "gray"}>FPS</Text>
          {!isOpen && (
            <Text fontSize={12} color={isOpen ? "yellow" : "gray"}>
              {currentFps}
            </Text>
          )}
        </VStack>
      </TouchableOpacity>
    </VStack>
  );
};

export default FPSPicker;
