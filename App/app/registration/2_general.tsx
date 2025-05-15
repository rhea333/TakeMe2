import { ThemedButton } from '@/components/ThemedButton';
import { ThemedPicker } from '@/components/ThemedPicker';
import { Label } from '@/components/forms/Label';
import { LabelInput } from '@/components/forms/LabelInput';
import { PhotoUpload } from '@/components/forms/PhotoUpload';
import { ArrayToDropdownOptions, Pronouns } from '@/constants/Dropdowns';
import { RegistrationValidationRegexes } from '@/constants/Registration';
import { useRegistration } from '@/contexts/RegistrationContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';

export default function Page2() {
  const { colors } = useTheme();
  const { data, setData } = useRegistration();
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  return (
    <View style={styles.form}>
      <View style={styles.modeSwitch}>
        <Text style={[styles.modeLabel, { color: colors.text }]}>Passenger</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }}
          thumbColor={data.isDriver ? '#f5dd4b' : '#27ae60'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={() => setData({ isDriver: !data.isDriver })}
          value={data.isDriver}
        />
        <Text style={[styles.modeLabel, { color: colors.text }]}>Driver</Text>
      </View>

      <LabelInput
        label='First Name'
        value={data.firstName}
        onChangeText={(val) => setData({ firstName: val })}
        validationRegex={RegistrationValidationRegexes.firstName}
      />
      <LabelInput
        label='Last Name'
        value={data.lastName}
        onChangeText={(val) => setData({ lastName: val })}
        validationRegex={RegistrationValidationRegexes.lastName}
      />
      <LabelInput
        label='Password'
        value={data.password}
        onChangeText={(val) => setData({ password: val })}
        secureTextEntry
        validationRegex={RegistrationValidationRegexes.password}
      />

      <ThemedPicker
        label='Pronoun'
        onValueChange={val => {
          setData({ pronouns: val });
        }}
        items={ArrayToDropdownOptions(Pronouns)}
        value={data.pronouns}
        placeholder={{ label: 'Select a pronoun', value: null }}
      />

      <View style={styles.inputGroup}>
        <Label text='Birthday'></Label>
        {Platform.OS !== 'ios' &&
          <ThemedButton
            onPress={() => setShowDatePicker(true)}
            text={data.birthday ? new Date(data.birthday).toDateString() : 'Select Date'}
            style={styles.dateButton}
          />
        }
        {showDatePicker && <DateTimePicker
          value={data.birthday ? new Date(data.birthday) : new Date()}
          mode='date'
          display='default'
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) setData({ birthday: selectedDate.toISOString() });
          }}
        />}
      </View>

      <PhotoUpload
        label='Profile Photo'
        handleFile={file => setData({ schoolIDUri: file })}
        isSuccessful={data.schoolIDUri != null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1 },
  modeLabel: {
    fontSize: 20,
    paddingHorizontal: 20,
    verticalAlign: 'middle',
    height: '100%',
  },
  modeSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dropdown: { marginLeft: 0 },
  inputGroup: { marginBottom: 16 },
  dateButton: {
    padding: 10,
  }
});
