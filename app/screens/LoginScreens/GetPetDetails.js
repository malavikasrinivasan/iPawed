import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity } from 'react-native';

import Header from './../../components/Header';

export default class GetPetDetails extends Component {
  
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
          Let's get your Pet logged in! 
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder="Name"
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Weight"
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Breed"
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Color"
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Gender"
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Date of Adoption"
            placeholderTextColor='black'
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Birthday"
            placeholderTextColor='black'
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={styles.textButtonStyle}>
              Let's Get Started
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
  welcomeText: {
    color: 'black',
    fontSize: 30,
    margin: 15,
    textAlign: 'center'
  },
  formContainer: {
    
  },
  formTextInput: {
    height: 30, 
    width: 300, 
    borderWidth: 0.1, 
    margin: 5, 
    borderColor: 'black'
  },
  buttonStyle: {
    backgroundColor: '#5AC8B0',
    borderRadius: 7
  },
  textButtonStyle: {
    margin: 8
  }
});

