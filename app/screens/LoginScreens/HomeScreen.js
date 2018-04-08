import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../../components/Header';

export default class GetPetDetails extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name="home" size={24} color={tintColor}/>
      ),
    title: 'Home',
    headerLeft: null,
    headerTitleStyle: {
      fontFamily: 'SignPainter',
      fontSize: 28
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
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  welcomeText: {
    color: 'black',
    fontSize: 30,
    margin: 15,
    textAlign: 'center',
    fontFamily: "Century Gothic"
  }
});
