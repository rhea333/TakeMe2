import { LabelInput } from '@/components/forms/LabelInput';
import { ThemedPicker } from '@/components/ThemedPicker';
import { ArrayToDropdownOptions, DegreeTypes, SchoolNames } from '@/constants/Dropdowns';
import { RegistrationValidationRegexes } from '@/constants/Registration';
import { useRegistration } from '@/contexts/RegistrationContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Page1() {
  const { data, setData } = useRegistration();

  return (
    <View style={styles.form}>
      <LabelInput
        label='Email'
        value={data.email}
        onChangeText={(val) => setData({ email: val })}
        keyboardType='email-address'
        returnKeyType='done'
        validationRegex={RegistrationValidationRegexes.email}
      />
      <ThemedPicker
        label='School Name'
        onValueChange={val => setData({ name: val })}
        items={ArrayToDropdownOptions(SchoolNames)}
        value={data.name}
        placeholder={{ label: 'Select a school', value: null }}
      />
      <ThemedPicker
        label='Degree Type'
        onValueChange={val => setData({ degreeType: val })}
        items={ArrayToDropdownOptions(DegreeTypes)}
        value={data.degreeType}
        placeholder={{ label: 'Select a degree type', value: null }}
      />
      <LabelInput
        label='Program'
        value={data.program}
        onChangeText={(val) => setData({ program: val })}
        returnKeyType='done'
        validationRegex={RegistrationValidationRegexes.program}
      />
      <LabelInput
        label='Year'
        value={data.year}
        onChangeText={(val) => setData({ year: val })}
        keyboardType='number-pad'
        returnKeyType='done'
        validationRegex={RegistrationValidationRegexes.year}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1 },
});
