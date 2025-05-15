import { Label } from "@/components/forms/Label";
import { ThemedButton } from "@/components/ThemedButton";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View } from "react-native";

type PhotoUploadProps = {
  handleFile: (file: string) => void;
  label?: string;
  isSuccessful?: boolean;
}

export function PhotoUpload({ handleFile, label, isSuccessful }: PhotoUploadProps) {
  const { colors } = useTheme();

  const handlePickIDPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      console.log(result.assets[0].uri)
      handleFile(result.assets[0].uri);
    }
  };

  const handleTakeIDPhoto = async () => {
    const permissionRes = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionRes.granted == false) {
      return;
      // TODO: Add alert
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      console.log(result.assets[0].uri)
      handleFile(result.assets[0].uri);
    }
  };

  return (
    <>
      {label && <Label text={label} />}
      <View style={styles.buttonGroup}>
        <ThemedButton
          onPress={handleTakeIDPhoto}
          text='Take Photo'
          icon={'camera-outline'}
          style={styles.button}
        />
        <ThemedButton
          onPress={handlePickIDPhoto}
          text='Upload Photo'
          icon={'cloud-upload-outline'}
          style={styles.button}
        />
      </View>
      {isSuccessful && <Text style={[styles.successText, { color: colors.text }]}>Upload Successful</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 80,
    marginHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
    width: '100%',
  },
  successText: {
    backgroundColor: 'green',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16
  },
});
