import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TouchableOpacity, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import {WeeklyProgressRing} from './../../components/WeeklyProgressRing';
import LineChartComp from './../../components/LineChartComp';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';


// console.disableYellowBox = true;
var parse = require('date-fns/parse')
var dateFns = require('date-fns')
var compareAsc = require('date-fns/compare_asc');

export default class WelcomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={24} color={tintColor}/>
        ),
      title: 'Home',
      headerBackTitle: 'back',
      headerLeft: 
        <TouchableOpacity onPress={() => params.refreshPage()}>
          <Image
            source={require("../../icon/refresh.png")}
            style={{height:30, width:30, justifyContent:'center', margin:13}}/>
        </TouchableOpacity>,
      headerTitleStyle: {
        fontFamily: 'Century Gothic',
        fontSize: 22,
        fontWeight: 'normal'
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
    menuOpen: false,
    dataAffectionate: null,
    dataAggressive: null,
    dataAnxious: null,
    dataCalm: null,
    dataExcited: null
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  refreshScreen = () => {
    this.componentDidMount()
  }

  getUserData(userID){
    firebase.database().ref('userDetails/' + userID + '/').once('value')
    .then((snapshot) => {
      this.setState({
        userDetails: snapshot.val()
      });
      // console.log(snapshot.val())
      this.getBehaviouralData(snapshot.val().journalDetails)
    })
    .catch((error) => {
      console.log(error)
      alert("Error")
    })
  }

  getBehaviouralData(journalDetails){
    var dailyBehaviors = {}; 

    for (var key in journalDetails) {
      detail = journalDetails[key]
      journalDate = new Date(detail.eventDate)

      if(Object.keys(dailyBehaviors).includes(journalDate)) {
        existingDate = dailyBehaviors[journalDate]
        existingDate.affectionate_count = existingDate.affectionate_count + (detail.affectionate ? 1 : 0) ;
        existingDate.aggressive_count = existingDate.aggressive_count + (detail.aggressive ? 1 : 0);
        existingDate.anxious_count = existingDate.anxious_count + (detail.anxious ? 1 : 0) ;
        existingDate.calm_count = existingDate.calm_count + (detail.calm ? 1 : 0) ;
        existingDate.excited_count = existingDate.excited_count + (detail.excited ? 1 : 0) ;
      }
      else{
        dailyBehaviors[journalDate] = {
          affectionate_count: detail.affectionate ? 1 : 0,
          aggressive_count: detail.aggressive ? 1 : 0,
          anxious_count: detail.anxious ? 1 : 0,
          calm_count: detail.calm ? 1 : 0,
          excited_count: detail.excited ? 1 : 0 
        }
      }
    }
    all_days = Object.keys(dailyBehaviors)
    all_days = all_days.sort(compareAsc);
    // console.log(all_days)
    // console.log(dateFns.format(all_days[0], 'YYYY-MM-DD'))

    behavioralTrend = {}
    running_affectionate_count = 0
    running_aggressive_count = 0
    running_anxious_count = 0
    running_calm_count = 0
    running_excited_count = 0

    for (var i = 0; i < all_days.length; i++) {
      dailyData = dailyBehaviors[all_days[i]]
      // console.log(dailyData)
      running_affectionate_count = Math.max(running_affectionate_count + (dailyData.affectionate_count == 0 ? -1 : dailyData.affectionate_count), 0)
      running_aggressive_count = Math.max(running_aggressive_count + (dailyData.aggressive_count == 0 ? -1 : dailyData.aggressive_count), 0)
      running_anxious_count = Math.max(running_anxious_count + (dailyData.anxious_count == 0 ? -1 : dailyData.anxious_count), 0)
      running_calm_count = Math.max(running_calm_count + (dailyData.calm_count == 0 ? -1 : dailyData.calm_count), 0)
      running_excited_count = Math.max(running_excited_count + (dailyData.excited_count == 0 ? -1 : dailyData.excited_count), 0)
      
      behavioralTrend[all_days[i]] = {
          affectionate_count: running_affectionate_count,
          aggressive_count: running_aggressive_count,
          anxious_count: running_anxious_count,
          calm_count: running_calm_count,
          excited_count: running_excited_count
        }
    }
    // console.log(behavioralTrend)

    this.parseBehavioralTrend(behavioralTrend)
  }

  parseBehavioralTrend(behavioralTrend){
    data_affectionate = []
    data_aggressive = []
    data_anxious = []
    data_calm = []
    data_excited = []

    for (var key in behavioralTrend) {
      data_affectionate.push({
        value: behavioralTrend[key].affectionate_count,
        date: new Date(key)
      })

      data_aggressive.push({
        value: behavioralTrend[key].aggressive_count,
        date: new Date(key)
      })

      data_anxious.push({
        value: behavioralTrend[key].anxious_count,
        date: new Date(key)
      })

      data_calm.push({
        value: behavioralTrend[key].calm_count,
        date: new Date(key)
      })

      data_excited.push({
        value: behavioralTrend[key].excited_count,
        date: new Date(key)
      })
    }
    this.setState({
      dataAffectionate: data_affectionate,
      dataAggressive: data_aggressive,
      dataAnxious: data_anxious,
      dataCalm: data_calm,
      dataExcited: data_excited
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
      refreshPage: this.refreshScreen
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
    
    var user = firebase.auth().currentUser;
    const userID = user ? user.uid : null;
    const userName = user ? user.displayName : null;    
    if(userID) {
      this.setState({
        userID: user.uid,
        userName: user.displayName
      });
      this.getUserData(userID)
    }

  }

  render() {
    // console.log(this.state.userDetails)
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

          <View style = {{ alignSelf: 'center', marginHorizontal: 5, marginTop: 15, marginBottom: 5 }}>
            <Text style = {styles.weeklyGoalsTitle}> Weekly Goals </Text>
          </View>

          <View style = {styles.weeklyProgressContainer}>
            <WeeklyProgressRing
              completed = { this.state.userDetails.weeklyGoals.trainGoalProgress }
              total = { this.state.userDetails.weeklyGoals.trainGoal }
              completedColor = { 'rgb(214,154,56,1)' }
              blankColor = { 'rgb(214,154,56,0.3)' }
              activityName = { 'Train' }
            />
            <WeeklyProgressRing
              completed = { this.state.userDetails.weeklyGoals.careGoalProgress }
              total = { this.state.userDetails.weeklyGoals.careGoal }
              completedColor = { 'rgb(87,193,170,1)' }
              blankColor = { 'rgb(87,193,170,0.3)' }
              activityName = { 'Care' }
            />
            <WeeklyProgressRing
              completed = { this.state.userDetails.weeklyGoals.playGoalProgress }
              total = { this.state.userDetails.weeklyGoals.playGoal }
              completedColor = { 'rgb(207,65,83,1)' }
              blankColor = { 'rgb(207,65,83,0.3)' }
              activityName = { 'Play' }
            />
            <WeeklyProgressRing
              completed = { this.state.userDetails.weeklyGoals.calmGoalProgress }
              total = { this.state.userDetails.weeklyGoals.calmGoal }
              completedColor = { 'rgb(91,13,107,0.9)' }
              blankColor = { 'rgb(91,13,107,0.3)' }
              activityName = { 'Calm' }
            />
          </View>

          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch', marginTop: 15}}/>

          <View style = {{ flex:1 }}>
            <ScrollView
            horizontal={true}>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Affectionate </Text>
                </View>
                <LineChartComp 
                  data = {this.state.dataAffectionate}
                  colorLine = '#fca903'
                  colorFill = '#ffeecc'
                />
              </View>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Aggressive </Text>
                </View>
                <LineChartComp 
                  data = {this.state.dataAggressive}
                  colorLine = '#CC2539'
                  colorFill = '#f7c0c7'
                />
              </View>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Anxious </Text>
                </View>
                <LineChartComp 
                  data = {this.state.dataAnxious}
                  colorLine = '#78037c'
                  colorFill = '#f6cff7'
                />
              </View>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Content </Text>
                </View>
                <LineChartComp 
                  data = {this.state.dataCalm}
                  colorLine = '#6592CC'
                  colorFill = '#dbe9fc'
                />
              </View>

              <View>
                <View style={{ flex: 0.3 }}>
                  <Text style = {styles.graphTitle}> Behavioral Trend: Excited </Text>
                </View>
                <LineChartComp 
                  data = {this.state.dataExcited}
                  colorLine = '#5AC8B0'
                  colorFill = '#d6f9f2'
                />
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
    fontFamily: 'Century Gothic'
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
    borderWidth: 0,
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
    textAlign: 'center',
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
