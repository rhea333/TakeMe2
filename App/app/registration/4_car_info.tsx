import { InfoLabel } from '@/components/forms/InfoLabel';
import { LabelInput } from '@/components/forms/LabelInput';
import { PhotoUpload } from '@/components/forms/PhotoUpload';
import { ThemedPicker } from '@/components/ThemedPicker';
import { ArrayToDropdownOptions, Cars } from '@/constants/Dropdowns';
import { RegistrationValidationRegexes } from '@/constants/Registration';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Page4() {
  const { colors } = useTheme();
  const { data, setData } = useRegistration();

  return (
    <View style={styles.form}>
      <InfoLabel text='If you wish to become a driver in the future fill out this section otherwise you may skip it.' />
      <PhotoUpload
        label="Driver's License"
        handleFile={file => setData({ licenseUri: file })}
        isSuccessful={data.licenseUri != null}
      />
      <ThemedPicker
        label='Car Make'
        onValueChange={val => {
          setData({ make: val });
        }}
        items={ArrayToDropdownOptions(Object.keys(Cars))}
        value={data.make}
        placeholder={{ label: 'Select a make', value: null }}
      />
      {data.make &&
        <ThemedPicker
          label='Car Model'
          onValueChange={val => {
            setData({ model: val });
          }}
          items={ArrayToDropdownOptions(Cars[data.make])}
          value={data.model}
          placeholder={{ label: 'Select a model', value: null }}
        />
      }
      <LabelInput
        label='License Plate'
        value={data.plateNumber}
        onChangeText={(val) => setData({ plateNumber: val })}
        validationRegex={RegistrationValidationRegexes.plateNumber}
        autoCapitalize='characters'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1 },
  label: { fontSize: 16, marginBottom: 4 },
});
