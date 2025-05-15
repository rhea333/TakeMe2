import { useTheme } from '@react-navigation/native';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type LabelProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};

export function Label({ text, style }: LabelProps) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.label, { color: colors.text }, style]}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, marginBottom: 4 },
});
