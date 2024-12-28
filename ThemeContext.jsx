import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar'; // Import the package

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
    card: '#f8f9fa',
    border: '#e0e0e0',
    primary: '#6200ee',
    tabBackground: '#ffffff',
    tabIconDefault: '#888888',
    tabIconSelected: '#6200ee',
    cardBackground: '#f5f5f5',
    drawerBackground: '#ffffff',
    drawerItemText: '#000000',
    drawerActiveItem: '#ACC8E5',
    drawerInactiveItem: '#f0f0f0',
    drawerActiveText: '#ffffff',
    drawerInactiveText: '#888888',
    buttonFocused: '#d1e7ff',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#FFFFFF',
    card: '#1f1f1f',
    border: '#333333',
    primary: '#bb86fc',
    tabBackground: '#1f1f1f',
    tabIconDefault: '#888888',
    tabIconSelected: '#bb86fc',
    cardBackground: '#2c2c2c',
    drawerBackground: '#1f1f1f',
    drawerItemText: '#ffffff',
    drawerActiveItem: '#bb86fc',
    drawerInactiveItem: '#333333',
    drawerActiveText: '#121212',
    drawerInactiveText: '#aaaaaa',
    buttonFocused: '#37474f',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [themeMode, setThemeMode] = useState('device');
  const [customTheme, setCustomTheme] = useState(
    systemTheme === 'dark' ? CustomDarkTheme : LightTheme
  );

  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('themeMode');
      if (storedTheme) {
        setThemeMode(storedTheme);
        updateTheme(storedTheme, systemTheme);
      } else {
        setThemeMode('device');
        updateTheme('device', systemTheme);
      }
    };
    loadStoredTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'device') {
        updateTheme('device', colorScheme);
      }
    });

    return () => listener.remove();
  }, [themeMode, systemTheme]);

  const updateTheme = (mode, systemTheme) => {
    if (mode === 'device') {
      const selectedTheme = systemTheme === 'dark' ? CustomDarkTheme : LightTheme;
      setCustomTheme(selectedTheme);
      updateNavigationBar(selectedTheme); // Update navigation bar color
    } else if (mode === 'dark') {
      setCustomTheme(CustomDarkTheme);
      updateNavigationBar(CustomDarkTheme); // Update navigation bar color
    } else {
      setCustomTheme(LightTheme);
      updateNavigationBar(LightTheme); // Update navigation bar color
    }
  };

  const updateNavigationBar = (theme) => {
    const barColor = theme.colors.tabBackground; // Get the tabBackground color from the selected theme
    const statusBarStyle = theme === CustomDarkTheme ? 'light' : 'dark'; // Decide the status bar style based on theme

    // Set the navigation bar color using SystemNavigationBar
    SystemNavigationBar.setNavigationColor(barColor, statusBarStyle);
  };

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('themeMode', mode);
    updateTheme(mode, systemTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, customTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
