import { Label } from '@/components/forms/Label';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';

type ThemedPickerProps = {
  label: string;
  onValueChange: (value: any, index: number) => void;
  items: Item[];
  value: any;
  placeholder: Item | {};
}

export function ThemedPicker({ label, onValueChange, items, value, placeholder }: ThemedPickerProps) {
  const { colors } = useTheme();

  const pickerStyle = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      paddingRight: 30, // to ensure the text is never behind the icon
      color: colors.text,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      // paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      paddingRight: 30, // to ensure the text is never behind the icon
      color: colors.text,
    },
  });

  return (
    <View style={styles.inputGroup}>
      <Label text={label} />
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        placeholder={placeholder}
        style={pickerStyle}
        darkTheme={true}
        textInputProps={{ pointerEvents: 'none' }}
      // onUpArrow={() => {
      //   this.inputRefs.firstTextInput.focus();
      // }}
      // onDownArrow={() => {
      //   this.inputRefs.favSport1.togglePicker();
      // }}
      // ref={el => {
      //   this.inputRefs.favSport0 = el;
      // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 16 },
});
