/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Register from './screens/register';
import Update from './screens/update';
import Search from './screens/search';
import ViewAll from './screens/viewall';

const tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'register') {
              iconName = 'user-plus'
              size = focused ? 35 : 25
              color = focused ? '#fc8070' : '#555'
            } else if (route.name === 'update') {
              iconName = 'user-edit'
              size = focused ? 35 : 25
              color = focused ? '#fc8070' : '#555'
            } else if (route.name === 'search') {
              iconName = 'search'
              size = focused ? 35 : 25
              color = focused ? '#fc8070' : '#555'
            } else if (route.name === 'viewall') {
              iconName = 'address-book'
              size = focused ? 35 : 25
              color = focused ? '#fc8070' : '#555'
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 10,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 70,
            shadowColor: '#696969',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 10,
          },
          keyboardHidesTabBar: true
        }}
      >
        <tab.Screen
          name='register'
          component={Register}
        ></tab.Screen>
        <tab.Screen
          name='update'
          component={Update}
        ></tab.Screen>
         <tab.Screen
          name='search'
          component={Search}
        ></tab.Screen>
        <tab.Screen
          name='viewall'
          component={ViewAll}
        ></tab.Screen>
      </tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
