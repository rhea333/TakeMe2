// app/registration/_layout.tsx
import { ThemedButton } from '@/components/ThemedButton';
import { RegistrationPageKey, RegistrationPageOrder, RegistrationPageSubtitles } from '@/constants/Registration';
import { RegistrationProvider } from '@/contexts/RegistrationContext';
import { useTheme } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RegistrationLayout() {
  const { colors } = useTheme();
  const segments = useSegments();
  const router = useRouter();

  const currentPage = segments[segments.length - 1] as RegistrationPageKey | undefined;
  const currentIndex = currentPage ? RegistrationPageOrder.indexOf(currentPage) : -1;

  const goNext = () => {
    const nextPage = RegistrationPageOrder[currentIndex + 1];
    if (nextPage) router.navigate(`/registration/${nextPage}`);
  };

  const goBack = () => {
    const prevPage = RegistrationPageOrder[currentIndex - 1];
    if (prevPage) router.navigate(`/registration/${prevPage}`);
  };

  return (
    <RegistrationProvider>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.content}>
          {currentPage && <Text style={[styles.subtitle, { color: colors.text }]}>{RegistrationPageSubtitles[currentPage]}</Text>}
          <Slot />
        </ScrollView>
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          {currentIndex > 0 && (
            <ThemedButton
              onPress={goBack}
              text='Back'
              style={styles.button}
            // disabled={validate(currentPage)}
            />
          )}
          {currentIndex < RegistrationPageOrder.length - 1 &&
            <ThemedButton
              onPress={goNext}
              text='Next'
              style={styles.button}
            />
          }
        </View>
      </View>
    </RegistrationProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  subtitle: { fontSize: 25, fontWeight: '600', marginBottom: 12 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 25,
    borderTopWidth: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
