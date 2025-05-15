import { useTheme } from '@react-navigation/native';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

type InfoLabelProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};

export function InfoLabel({ text, style }: InfoLabelProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.box}>
      <Text style={[styles.label, { color: colors.text }, style]}><Text style={styles.note}>Note: </Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 4,
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row'
  },
  label: {
    fontSize: 14,
  },
  note: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
