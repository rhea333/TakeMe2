import { Label } from '@/components/forms/Label';
import { ThemedButton } from '@/components/ThemedButton';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Page5() {
  const { colors } = useTheme();
  const { finishRegistration } = useRegistration();
  const router = useRouter();
  const [error, setError] = useState('');

  const registerAndNavigate = async () => {
    const error = await finishRegistration();
    if (error) {
      setError(error);
    } else {
      router.replace(`/approval_required`);
    }
  }

  return (
    <View style={styles.form}>
      <Label text='[PLACEHOLDER FOR STRIPE LOAD BUTTON]' />
      <View style={styles.container}>
        <ThemedButton
          onPress={registerAndNavigate}
          text='Finish Registration'
          style={styles.button}
          fontSize={30}
        />
      </View>
      {error && <Text style={[styles.errorText, { color: colors.text }]}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1 },
  container: {
    marginTop: 100,
  },
  button: {
    paddingVertical: 20,
    backgroundColor: '#5db34e',
    borderRadius: 150,
    marginBottom: 16,
  },
  errorText: {
    backgroundColor: 'indianred',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16
  },
});
