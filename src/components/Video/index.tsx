import { Video as VideoViewer, ResizeMode } from "expo-av";
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { VideoFile } from "react-native-vision-camera";

interface IVideo {
  videoFile: VideoFile;
}

const Video: React.FC<IVideo> = ({ videoFile }) => {
  return (
    <View style={styles.container}>
      <VideoViewer
        style={{
          height: 500,
          alignSelf: "center",
          width: Dimensions.get("screen").width - 60,
        }}
        source={{
          uri: videoFile.path,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
