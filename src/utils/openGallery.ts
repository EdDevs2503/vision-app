import { Linking, Platform } from "react-native";

const openGallery = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("photos-redirect://");
  } else if (Platform.OS === "android") {
    Linking.openURL("content://media/internal/images/media");
  }
};

export default openGallery;
