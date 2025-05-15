import { Label } from '@/components/forms/Label';
import { ThemedButton } from '@/components/ThemedButton';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ApprovalRequired() {
  const { colors } = useTheme();
  const router = useRouter();

  const goToLogin = () => {
    router.replace(`/`);
  }

  return (
    <View style={styles.form}>
      <Label text='Please check email for approval. This can take 3-5 business days' />
      <ThemedButton
        onPress={goToLogin}
        text='Go to Login'
        style={styles.button}
        fontSize={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1 },
  button: {
    paddingVertical: 20,
    backgroundColor: '#5db34e',
    borderRadius: 150,
    marginBottom: 16,
  },
});
