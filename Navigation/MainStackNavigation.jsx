import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainNavigation from '../screens/MainNavigation';
import Search from '../screens/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainNavigation" component={MainNavigation} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;

const styles = StyleSheet.create({});
