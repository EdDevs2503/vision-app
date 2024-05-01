import {
  Center,
  Heading,
  HStack,
  Icon,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { EyeIcon } from "lucide-react-native";
import React, { useEffect } from "react";

import useHasPermission from "../../hooks/useHasPermission";
import useSetDefault from "../../hooks/useSetDefault";

const Initialization: React.FC = () => {
  const setDefault = useSetDefault();
  const permissionStatus = useHasPermission();
  const { navigate } = useNavigation<any>();

  useEffect(() => {
    setDefault();
  }, [setDefault]);
  useEffect(() => {
    if (!permissionStatus.isLoading) {
      if (!permissionStatus.value) {
        navigate("Permissions");
      } else {
        navigate("Camera");
      }
    }
  }, [permissionStatus, navigate]);

  return (
    <SafeAreaView flex={1}>
      <Center flex={1}>
        <HStack alignItems="center" space="lg">
          <Heading>Vision App</Heading>
          <Icon as={EyeIcon} />
        </HStack>
      </Center>
    </SafeAreaView>
  );
};

export default Initialization;
