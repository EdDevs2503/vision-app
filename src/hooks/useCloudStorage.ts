import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FileSystemSessionType,
  createUploadTask,
  FileSystemUploadType,
} from "expo-file-system";
import { Asset } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import { toLower } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

type TStatues = "uploaded" | "uploading" | "pending" | "error";

interface ICloudStorage {
  status: "uploaded" | "uploading" | "pending" | "error";
  uploadFile: () => void;
  uploadingPercent: number | null;
}

const key = "saved-files--ss-sasdasasdas";

const useCloudStorage = (file: Asset): ICloudStorage => {
  const [uri, setUri] = useState("");
  const [status, setStatus] = useState<TStatues>("pending");
  const [percentStatus, setPercentStatus] = useState({
    sent: 0,
    total: 0,
  });

  useEffect(() => {
    const assetId = file.uri.split("ph://")[1];
    MediaLibrary.getAssetInfoAsync(assetId).then((asset) => {
      if (asset.localUri) setUri(asset.localUri);
    });
  }, [file]);

  useEffect(() => {
    AsyncStorage.getItem(key).then((value) => {
      const data = JSON.parse(value || "{}");
      if (data[file.filename]) {
        setStatus("uploaded");
      }
    });
  }, [file.filename]);

  const saveFile = useCallback(async () => {
    const saved = JSON.parse((await AsyncStorage.getItem(key)) || "{}");
    await AsyncStorage.setItem(
      "saved-files",
      JSON.stringify({
        ...saved,
        [file.filename]: true,
      }),
    );
  }, [file.filename]);

  const uploadTask = useMemo(() => {
    const filename = file.filename.split(".");
    return createUploadTask(
      "https://dummy.restapiexample.com/api/v1/create",
      uri,
      {
        sessionType: FileSystemSessionType.BACKGROUND,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        httpMethod: "POST",
        fieldName: filename[0],
        uploadType: FileSystemUploadType.MULTIPART,
        mimeType: `image/${toLower(filename[1])}`,
      },
      ({ totalBytesExpectedToSend, totalBytesSent }) =>
        setPercentStatus({
          sent: totalBytesSent,
          total: totalBytesExpectedToSend,
        }),
    );
  }, [file.filename, uri]);

  const uploadFile = useCallback(async () => {
    setStatus("uploading");
    uploadTask
      .uploadAsync()
      .then(async () => {
        setStatus("uploaded");
        await saveFile();
      })
      .catch((error) => {
        setStatus("error");
        console.log(error);
      });
  }, [saveFile, uploadTask]);

  return {
    status,
    uploadFile,
    uploadingPercent:
      status === "uploading" || status === "uploaded"
        ? (percentStatus.sent / percentStatus.total) * 100 || 0
        : null,
  };
};

export default useCloudStorage;
