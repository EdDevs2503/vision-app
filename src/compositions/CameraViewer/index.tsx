import { Box, SafeAreaView } from "@gluestack-ui/themed";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";
import { useRecoilValue } from "recoil";

import cameraConfigurationAtom from "../../atoms/CameraConfiguration";
import isDisabledAudioSelector from "../../atoms/CameraStatus/selectors/isDisabledAudio";
import isFrontSelector from "../../atoms/CameraStatus/selectors/isFront";
import isVideoSelector from "../../atoms/CameraStatus/selectors/isVideo";
import ResolutionPicker from "../../components/ResolutionPicker";
import useHasPermission from "../../hooks/useHasPermission";
import { getResolutions } from "../../utils/getResolutions";

const CameraViewer = forwardRef<Camera>((_, ref) => {
  const isVideo = useRecoilValue(isVideoSelector);
  const isFront = useRecoilValue(isFrontSelector);
  const isDisabledAudio = useRecoilValue(isDisabledAudioSelector);
  const backDevice = useCameraDevice("back");
  const frontDevice = useCameraDevice("front");
  const hasPermission = useHasPermission();
  const cameraConfiguration = useRecoilValue(cameraConfigurationAtom);
  const device = useMemo(
    () => (isFront ? frontDevice || backDevice : backDevice),
    [backDevice, frontDevice, isFront],
  );
  const resolutions = useMemo(
    () =>
      getResolutions({
        isVideo,
        isFront,
      }),
    [isFront, isVideo],
  );
  const format = useCameraFormat(device, [
    isVideo
      ? { videoResolution: cameraConfiguration.resolution }
      : { photoResolution: cameraConfiguration.resolution },
    isVideo
      ? { videoHdr: cameraConfiguration.activeHdr }
      : { photoHdr: cameraConfiguration.activeHdr },
    { fps: cameraConfiguration.FPS },
  ]);
  if (!hasPermission) {
    return <Box flex={1} backgroundColor="black" />;
  }

  return (
    <SafeAreaView flex={1} position="relative">
      <Camera
        ref={ref}
        // @ts-ignore
        device={device}
        isActive
        style={styles.cam}
        photo={!isVideo}
        video={isVideo}
        audio={isDisabledAudio}
        format={format}
        videoHdr={format?.supportsVideoHdr}
        photoHdr={format?.supportsPhotoHdr}
      />
      <Box position="absolute" top={10} alignSelf="center">
        <ResolutionPicker resolutions={resolutions} />
      </Box>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  cam: {
    height: "100%",
    width: "100%",
  },
});

export default CameraViewer;
