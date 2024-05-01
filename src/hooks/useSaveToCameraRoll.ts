import { saveToLibraryAsync } from "expo-media-library";
import { PhotoFile, VideoFile } from "react-native-vision-camera";

import usePhotoStatus from "./usePhotoStatus";

const useSaveToCameraRoll = () => {
  const { switchTakingPhotoStatus } = usePhotoStatus();

  return {
    saveVideo: async (videoFile: VideoFile) => {
      await saveToLibraryAsync(videoFile.path);
    },
    savePhoto: async (photoFile: PhotoFile) => {
      await saveToLibraryAsync(photoFile.path);
      switchTakingPhotoStatus(false);
    },
  };
};

export default useSaveToCameraRoll;
