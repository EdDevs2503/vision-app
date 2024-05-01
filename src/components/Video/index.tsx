import { Video as VideoViewer, ResizeMode } from "expo-av";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { VideoFile } from "react-native-vision-camera";

interface IVideo {
  videoFile: VideoFile;
}

const Video: React.FC<IVideo> = ({ videoFile }) => {
  return (
    <View style={styles.container}>
      <VideoViewer
        style={{
          alignSelf: "center",
          height: 500,
          aspectRatio: 1.6,
        }}
        source={{
          uri: videoFile.path,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: (aspectRatio: number) => ({
    alignSelf: "center",
    height: 500,
    aspectRatio,
  }),
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
