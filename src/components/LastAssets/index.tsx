import { Box, Image } from "@gluestack-ui/themed";
import { Asset } from "expo-media-library";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import { getThreeLastAssets } from "../../utils/getThreeLastAssets";
import openGallery from "../../utils/openGallery";

const LastAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(() => {
    getThreeLastAssets().then((values) => {
      setAssets(values);
    });
  }, []);
  return (
    <TouchableOpacity onPress={openGallery}>
      <Box height={60} width={40} position="relative">
        {assets.map((asset, index) => (
          <Image
            style={{
              transform: [
                { rotateZ: index * 30 + "deg" },
                { translateX: index * 2 },
                { translateY: index * -4 },
              ],
            }}
            borderRadius={5}
            key={index}
            position="absolute"
            zIndex={assets.length - (index + 1)}
            height={60}
            width={40}
            source={{ uri: asset.uri }}
            alt={"Last Asset" + (index + 1)}
          />
        ))}
      </Box>
    </TouchableOpacity>
  );
};

export default LastAssets;
