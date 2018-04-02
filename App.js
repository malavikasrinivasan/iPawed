import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Header from './app/components/Header';
import WelcomeScreen from './app/screens/LoginScreens/WelcomeScreen';
import UserLoginScreen from './app/screens/LoginScreens/UserLoginScreen';
import GetPetDetails from './app/screens/LoginScreens/GetPetDetails';
import HomeScreen from './app/screens/LoginScreens/HomeScreen';
import Activity1 from './app/screens/ActivityScreens/Activity1';
import Activity2 from './app/screens/ActivityScreens/Activity2';
import TimelineScreen from './app/screens/JournalScreens/TimelineScreen';
import AddEventScreen from './app/screens/JournalScreens/AddEventScreen';

const LoginStack = StackNavigator({
  Welcome: { screen: WelcomeScreen },
  UserLogin: { screen: UserLoginScreen },
  PetDetails: { screen: GetPetDetails },
  Home: { screen: HomeScreen },
});

const ActivityStack = StackNavigator({
  Activity1: { screen: Activity1 },
  Activity2: { screen: Activity2 },
});

const JournalStack = StackNavigator({
  Timeline: { screen: TimelineScreen },
  AddEvent: { screen: AddEventScreen },
  initialRouteName: 'Timeline'
});

export default TabNavigator(
  {
    Login: { screen: LoginStack },
    Activity: { screen: ActivityStack },
    Journal: { screen:  JournalStack   }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#5497A7',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);