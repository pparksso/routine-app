import { StyleSheet } from 'react-native';
import { isDarkMode } from '@/composables/color';

export const container = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: isDarkMode() ? '#000' : '#fff',
  },
});
