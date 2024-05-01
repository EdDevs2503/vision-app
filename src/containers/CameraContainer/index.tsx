import { SafeAreaView } from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import { Camera, PhotoFile, VideoFile } from "react-native-vision-camera";
import { useRecoilValue } from "recoil";

import isPreviewDisabledSelector from "../../atoms/CameraConfiguration/selectors/isPreviewDisabled";
import isVideoSelector from "../../atoms/CameraStatus/selectors/isVideo";
import CameraControls from "../../compositions/CameraControls";
import CameraViewer from "../../compositions/CameraViewer";
import PreviewModal from "../../compositions/PreviewModal";
import useFlash from "../../hooks/useFlash";
import useSaveToCameraRoll from "../../hooks/useSaveToCameraRoll";
import useVideoStatus from "../../hooks/useVideoStatus";
const CameraContainer: React.FC = () => {
  const [isPrevOpen, setIsPrevOpen] = useState(false);
  const [videoFile, setVideoFile] = useState<VideoFile | undefined>();
  const [photoFile, setPhotoFile] = useState<PhotoFile | undefined>();
  const cameraRef = useRef<Camera>(null);
  const isVideo = useRecoilValue(isVideoSelector);
  const isPreviewDisabled = useRecoilValue(isPreviewDisabledSelector);
  const { flash } = useFlash();
  const { switchRecordingStatus } = useVideoStatus();
  const switchPrevModal = () => setIsPrevOpen(!isPrevOpen);
  const { saveVideo, savePhoto } = useSaveToCameraRoll();

  const handleRemovedPrev = () => {
    switchPrevModal();
    if (isVideo) {
      setVideoFile(undefined);
    } else {
      setPhotoFile(undefined);
    }
  };
  const handleSavePrev = () => {
    setVideoFile(undefined);
    if (isVideo) {
      if (videoFile)
        saveVideo(videoFile).finally(() => {
          setVideoFile(undefined);
          switchPrevModal();
        });
    } else {
      if (photoFile)
        savePhoto(photoFile).finally(() => {
          setPhotoFile(undefined);
          switchPrevModal();
        });
    }
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current !== null) {
      const photo = await cameraRef.current.takePhoto({
        flash: flash ? "on" : "off",
      });
      if (!isPreviewDisabled) {
        setPhotoFile(photo);
        switchPrevModal();
      }
    }
  };
  const handleStartVideo = async () => {
    if (cameraRef.current !== null) {
      switchRecordingStatus(true);
      cameraRef.current.startRecording({
        flash: flash ? "on" : "off",
        onRecordingFinished: (video) => {
          if (!isPreviewDisabled) {
            setVideoFile(video);
            setIsPrevOpen(true);
          } else {
            saveVideo(video);
          }
        },
        onRecordingError: (error) => console.error(error),
      });
    }
  };
  const handleStopVideo = async () => {
    if (cameraRef.current !== null) {
      switchRecordingStatus(false);
      await cameraRef.current.stopRecording();
    }
  };

  const handleClosePrev = () => {
    switchPrevModal();
    setPhotoFile(undefined);
    setVideoFile(undefined);
  };

  return (
    <SafeAreaView h="100%" backgroundColor="black">
      <CameraViewer ref={cameraRef} />
      <CameraControls
        onTakePhoto={handleTakePhoto}
        onStartVideo={handleStartVideo}
        onStopVideo={handleStopVideo}
      />
      <PreviewModal
        onHide={handleClosePrev}
        isOpen={isPrevOpen}
        photoFile={photoFile}
        videoFile={videoFile}
        onRemoved={handleRemovedPrev}
        onSaved={handleSavePrev}
      />
    </SafeAreaView>
  );
};

export default CameraContainer;
