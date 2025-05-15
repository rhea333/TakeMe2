import { Label } from '@/components/forms/Label';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

type Item = {
  label: string;
  value: number;
}

type ThemedMultiPickerProps = {
  label: string;
  onValueChange: (value: string[]) => void;
  items: Item[];
  value: any;
  placeholder?: string;
}

export function ThemedMultiPicker({ label, onValueChange, items, value, placeholder = 'Select item(s)' }: ThemedMultiPickerProps) {
  const { colors } = useTheme();

  const renderItem = (item: Item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <Ionicons
          style={styles.icon}
          color='black'
          name='pricetag-outline'
          size={20}
        />
      </View>
    );
  };

  return (
    <View style={styles.inputGroup}>
      <Label text={label} />
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        search
        searchPlaceholder="Search..."
        onChange={onValueChange}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color='black'
            name='pricetag-outline'
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <Ionicons
                color='black'
                name='trash-outline'
                size={17}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
