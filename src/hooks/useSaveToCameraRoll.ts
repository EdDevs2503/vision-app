import { saveToLibraryAsync } from "expo-media-library";
import { PhotoFile, VideoFile } from "react-native-vision-camera";

const useSaveToCameraRoll = () => {
  return {
    saveVideo: async (videoFile: VideoFile) => {
      await saveToLibraryAsync(videoFile.path);
    },
    savePhoto: async (photoFile: PhotoFile) => {
      await saveToLibraryAsync(photoFile.path);
    },
  };
};

export default useSaveToCameraRoll;
