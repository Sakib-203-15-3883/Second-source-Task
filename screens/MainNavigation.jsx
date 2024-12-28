import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer as PaperDrawer } from 'react-native-paper';
import BottomNavigation from './BottomNavigation';
import Settings from './Settings';
import { useTheme } from '../ThemeContext'; // Import the custom hook

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { customTheme } = useTheme(); // Use the theme from context

  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section style={[styles.drawerSection, { backgroundColor: customTheme.colors.drawerBackground }]}>
        <DrawerItem
          label="Weather News"
          icon={({ color, size }) => (
            <Icon name="weather-partly-cloudy" color={color} size={size} />
          )}
          labelStyle={{ color: customTheme.colors.drawerItemText }} // Use dynamic text color
          onPress={() => props.navigation.navigate('Weather News')}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Icon name="cog-outline" color={color} size={size} />
          )}
          labelStyle={{ color: customTheme.colors.drawerItemText }} // Use dynamic text color
          onPress={() => props.navigation.navigate('Settings')}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
};

const MainNavigation = () => {
  const { customTheme } = useTheme(); // Use the theme from context

  return (
    <NavigationContainer theme={customTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: customTheme.colors.drawerBackground, // Use dynamic background color
          },
          drawerActiveTintColor: customTheme.colors.drawerActiveItem, // Active item color
          drawerInactiveTintColor: customTheme.colors.drawerInactiveItem, // Inactive item color
        }}
      >
        <Drawer.Screen name="Weather News" component={BottomNavigation} />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 16,
  },
});
