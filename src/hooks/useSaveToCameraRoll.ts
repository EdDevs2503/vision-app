import { PhotoFile, VideoFile } from "react-native-vision-camera";

const useSaveToCameraRoll = () => {
  return {
    saveVideo: (videoFile: VideoFile) => {},
    savePhoto: (photoFile: PhotoFile) => {},
  };
};

export default useSaveToCameraRoll;
