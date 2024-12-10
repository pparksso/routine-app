import { Appearance } from 'react-native';

export const isDarkMode = () => {
  const colorSchema = Appearance.getColorScheme();
  return colorSchema === 'dark';
};
