import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TouchableOpacity, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import {WeeklyProgressRing} from './../../components/WeeklyProgressRing';
import LineChartComp from './../../components/LineChartComp';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

// console.disableYellowBox = true;

export default class WelcomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    
    return {
      tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={24} color={tintColor}/>
        ),
      title: 'Home',
      headerBackTitle: 'back',
      headerLeft: null,
      headerTitleStyle: {
        fontFamily: 'SignPainter',
        fontSize: 28
      },
      headerRight:
        <TouchableOpacity onPress={() => params.handleMenuToggle()}>
        <Image
          source={require("../../icon/menu.png")}
          style={{height:16, width:20, justifyContent:'center', margin:13}}/>
        </TouchableOpacity>
    }
  };

  state = {
    userID:'',
    userName:'',
    userDetails: null,
    imageUrl: null,
    menuOpen: false
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
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
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });
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
    console.log(this.state.userDetails)
    if (!this.state.userDetails) {
      return (
        <ActivityIndicator size='large' />
        );
    }
    return (
      <Drawer
      ref={(ref) => this._drawer = ref}
      type="overlay"
      side='right'
      content={<ControlPanel navigation={this.props.navigation}/>}
      captureGestures={true}
      acceptTap={true}
      tapToClose={true}
      openDrawerOffset={0.3} // 20% gap on the right side of drawer
      panCloseMask={0.3}
      negotiatePan={true}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
      >
        <View style={styles.screenContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.image}
              source={{uri: this.state.userDetails.petDetails.petPic}}>
              <View style={{justifyContent:'flex-end', flex: 1}}>
                <Text style={styles.imageTitle}>
                  { this.state.userDetails.petDetails.petName } on { this.state.userDetails.petDetails.petAdoptionDate }
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View style = {{ alignSelf: 'flex-start', marginHorizontal: 5, marginTop: 15, marginBottom: 5 }}>
            <Text style = {styles.weeklyGoalsTitle}> Weekly Goals </Text>
          </View>

          <View style = {styles.weeklyProgressContainer}>
            <WeeklyProgressRing 
              completed = { 4 }
              total = { 10 }
              completedColor = { '#e54747' }
              blankColor = { '#f7e1e1' }
              activityName = { 'Train' }
            />
            <WeeklyProgressRing 
              completed = { 3 }
              total = { 5 }
              completedColor = { '#d5e244' }
              blankColor = { '#fbfced' }
              activityName = { 'Care' }
            />
            <WeeklyProgressRing 
              completed = { 1 }
              total = { 3 }
              completedColor = { '#7cff8c' }
              blankColor = { '#edf9ee' }
              activityName = { 'Play' }
            />
            <WeeklyProgressRing 
              completed = { 7 }
              total = { 7 }
              completedColor = { '#8beff4' }
              blankColor = { '#e8fbfc' }
              activityName = { 'Calm' }
            />
          </View>

          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch', marginTop: 15}}/>

          <View style = {{ flex:1 }}>
            <ScrollView
            horizontal={true}>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Anxious </Text>
                </View>
                <LineChartComp />
              </View>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Aggressive </Text>
                </View>
                <LineChartComp />
              </View>  

            </ScrollView>
          </View>          
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // justifyContent: 'center',
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
  },
  weeklyProgressContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
    imageContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row'
  },
  image: {
    width: 380,
    height: 220,
    // alignSelf: 'center'
  },
  imageTitle: {
    textAlign: 'center',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 15,
    opacity: 1,
    padding: 5,
    backgroundColor:'rgba(255,255,255,0.8)',
  },
  weeklyGoalsTitle:{
    textAlign: 'left',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 24,
    padding: 5,
  },
  graphTitle:{
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 16,
    padding: 5,
  }
});
