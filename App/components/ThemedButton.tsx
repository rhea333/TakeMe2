import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";

type ThemedButtonProps = {
  onPress: () => void;
  text: string;
  icon?: keyof typeof Ionicons.glyphMap | null;
  style?: StyleProp<ViewStyle> | undefined;
  fontSize?: number;
  disabled?: boolean;
}

export function ThemedButton({ onPress, text, icon = null, style = null, fontSize = 16, disabled = false }: ThemedButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, { backgroundColor: colors.primary }, style]}>
      {icon && <Ionicons size={28} name={icon} color={colors.text} />}
      <Text style={[styles.buttonText, { color: colors.text }, { fontSize: fontSize }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: '600',
  },
});
