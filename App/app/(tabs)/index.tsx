import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <Button
          title="Register"
          onPress={() => router.replace('/registration/1_school')}
          color={colors.primary}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
