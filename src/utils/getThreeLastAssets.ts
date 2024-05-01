import { getAssetsAsync } from "expo-media-library";

export const getThreeLastAssets = async () => {
  return (await getAssetsAsync({ first: 3 })).assets;
};
