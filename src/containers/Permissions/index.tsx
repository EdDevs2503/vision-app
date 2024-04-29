import {
  Center,
  Heading,
  HStack,
  SafeAreaView,
  Switch,
  VStack,
  Text,
  Box,
  Divider,
  ArrowLeftIcon,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

const Permissions: React.FC = () => {
  const { goBack } = useNavigation();
  const { hasPermission: camPermStatus, requestPermission: requestCamPerm } =
    useCameraPermission();
  const {
    hasPermission: microPermStatus,
    requestPermission: requestMicroPerm,
  } = useMicrophonePermission();

  const handlePermRequest = (permRequest: () => void) => (newVal: boolean) => {
    if (newVal) permRequest();
  };

  return (
    <SafeAreaView h="100%">
      <Center position="relative" mx="$10">
        <Box position="absolute" left={0}>
          <TouchableOpacity onPress={goBack}>
            <ArrowLeftIcon size="lg" />
          </TouchableOpacity>
        </Box>
        <Heading>Permissions</Heading>
      </Center>
      <VStack
        flex={1}
        width={250}
        space="md"
        alignSelf="center"
        justifyContent="center"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Text bold>Camera:</Text>
          <Switch
            value={camPermStatus}
            isDisabled={camPermStatus}
            onValueChange={handlePermRequest(requestCamPerm)}
          />
        </HStack>
        <Divider />
        <HStack justifyContent="space-between" alignItems="center">
          <Text bold>Microphone:</Text>
          <Switch
            value={microPermStatus}
            isDisabled={microPermStatus}
            onValueChange={handlePermRequest(requestMicroPerm)}
          />
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Permissions;
