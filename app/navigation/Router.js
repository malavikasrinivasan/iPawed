import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import TabNav from './TabNav'
import WelcomeScreen from './../screens/LoginScreens/WelcomeScreen';
import UserLoginScreen from './../screens/LoginScreens/UserLoginScreen';
import UserSignupScreen from './../screens/LoginScreens/UserSignupScreen';
import GetPetDetails from './../screens/LoginScreens/GetPetDetails';
import AboutScreen from './../screens/LoginScreens/AboutScreen';

const RootStack = StackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
  	UserLogin: { screen: UserLoginScreen },
    UserSignup: { screen: UserSignupScreen },
  	PetDetails: { screen: GetPetDetails },
  	TabNav: {
  	  screen: TabNav,
  	  navigationOptions: {
	    header: null
  	  }
    },
    AboutScreen: { screen: AboutScreen}
  },
  {
    initialRouteName: 'Welcome',
  }
);


export default class Router extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}
