import { Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";

import useHdr from "../../hooks/useHdr";

const HDRButton: React.FC = () => {
  const { isAllowed, isActive, switchStatus } = useHdr();

  return (
    <TouchableOpacity onPress={switchStatus} disabled={!isAllowed}>
      <Text
        color={isAllowed ? (isActive ? "yellow" : "gray") : "$trueGray800"}
        bold
      >
        HDR
      </Text>
    </TouchableOpacity>
  );
};

export default HDRButton;
