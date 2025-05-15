import { Label } from '@/components/forms/Label';
import { useTheme } from '@react-navigation/native';
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, TextInput, View } from 'react-native';

type LabelInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean | undefined;
  validationRegex?: RegExp;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
};

export function LabelInput({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  returnKeyType = 'default',
  secureTextEntry = false,
  validationRegex = /.*/,
  autoCapitalize = 'none',
}: LabelInputProps) {
  const { colors } = useTheme();

  const borderColor = RegExp(validationRegex).test(value) ? colors.border : 'red';

  return (
    <View style={styles.inputGroup}>
      <Label text={label} />
      <TextInput
        style={[styles.input, { borderColor: borderColor, color: colors.text, backgroundColor: colors.background }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor={colors.text}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
});
