import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext'; // Import the custom useTheme hook
import Home from './Home';
import Search from './Search';
import About from './About';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  // Use the custom theme from the context
  const { customTheme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: customTheme.colors.tabBackground, // Dynamically set the background color
      }}
      activeColor={customTheme.colors.tabIconSelected} // Selected tab icon color
      inactiveColor={customTheme.colors.tabIconDefault} // Default tab icon color
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="magnify" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="information-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
