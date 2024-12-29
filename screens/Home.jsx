import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { useTheme } from '../ThemeContext'; // Import the custom theme hook
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location to show weather information.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS permissions are handled during setup.
};

const Home = () => {
  const apiKey = 'a9b193d578e7f3dfbb672b03f97d7a36';
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { customTheme } = useTheme(); // Get custom theme colors
  const { colors } = customTheme;

  // Fetch weather data by location (latitude and longitude)
  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      await AsyncStorage.setItem('lastWeatherData', JSON.stringify(response.data)); // Store in AsyncStorage
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Could not fetch weather data.');
    }
  };

  // Fetch stored weather data from AsyncStorage when the app loads
  const loadLastWeatherData = async () => {
    try {
      const storedWeather = await AsyncStorage.getItem('lastWeatherData');
      if (storedWeather) {
        setWeatherData(JSON.parse(storedWeather));
      }
    } catch (error) {
      console.log('Failed to load weather data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadLastWeatherData(); // Load the last weather data on app load

    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Location permission is required to fetch weather data.');
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.log(error);
          Alert.alert('Error', 'Could not get your location.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    getLocation();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Weather Information Based on Your Current location</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        weatherData && (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.weatherText, { color: colors.text }]}>City: {weatherData.name}</Text>
            <Text style={[styles.weatherText, { color: colors.text }]}>Temperature: {weatherData.main.temp}°C</Text>
            <Text style={[styles.weatherText, { color: colors.text }]}>Condition: {weatherData.weather[0].description}</Text>
            <Text style={[styles.weatherText, { color: colors.text }]}>Humidity: {weatherData.main.humidity}%</Text>
            <Text style={[styles.weatherText, { color: colors.text }]}>Wind Speed: {weatherData.wind.speed} m/s</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Home;
