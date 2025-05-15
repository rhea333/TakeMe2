import { InfoLabel } from '@/components/forms/InfoLabel';
import { Label } from '@/components/forms/Label';
import { PhotoUpload } from '@/components/forms/PhotoUpload';
import { ThemedMultiPicker } from '@/components/ThemedMultiPicker';
import { ArrayToDropdownOptions, Interests } from '@/constants/Dropdowns';
import { useRegistration } from '@/contexts/RegistrationContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Page3() {
  const { colors } = useTheme();
  const { data, setData } = useRegistration();

  return (
    <View style={styles.form}>
      <InfoLabel text='This section is optional however it is strongly encouraged to fill out to optimize your experience.' />

      <View style={styles.profileContainer}>
        <Text style={[styles.profileLabel, { color: colors.text }]}>Profile Picture</Text>
        {data.pfpUri ?
          <Image
            style={styles.image}
            source={{
              uri: data.pfpUri
            }}
          />
          :
          <Ionicons
            style={styles.image}
            size={100}
            name={'person-circle-outline'}
            color={'grey'}
          />
        }
        <PhotoUpload
          handleFile={file => setData({ pfpUri: file })}
          isSuccessful={data.pfpUri != null}
        />
      </View>

      <Label text='Bio' />
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={100}
        onChangeText={val => setData({ bio: val })}
        value={data.bio}
        style={styles.textInput}
      />

      <ThemedMultiPicker
        label='Interests'
        onValueChange={item => {
          setData({ interests: item });
        }}
        items={ArrayToDropdownOptions(Interests)}
        value={data.interests}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1 },
  profileLabel: {
    fontSize: 20,
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  textInput: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
});
