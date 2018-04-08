import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity } from 'react-native';

import Header from './../../components/Header';

export default class GetPetDetails extends Component {

  static navigationOptions = {
    title: 'Pet Town',
    headerStyle: {
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontFamily: 'SignPainter',
      fontSize: 28
    },
  };

  render() {
    return (
      <View style={styles.screenContainer}>

        <TouchableOpacity style={styles.addimg}>
          <Text style={styles.addbuttontext}>{"Upload your pet's\nphoto!"}</Text>
          <Text style={styles.plustext}>+</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Name: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="name"
              placeholderTextColor='lightgrey'/>
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Breed: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="breed"
              placeholderTextColor='lightgrey'/>
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Color: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="color"
              placeholderTextColor='lightgrey'/>
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Weight: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="weight (lbs)"
              placeholderTextColor='lightgrey'/>
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Gender: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="male/female"
              placeholderTextColor='lightgrey'/>
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Adoption Date: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="mm/dd/yyyy"
              placeholderTextColor='lightgrey'/>
          </View>

          <View style={{height: 35, width: 300}}>
            <View style={{flexDirection: 'row'}}>
              <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
                placeholder="Birthday: "
                placeholderTextColor='black'
                editable={false}/>
              <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
                placeholder="mm/dd/yyyy"
                placeholderTextColor='lightgrey'/>
            </View>
            <Text style={{fontSize:10, fontFamily:"Century Gothic"}}>
              {"(if you're not sure, guess)"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.textButtonStyle}>
            Create profile
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
  welcomeText: {
    color: 'black',
    fontSize: 30,
    margin: 15,
    textAlign: 'center'
  },
  formContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTextInput: {
    flexDirection: 'row',
    height: 35,
    width: 300
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
  },
  addimg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    borderRadius: 7
  },
  addbuttontext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontFamily: 'Century Gothic',
  },
  plustext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    fontFamily: 'Century Gothic',
  }
});
