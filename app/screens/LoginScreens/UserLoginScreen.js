import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity, Image } from 'react-native';

import Header from './../../components/Header';

export default class UserLoginScreen extends Component {

  static navigationOptions = {
    title: 'Pet Town',
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
        <Image
        style={styles.logoStyle}
        source={require('./../../img/temp_logo.png')}
        />

        <View>
          <Text style={styles.descriptionText}>
            {"Please enter your email address\nand create a password:\n"}
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.formTextInput}
              placeholder="Name"
              placeholderTextColor='grey'
            />
            <View style={{borderColor: 'lightgrey', borderWidth: 1, alignSelf:'stretch'}}/>
            <TextInput
              style={styles.formTextInput}
              placeholder="E-mail address"
              placeholderTextColor='grey'
              keyboardType='email-address'
            />
            <View style={{borderColor: 'lightgrey', borderWidth: 1, alignSelf:'stretch'}}/>
            <TextInput
              style={styles.formTextInput}
              placeholder="Password"
              placeholderTextColor='grey'
              secureTextEntry={true}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('PetDetails')}>
            <Text style={styles.textButtonStyle}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
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
  descriptionText: {
    color: 'black',
    fontSize: 14,
    marginHorizontal: 30,
    textAlign: 'center',
    fontFamily: 'Century Gothic'
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'lightgrey',
    backgroundColor: '#F0F0F0',
    borderRadius: 7,
  },
  formTextInput: {
    height: 40,
    width: 200,
    fontSize: 14,
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
