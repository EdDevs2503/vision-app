import { HStack, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";

import useCameraResolution from "../../hooks/useCameraResolution";
import { TResolution } from "../../types/resolution";

interface IResolutionsPicker {
  resolutions: TResolution[];
}

const ResolutionsPicker: React.FC<IResolutionsPicker> = ({ resolutions }) => {
  const { setResolution, currentResolutionName } = useCameraResolution();

  return (
    <HStack space="md" backgroundColor="$trueGray900" borderRadius="$lg">
      {resolutions.map((resolution, index) => (
        <TouchableOpacity onPress={() => setResolution(resolution)} key={index}>
          <Text
            p="$2"
            color={
              resolution.name === currentResolutionName ? "yellow" : "gray"
            }
          >
            {resolution.name}
          </Text>
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

export default ResolutionsPicker;
