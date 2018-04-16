import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TouchableOpacity, Image } from 'react-native';
import Header from './../../components/Header';

console.disableYellowBox = true;

export default class WelcomeScreen extends Component {

  static navigationOptions = {
    title: 'Peternal',
    headerTintColor: '#5AC8B0',
    headerBackTitle: 'back',
    headerBackTitleStyle: {
      fontFamily: 'Century Gothic'
    },
    headerTitleStyle: {
      fontFamily: 'SignPainter',
      fontSize: 28,
      color: 'black'
    },
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.welcomeText}>
          Welcome to Peternal!
        </Text>

        <Image
        style={styles.logoStyle}
        // source={{require: }}
        source={require('./../../img/temp_logo.png')}
        />

        <Text style={styles.descriptionText}>
          We want to help you create a forever relationship with your pet.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('UserLogin')}>
          <Text style={styles.textButtonStyle}>
            {"Let's get started!"}
          </Text>
        </TouchableOpacity>
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
  logoStyle: {
    width:200,
    height:200
  },
  welcomeText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'SignPainter'
  },
  descriptionText: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 30,
    textAlign: 'center',
    fontFamily: 'Century Gothic'
  },
  buttonStyle: {
    width: 130,
    backgroundColor: '#5AC8B0',
    borderRadius: 7,
    shadowOffset:{height: 2},
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    shadowRadius: 2
  },
  textButtonStyle: {
    margin: 8,
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontFamily: 'Century Gothic'
  }
});
