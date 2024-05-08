import { getAssetsAsync } from "expo-media-library";

export const getAssets = async (numberOfAssets: number) => {
  return (await getAssetsAsync({ first: numberOfAssets })).assets;
};
