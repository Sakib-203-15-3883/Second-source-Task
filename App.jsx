import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigation from './screens/MainNavigation';
import {ThemeProvider} from './ThemeContext';
import ThemedStatusBar from './components/ThemedStatusBar';
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <ThemedStatusBar />
        <MainNavigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
