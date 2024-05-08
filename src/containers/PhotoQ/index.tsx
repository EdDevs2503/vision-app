import {
  ArrowLeftIcon,
  Box,
  Center,
  Divider,
  Heading,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-media-library";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import FileManager from "../../compositions/FileManager";
import { getAssets } from "../../utils/getAssets";

const PhotoQ: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { navigate } = useNavigation<any>();

  useEffect(() => {
    getAssets(100).then((results) => setAssets(results));
  }, [setAssets]);

  return (
    <SafeAreaView flex={1}>
      <Center position="relative" mx="$10">
        <Box position="absolute" left={0}>
          <TouchableOpacity onPress={() => navigate("Camera")}>
            <ArrowLeftIcon size="lg" />
          </TouchableOpacity>
        </Box>
        <Heading>PhotoQ</Heading>
      </Center>
      <Divider mt="$5" />
      <FlatList
        data={assets}
        renderItem={({ item }) => <FileManager file={item} />}
      />
    </SafeAreaView>
  );
};

export default PhotoQ;
