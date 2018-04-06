import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity } from 'react-native';

import Header from './../../components/Header';

export default class GetPetDetails extends Component {
  
  static navigationOptions = {
    title: 'Pet Details',
    headerStyle: {
      backgroundColor: '#D8D8D8',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.welcomeText}>
          Home Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#163250',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  welcomeText: {
    color: 'white',
    fontSize: 30,
    margin: 15,
    textAlign: 'center'
  }
});
