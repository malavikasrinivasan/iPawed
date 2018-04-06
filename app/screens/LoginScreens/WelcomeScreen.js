import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TouchableOpacity, Image } from 'react-native';

import Header from './../../components/Header';

export default class WelcomeScreen extends Component {

  static navigationOptions = {
    title: 'Pet Town!',
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
          Welcome to Pet Town!
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
          onPress={() => this.props.navigation.navigate('UserLogin')}
        >
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
    width:150,
    height:150
  },
  welcomeText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    // fontFamily: 'Century Gothic'
  },
  descriptionText: {
    color: 'black',
    fontSize: 20,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#5AC8B0',
    borderRadius: 7
  },
  textButtonStyle: {
    margin: 8
  }
});
