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
import OnboardingQ1 from './../screens/LoginScreens/OnboardingQ1';
import OnboardingQ2 from './../screens/LoginScreens/OnboardingQ2';
import OnboardingQ3 from './../screens/LoginScreens/OnboardingQ3';
import OnboardingQ4 from './../screens/LoginScreens/OnboardingQ4';
import OnboardingQ5 from './../screens/LoginScreens/OnboardingQ5';
import OnboardingSummary from './../screens/LoginScreens/OnboardingSummary';
import AboutScreen from './../screens/LoginScreens/AboutScreen';

const RootStack = StackNavigator(
  {
  	UserLogin: { screen: UserLoginScreen },
    UserSignup: { screen: UserSignupScreen },
  	PetDetails: { screen: GetPetDetails },
    OnboardingQ1: { screen: OnboardingQ1},
    OnboardingQ2: { screen: OnboardingQ2},
    OnboardingQ3: { screen: OnboardingQ3},
    OnboardingQ4: { screen: OnboardingQ4},
    OnboardingQ5: { screen: OnboardingQ5},
    OnboardingSummary: { screen: OnboardingSummary},
  	TabNav: {
  	  screen: TabNav,
  	  navigationOptions: {
	    header: null
  	  }
    },
    AboutScreen: { screen: AboutScreen}
  },
  {
    initialRouteName: 'UserLogin',
  }
);


export default class Router extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}
