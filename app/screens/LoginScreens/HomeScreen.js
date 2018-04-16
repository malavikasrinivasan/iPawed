import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../../components/Header';
import * as firebase from 'firebase';


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

  state = {
    userID:'',
    userName:'',
    userDetails: null
  }


  getUserData(userID){
    firebase.database().ref('userDetails/' + userID + '/').once('value')
    .then((snapshot) => {
      this.setState({
        userDetails: snapshot.val()  
      });
      // console.log(snapshot.val())
    })
    .catch((error) => {
      alert("Error")
    })
    
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

    const { params } = this.props.navigation.state;
    const userID = params ? params.userID : null;
    const userName = params ? params.userName : null;
    if(userID) {
      this.setState({
        userID: params.userID,
        userName: params.userName
      });
      this.getUserData(userID)
    }
    
  }

  render() {

    // if (!this.props.navigation.state.params) {
    //   return null;
    // }

    // const { params } = this.props.navigation.state;
    // const userID = params ? params.userID : null;
    // const userName = params ? params.userName : null;
    // console.log(userID, userName)

    if (!this.state.userDetails) {
      return (
        <ActivityIndicator size='large' />
        );
    }
    console.log(this.state.userDetails)
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.welcomeText}>
          Welcome {this.state.userName}
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
