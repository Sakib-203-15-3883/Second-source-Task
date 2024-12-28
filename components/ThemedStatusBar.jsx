import {StatusBar} from 'react-native';
import { useTheme} from '../ThemeContext';
const ThemedStatusBar = () => {
  const {customTheme} = useTheme();
  return (
    <StatusBar
      backgroundColor={customTheme.colors.background}
      barStyle={customTheme.dark ? 'light-content' : 'dark-content'}
    />
  );
};

export default ThemedStatusBar