import {
  Box,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Asset } from "expo-media-library";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

import useCloudStorage from "../../hooks/useCloudStorage";

interface Props {
  file: Asset;
}

const FileManager: React.FC<Props> = ({ file }) => {
  const date = new Date(file.creationTime);
  const { uploadFile, status, uploadingPercent } = useCloudStorage(file);

  const { text, color, isDisabled, action } = useMemo(() => {
    switch (status) {
      case "uploaded":
        return {
          text: "Uploaded",
          color: "green",
          isDisabled: true,
          action: () => {},
        };
      case "error":
        return {
          text: "Try again",
          color: "red",
          isDisabled: false,
          action: uploadFile,
        };
      case "uploading":
        return {
          text: `Processing ${uploadingPercent}%`,
          color: "orange",
          isDisabled: true,
          action: () => {},
        };
      case "pending":
        return {
          text: "Start uploading",
          color: "blue",
          isDisabled: false,
          action: uploadFile,
        };
    }
  }, [status, uploadFile, uploadingPercent]);

  return (
    <Box w="100%" my="$2">
      <HStack alignItems="center" justifyContent="space-between" px="$4">
        <HStack>
          <Image h={100} source={{ uri: file.uri }} alt="Image" />
          <VStack ml="$5" justifyContent="center" space="md">
            <Text bold>{file.filename}</Text>
            <Text>{`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`}</Text>
          </VStack>
        </HStack>
        {/*<Text color="black">{file.uri}</Text>*/}
        <TouchableOpacity onPress={action} disabled={isDisabled}>
          <Box p="$1" backgroundColor={color} borderRadius={5}>
            <Text color="white" bold>
              {text}
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>
      <Divider />
    </Box>
  );
};

export default FileManager;
