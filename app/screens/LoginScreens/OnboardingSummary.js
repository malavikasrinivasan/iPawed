import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';

export default class OnboardingSummary extends Component {
  static navigationOptions = {
    title: 'Pet Set Go!',
    headerTintColor: '#163250',
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

  constructor(props){
    super(props);
    this.state = {
      userID:'',
      userName:'',
      userDetails: null,
      experience:'',
      petName:'',
      daytime:'',
      notificationTime:''
    };
  }

  getUserData(userID){
    firebase.database().ref('userDetails/' + userID + '/').once('value')
    .then((snapshot) => {
      this.setState({
        userDetails: snapshot.val()
      });
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
    const experience = params ? params.ownerInfo.experience : null;
    const petName = params ? params.petDetails.petName : null;
    const daytime = params ? params.ownerInfo.preferredTime : null;
    const notificationTime = params ? params.ownerInfo.notificationTime : null;
    if(userID) {
      this.setState({
        userID: params.userID,
        userName: params.userName,
        experience:params.ownerInfo.experience,
        petName: params.petDetails.petName,
        daytime: params.ownerInfo.preferredTime,
        notificationTime: params.ownerInfo.notificationTime
      });
      this.getUserData(userID)
    }
  }

  render(){
    if (!this.state.userDetails) {
      return (
        <ActivityIndicator size='large' />
        );
    }

    return(
      <View style={styles.screenContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.backgroundContainer}/>
          <View style={styles.mainContainer}/>
          <View style={{position:'absolute'}}>
            <Text style={styles.questionText}>
              {"As a reminder:"}
            </Text>
            <Text style={styles.sumText}>
              {"You have "},{this.state.experience},{" experience with pet ownership (we'll work on that!)"}
            </Text>
            <Text style={styles.sumText}>
              {"You and "},{this.state.petName},{" will usually hang out in the "},{this.state.daytime}}
            </Text>
            <Text style={styles.sumText}>
              {"We'll send reminders to do activities at "},{this.state.notificationTime},{" each day (this can be changed at any point, just go to settings!)"}
            </Text>
          </View>
        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.nextContainer}
              onPress={() => {this.props.navigation.navigate('Home', {
                  userID: this.state.userID,
                  userName: this.state.userName})}}>
              <Text style={styles.nextText}>
                {"FINISH"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'space-around'
  },
  backgroundContainer: {
    backgroundColor: 'lightgrey',
    opacity: 0.15,
    height: 480,
    width: 480,
    borderRadius: 240,
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    opacity: 0.35,
    position: 'absolute',
    height: 400,
    width: 400,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextContainer: {
    backgroundColor: 'lightgrey',
    height: 50,
    width: 500,
    justifyContent: 'center'
  },
  questionText: {
    fontFamily: 'Century Gothic',
    fontSize: 23,
    color: '#163250',
    textAlign: 'center',
    margin: 20
  },
  sumText: {
    fontFamily: 'Century Gothic',
    fontSize: 14,
    color: '#163250',
    textAlign: 'center',
    margin: 20
  },
  nextText: {
    fontFamily: 'Century Gothic',
    color: '#163250',
    textAlign: 'center',
    fontSize: 26,
  },
  skipText: {
    fontFamily: 'Century Gothic',
  }
});

AppRegistry.registerComponent('OnboardingSummary', () => OnboardingSummary);
