import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import Header from './../../components/Header';

export default class UserLoginScreen extends Component {

  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  componentDidMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyALmeSOsC45vPnU3UmqEAzIhs_WgVX6NY8",
      authDomain: "ipawedmims18.firebaseapp.com",
      databaseURL: "https://ipawedmims18.firebaseio.com",
      projectId: "ipawedmims18",
      storageBucket: "ipawedmims18.appspot.com",
      messagingSenderId: "828598628543"
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }


  onPressDeveloperSignIn() {
    this.setState({
      authenticating: true,
    });

    const email = 'admin@ipawed.com';
    const password = 'abc1234';

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {this.setState({
      authenticating: false,
      user,
      error: '',
    })
    this.props.navigation.navigate('Home', {
      userID: user.uid,
      userName: user.displayName
    });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      this.setState({
        authenticating: false,
      });
    });

  }


  onPressSignIn() {
    if (this.state.email == ''){
      alert("Please enter a valid Email ID")
      return
    }
    if (this.state.password == ''){
      alert("Please enter a valid Password")
      return
    }

    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {this.setState({
      authenticating: false,
      user,
      error: '',
    })
    this.props.navigation.navigate('Home', {
      userID: user.uid,
      userName: user.displayName
    });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      this.setState({
        authenticating: false,
      });
    });

  }

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

    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <View style={styles.screenContainer}>
        <Image
        style={styles.logoStyle}
        source={require('./../../img/temp_logo.png')}
        />

        <View>
          <Text style={styles.descriptionText}>
            {"Let's get you signed in!\n"}
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.formTextInput}
              placeholder="E-mail address"
              placeholderTextColor='grey'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect='false'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <View style={{borderColor: 'lightgrey', borderWidth: 1, alignSelf:'stretch'}}/>
            <TextInput
              style={styles.formTextInput}
              placeholder="Password"
              placeholderTextColor='grey'
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={ () => this.onPressSignIn() }>
            <Text style={styles.textButtonStyle}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.descriptionText}>
            <Text >
              {"New User? Sign up "}
            </Text>
            <Text
            style = {{ color: 'blue', textDecorationLine: 'underline'}}
            onPress = {() => this.props.navigation.navigate('UserSignup')}
            >
             {"here"}
            </Text>
          </Text>
        </View>

        <View>
          <Text style={styles.descriptionText}>
            <Text >
              {"Developer? Skip "}
            </Text>
            <Text
            style = {{ color: 'blue', textDecorationLine: 'underline'}}
            onPress = {() => this.onPressDeveloperSignIn()}
            >
             {"here"}
            </Text>
          </Text>
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
