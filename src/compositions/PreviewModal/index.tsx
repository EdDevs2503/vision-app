import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonIcon,
  ButtonText,
  DownloadIcon,
  HStack,
  Image,
  TrashIcon,
} from "@gluestack-ui/themed";
import React from "react";
import { PhotoFile, VideoFile } from "react-native-vision-camera";

import Video from "../../components/Video";

interface IPreviewModal {
  isOpen: boolean;
  photoFile: PhotoFile | undefined;
  videoFile: VideoFile | undefined;
  onHide: () => void;
  onRemoved: () => void;
  onSaved: () => void;
}

const PreviewModal: React.FC<IPreviewModal> = ({
  isOpen,
  photoFile,
  onHide,
  videoFile,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onHide}>
      <ActionsheetBackdrop />
      <ActionsheetContent height={700} zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {!!photoFile && (
          <Image
            height={500}
            aspectRatio={photoFile.height / photoFile.width}
            source={{ uri: photoFile.path }}
            alt="picture taken"
          />
        )}
        {!!videoFile && <Video videoFile={videoFile} />}
        <HStack py="$8" px="$10" width="100%" justifyContent="space-between">
          <Button>
            <ButtonIcon as={DownloadIcon} size="md" mr="$2" />
            <ButtonText>Save</ButtonText>
          </Button>
          <Button>
            <ButtonIcon as={TrashIcon} size="md" mr="$2" />
            <ButtonText>Remove</ButtonText>
          </Button>
        </HStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default PreviewModal;