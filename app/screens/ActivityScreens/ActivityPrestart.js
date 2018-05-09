import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        ListView,
        TouchableOpacity,
        Image,
        ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivityDetail from './ActivityDetail';
import ActivityRecord from './ActivityRecord';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import {WeeklyProgressRing} from './../../components/WeeklyProgressRing';

export default class ActivityPrestart extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarIcon: ({tintColor}) => (
          <Icon name="paw" size={24} color={tintColor}/>
        ),
      title: 'Activities',
      headerTintColor: '#5AC8B0',
      headerBackTitle: 'back',
      headerBackTitleStyle: {
        fontFamily: 'Century Gothic'
      },
      headerTitleStyle: {
        fontFamily: 'Century Gothic',
        fontSize: 22,
        color: 'black',
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
    menuOpen: false,
    eventTitle : '',
    eventNotes : '',
    eventLocation : '',
    eventDate : '',
    imageUrl : '',
    image: null,
    imageUpload: false,
    behavior1: false,
    behavior2: false,
    behavior3: false,
    behavior4: false,
    behavior5: false,
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  _activityStart = () => {
    const {params} = this.props.navigation.state;
    const recActID = params.item.title.replace(" ","") + new Date().getUTCFullYear() + new Date().getUTCMonth() + new Date().getUTCDate() + new Date().getUTCHours() + new Date().getUTCMinutes() + new Date().getUTCSeconds();
    startDate = new Date();
    this.setState({actStartDate: startDate});
    firebase.database().ref('userDetails/'+ params.userID + '/recentActivities/' + recActID + '/' ).set({
      title : params.item.title,
        category : params.item.category,
        status: "In Progress",
        behavioralMarker: {Anxious: this.state.behavior1,
                           Aggressive: this.state.behavior2,
                           Calm: this.state.behavior3,
                           Excited: this.state.behavior4,
                           Affectionate: this.state.behavior5 },
        activityStartDate: Date.now(),
        activityCompleteDate: "",
        image: "",
        journalID: "",
        item: {title: params.item.title,
               category: params.item.category,
               desc: params.item.desc,
               steps: params.item.steps,
               imageurl: params.item.imageurl,
               video: params.item.video},
        order: (1-Number(Date.now()))
      // title : params.item.title,
      // category : params.item.category,
      // status: "In Progress",
      // activityStartDate: Date.now(),
      // activityCompleteDate: "",
      // journal: {journalID: "",
      //           eventTitle : this.state.eventTitle,
      //           eventDate : this.state.eventDate,
      //           eventLocation: this.state.eventLocation,
      //           eventNotes: this.state.eventNotes,
      //           imageURL: this.state.imageUrl,
      //           anxious: this.state.behavior1,
      //           aggressive: this.state.behavior2,
      //           calm: this.state.behavior3,
      //           excited: this.state.behavior4,
      //           affectionate: this.state.behavior5}
    });
    this.props.navigation.navigate('ActivityRecord', {item:params.item, userID:params.userID, petName:this.state.petName, recActID:recActID, startDate:Date.now()})
  }

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });
    const user = firebase.auth().currentUser;
    const userID = user ? user.uid : null;

    if(userID) {
      this.setState({
        userID: userID,
      });
    }

    firebase.database().ref('userDetails/' + userID + '/').on('value', (snap) => {
        // console.log('snap', snap.val().petName);
        this.setState({
          petName: snap.val().petDetails.petName,
          trainGoal: snap.val().weeklyGoals.trainGoal,
          trainGoalProgress: snap.val().weeklyGoals.trainGoalProgress,
          careGoal: snap.val().weeklyGoals.careGoal,
          careGoalProgress: snap.val().weeklyGoals.careGoalProgress,
          playGoal: snap.val().weeklyGoals.playGoal,
          playGoalProgress: snap.val().weeklyGoals.playGoalProgress,
          calmGoal: snap.val().weeklyGoals.calmGoal,
          calmGoalProgress: snap.val().weeklyGoals.calmGoalProgress
        })
    });
  }

  constructor(props){
      super(props);
      this._onPress = this._onPress.bind(this);
      this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
  }

  render() {
    const {params} = this.props.navigation.state;
    const item = params.item;
    const userID = params.userID;
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

        <View style={styles.descriptionContainer}>
          <ImageBackground
            style={styles.image}
            source={{uri: item.imageurl}}>
            <View style={{justifyContent:'flex-end', flex: 1}}>
              <Text style={styles.activityTitle}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{borderColor: 'lightgrey', borderWidth: 0.5, alignSelf:'stretch'}}/>

        <View style = {{ alignSelf: 'center', marginHorizontal: 5, marginTop: 10, marginBottom: 6 }}>
          <Text style = {styles.weeklyGoalsTitle}> Weekly Goals with {this.state.petName} </Text>
          <Text style = {[styles.weeklyGoalsTitle, {fontSize:14, marginTop:-5, marginBottom:5}]}> {"April 15 - April 21, 2018"} </Text>
        </View>
          <View style = {styles.weeklyProgressContainer}>
            <WeeklyProgressRing
              completed = { this.state.trainGoalProgress }
              total = { this.state.trainGoal }
              completedColor = { 'rgb(214,154,56,1)' }
              blankColor = { 'rgb(214,154,56,0.3)' }
              activityName = { 'Train' }
            />
            <WeeklyProgressRing
              completed = { this.state.careGoalProgress }
              total = { this.state.careGoal }
              completedColor = { 'rgb(87,193,170,1)' }
              blankColor = { 'rgb(87,193,170,0.3)' }
              activityName = { 'Care' }
            />
            <WeeklyProgressRing
              completed = { this.state.playGoalProgress }
              total = { this.state.playGoal }
              completedColor = { 'rgb(207,65,83,1)' }
              blankColor = { 'rgb(207,65,83,0.3)' }
              activityName = { 'Play' }
            />
            <WeeklyProgressRing
              completed = { this.state.calmGoalProgress }
              total = { this.state.calmGoal }
              completedColor = { 'rgb(91,13,107,0.9)' }
              blankColor = { 'rgb(91,13,107,0.3)' }
              activityName = { 'Calm' }
            />
          </View>
          <View style={{borderColor: 'lightgrey', borderWidth: 0.5, alignSelf:'stretch', marginTop:15, marginBottom: 15}}/>

        <TouchableOpacity
          style={styles.startbutton}
          onPress={this._activityStart.bind(this)}>
          {/* onPress={() => this.props.navigation.navigate('ActivityRecord', {item:item, userID:userID, petName:this.state.petName})}> */}
          <Text style={styles.startbuttontext}> </Text>
          <Text style={styles.startbuttontext}>START</Text>
          <Text style={styles.startbuttontext}> </Text>
        </TouchableOpacity>

        <Text style={[styles.subheader, {fontSize:18, textAlign:'center'}]}>
          {"Don't forget to take a photo!"}
        </Text>

      </View>
      </Drawer>
    );
  }
  _onPress() {
    this.props.navigation.navigate('ActivityDetail');
  }

  _onLeftButtonPress() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: "Century Gothic"
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  header: {
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 24,
    textAlign: 'center'
  },
  subheader: {
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 12,
    margin: 15,
    textAlign: 'left'
  },
  image: {
    width: 380,
    height: 220,
    // alignSelf: 'center'
  },
  textlink: {
    color: 'black',
    fontFamily: 'Century Gothic',
    fontSize: 14,
    textAlign: 'center'
  },
  buttonStyle: {
    width: 130,
    backgroundColor: '#5AC8B0',
    borderRadius: 7,
    shadowOffset:{height: 2},
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    alignSelf: 'center',
    margin: 10
  },
  textButtonStyle: {
    margin: 8,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Century Gothic'
  },
  descriptionContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Century Gothic'
    // flexDirection: 'row'
  },
  activityTitle: {
    textAlign: 'center',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 15,
    opacity: 1,
    padding: 5,
    backgroundColor:'rgba(255,255,255,0.8)',
  },
  startbutton: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    backgroundColor: '#5AC8B0',
    borderRadius: 100,
    margin: 5,
    shadowOffset:{height: 3},
    shadowColor: 'grey',
    shadowOpacity: 1.0
  },
  startbuttontext: {
    textAlign: 'center',
    color: 'white',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Century Gothic'
  },
  weeklyProgressContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  weeklyGoalsTitle:{
    textAlign: 'center',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 24,
    padding: 5,
  },
});

AppRegistry.registerComponent('ActivityPrestart', () => ActivityPrestart);
