import { useMemo } from "react";
import {
  CameraDeviceFormat,
  useCameraDevice,
} from "react-native-vision-camera";
import { useRecoilValue } from "recoil";

import isFrontSelector from "../atoms/CameraStatus/selectors/isFront";
import isVideoSelector from "../atoms/CameraStatus/selectors/isVideo";
import { TFormat } from "../types/format";
import { filterFormats } from "../utils/filterFormats";

const useGetFormats = (
  expectedResolutions: { name: string; value: [number, number] }[],
) => {
  const isVideo = useRecoilValue(isVideoSelector);
  const isFront = useRecoilValue(isFrontSelector);
  const backDevice = useCameraDevice("back");
  const frontDevice = useCameraDevice("front");

  return useMemo(() => {
    let deviceRawFormats: CameraDeviceFormat[] = [];
    if (isFront && frontDevice) {
      deviceRawFormats = frontDevice.formats;
    }
    if (!isFront && backDevice) {
      deviceRawFormats = backDevice.formats;
    }

    const resolutions: TFormat[] = [];
    deviceRawFormats.forEach((format) => {
      const width = isVideo ? format.videoWidth : format.photoWidth;
      const height = isVideo ? format.videoHeight : format.photoHeight;

      const expectedResolution = expectedResolutions.find(
        (resolution) =>
          resolution.value[0] === width && resolution.value[1] === height,
      );

      if (expectedResolution) {
        resolutions.push({
          name: expectedResolution.name,
          height,
          width,
          maxFps: format.maxFps,
          minFps: format.minFps,
          hdr: isVideo ? format.supportsVideoHdr : format.supportsPhotoHdr,
        });
      }
    });

    return filterFormats(resolutions);
  }, [backDevice, expectedResolutions, frontDevice, isFront, isVideo]);
};

export default useGetFormats;
