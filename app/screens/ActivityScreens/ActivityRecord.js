import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  CameraRoll,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import {Stopwatch} from 'react-native-stopwatch-timer';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {WeeklyProgressRing} from './../../components/WeeklyProgressRing';

import * as firebase from 'firebase';

// import { RNCamera } from 'react-native-camera';
import ProgressCircle from 'react-native-progress-circle';

const today = new Date();

class CommentInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props}
        editable = {true}
        maxLength = {100}
      />
    );
  }
}

export default class ActivityRecord extends Component{

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
        fontFamily: 'SignPainter',
        fontSize: 28,
        color: 'black'
      },
      headerRight:
        <TouchableOpacity onPress={() => params.handleMenuToggle()}>
        <Image
          source={require("../../icon/menu.png")}
          style={{height:16, width:20, justifyContent:'center', margin:13}}/>
        </TouchableOpacity>
    }
  };

  constructor(props){
    super(props);
    this._onFinish = this._onFinish.bind(this);
    this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
    this._onAddPress = this._onAddPress.bind(this);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
      eventTitle : '',
      eventNotes : '',
      eventLocation : '',
      eventDate : new Date(),
      behavior1: false,
      behavior2: false,
      behavior3: false,
      behavior4: false,
      behavior5: false,
      menuOpen: false
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.toggleB1 = this.toggleB1.bind(this);
    this.toggleB2 = this.toggleB2.bind(this);
    this.toggleB3 = this.toggleB3.bind(this);
    this.toggleB4 = this.toggleB4.bind(this);
    this.toggleB5 = this.toggleB5.bind(this);
    this._onAddPress = this._onAddPress.bind(this);
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  toggleStopwatch() {
    const {params} = this.props.navigation.state
    CompleteDate = new Date()
    firebase.database().ref('userDetails/'+ params.userID + '/' + 'recentActivities/' + params.recActID + '/').once('value')
  .then((snapshot) => {
    if (snapshot.val() !== null){
      console.log(params.startDate)
      firebase.database().ref('userDetails/'+ params.userID + '/recentActivities/' + params.recActID + '/' ).set({
        title : params.item.title,
        category : params.item.category,
        status: "Completed",
        behavioralMarker: {Anxious: this.state.behavior1,
                           Aggressive: this.state.behavior2,
                           Calm: this.state.behavior3,
                           Excited: this.state.behavior4,
                           Affectionate: this.state.behavior5 },
        duration: 0,
        activityStartDate: params.startDate,
        activityCompleteDate: CompleteDate,
        image: "",
        distance: "",
        journalID: ""
      });
    }
  });
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  }

  toggleB1() {
    this.setState({behavior1: !this.state.behavior1});
  }

  toggleB2() {
    this.setState({behavior2: !this.state.behavior2});
  }

  toggleB3() {
    this.setState({behavior3: !this.state.behavior3});
  }

  toggleB4() {
    this.setState({behavior4: !this.state.behavior4});
  }

  toggleB5() {
    this.setState({behavior5: !this.state.behavior5});
  }

  _onLeftButtonPress() {
    this.props.navigator.pop();
  }

  _onAddPress() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  };

  // takePicture = async function() {
  //   console.log("Cam")
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options)
  //     console.log(data.uri);
  //   }
  // };

  _onFinish() {
    this.props.navigation.navigate('ActivitySummary');
  };

  componentDidMount(){
    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });

    const user = firebase.auth().currentUser;
    const userID = user ? user.uid : null;
    console.log("uid",userID)

    if(userID) {
      this.setState({
        userID: userID,
      });
    }

    const {params} = this.props.navigation.state
  }

  reset = () => {

    const {params} = this.props.navigation.state;
    firebase.database().ref('userDetails/'+ params.userID + '/' + 'recentActivities/' + params.recActID + '/').once('value')
  .then((snapshot) => {
    if (snapshot.val() !== null){
      firebase.database().ref('userDetails/'+ params.userID + '/' + 'recentActivities/' + params.recActID + '/').remove();
    }
  });
    this.props.navigation.navigate("ActivityMain");
  }

  render(){
    const {params} = this.props.navigation.state;
    
        return(
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
          <View style={styles.box}>

          <View style={{margin:5}}>
            <Text style={styles.addbuttontext}>
              Take {params.petName}'s photo!
            </Text>
            <Text style={styles.addbuttontext}>
            </Text>
            <View style = {styles.uploadContainer}>
              <View style={{flex:0.5}}>
                <TouchableOpacity onPress={this._onAddPress}>
                {/* <TouchableOpacity onPress={this.takePicture.bind(this)}> */}
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image
                      source={require("../../icon/camera.png")}
                      style={{height: 25, width: 25, justifyContent: 'center'}}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.dateContainer, {flexDirection:'row'}]}>
          {/* <Text style={styles.label}>Location</Text> */}
            <GooglePlacesAutocomplete
              placeholder='Location'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}

              getDefaultValue={() => ''}

              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyCYo6KjI8l0Dk_nx-P4w3T_UOUKFyygMXc',
                language: 'en', // language of the results
                types: '(cities)' // default: 'geocode'
              }}

              onChangeText={eventLocation => this.setState({ eventLocation })}
              value={this.state.eventLocation}

              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                description: {
                  fontWeight: 'bold'
                },
                textInput: {
                  color: 'black',
                  fontSize: 14,
                  fontFamily:'Century Gothic'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                }
              }}

              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            />
            
            {/* <Text style={styles.label}>Date</Text> */}
            <DatePicker
            date={this.state.eventDate}
            mode="date"
            placeholder="Date"
            format="YYYY-MM-DD"
            minDate="1990-01-01"
            maxDate={today}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            // iconComponent={<Icon name="calendar" size = {24} color="gray" />}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              btnTextConfirm: {
                color: 'black',
                fontFamily: 'Century Gothic'
              },
              btnTextCancel: {
                color: 'black',
                fontFamily: 'Century Gothic'
              },
              dateText: {
                color: 'black',
                fontFamily: 'Century Gothic'
              }

            }}
            onDateChange={(date) => {this.setState({eventDate: date})}}
            />

        </View>
        
        <View style={styles.screenContainer}>

          <View style={{justifyContent:'center'}}>
          <Text style={styles.subheader}>Weekly activity progress:</Text>
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
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View style={{height: 75}}>
            <Text style={styles.subheader}>Behavior tags:</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{margin:10, marginTop:0}}>
               <TouchableOpacity onPress={this.toggleB1}>
                 <View style={[styles.behavior, {backgroundColor:'#4E0250'}, this.state.behavior1 && styles.bSelect]}/>
               </TouchableOpacity>
               <Text style={styles.tagtext}>Anxious</Text>
              </View>

              <View style={{margin:10, marginTop:0}}>
               <TouchableOpacity onPress={this.toggleB2}>
                 <View style={[styles.behavior, {backgroundColor:'#CC2539'}, this.state.behavior2 && styles.bSelect]}/>
               </TouchableOpacity>
               <Text style={styles.tagtext}>Aggressive</Text>
              </View>

              <View style={{margin:10, marginTop:0}}>
               <TouchableOpacity onPress={this.toggleB3}>
                 <View style={[styles.behavior, {backgroundColor:'#6592CC'}, this.state.behavior3 && styles.bSelect]}/>
               </TouchableOpacity>
               <Text style={styles.tagtext}>Calm</Text>
              </View>

              <View style={{margin:10, marginTop:0}}>
               <TouchableOpacity onPress={this.toggleB4}>
                 <View style={[styles.behavior, {backgroundColor:'#5AC8B0'}, this.state.behavior4 && styles.bSelect]}/>
               </TouchableOpacity>
               <Text style={styles.tagtext}>Excited</Text>
              </View>

              <View style={{margin:10, marginTop:0}}>
               <TouchableOpacity onPress={this.toggleB5}>
                 <View style={[styles.behavior, {backgroundColor:'#C58502'}, this.state.behavior5 && styles.bSelect]}/>
               </TouchableOpacity>
               <Text style={styles.tagtext}>Affectionate</Text>
              </View>
            </View>
           </View>
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View style={styles.commentbox}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              style = {styles.commenttext}
              placeholder="Notes:"
              placeholderTextColor="grey"
            />
          </View>
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity style={styles.startbutton} onPress={this.reset}>
                <Text style={styles.startbuttontext}> </Text>
                <Text style={styles.startbuttontext}>DELETE</Text>
                <Text style={styles.startbuttontext}> </Text>
              </TouchableOpacity>
              <View style={{marginRight:50}} />
              <TouchableOpacity style={styles.finishbutton} onPress={this.toggleStopwatch.bind(this)}>
                <Text style={styles.finishbuttontext}> </Text>
                <Text style={styles.finishbuttontext}>SAVE</Text>
                <Text style={styles.finishbuttontext}> </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </Drawer>
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
  commentbox: {
    backgroundColor: '#F0F0F0',
    // width: 200,
    height: 50,
    // margin: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    alignSelf: 'stretch'
  },
  commenttext: {
    color: 'black',
    fontSize: 12,
    margin: 4,
    fontFamily: 'Century Gothic'
  },
  header: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subheader: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Century Gothic',
    paddingBottom: 5,
    textAlign: 'center'
  },
  startbutton: {
     width: 60,
     height: 60,
     alignSelf: 'center',
     backgroundColor: 'white',
     borderRadius: 100,
     margin: 2,
     shadowOffset:{height: 3},
     shadowColor: 'grey',
     shadowOpacity: 1.0
  },
  finishbutton: {
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
    color: 'black',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Century Gothic'
  },
  finishbuttontext: {
    textAlign: 'center',
    color: 'white',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Century Gothic'
  },
  addimg: {
    // width: 350,
    height: 180,
    alignSelf: 'stretch',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    // margin:10,
    borderColor: 'lightgrey',
    borderWidth: 0.5
  },
  addbuttontext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Century Gothic',
  },
  plustext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    fontFamily: 'Century Gothic',
  },
  behavior: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 0,
    margin: 5,
    opacity: 0.3
  },
  bSelect: {
    borderWidth: 1,
    opacity: 0.8
  },
  tagtext: {
    color: 'black',
    fontSize: 11,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  completedgoal: {
    backgroundColor:'#5AC8B0',
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderRadius: 100,
    margin: 5,
    opacity: 0.8
  },
  remaininggoal: {
    backgroundColor:'white',
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1,
    margin: 5,
    opacity: 0.8
  },
  subheader: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Century Gothic',
    paddingBottom: 5,
    textAlign: 'center'
  },
  label: {
    margin: 10,
    color: 'black',
    fontSize: 18,
    fontFamily:'Century Gothic',
    marginLeft: 40
  },
  box: {
    height: 150,
    alignItems: 'stretch',
    backgroundColor: '#F6F6F6',
    borderColor: '#E0E0E0',
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   },
   dateContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 40
   },
   weeklyProgressContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
})

const handleTimerComplete = () => alert("custom completion function");

const options = {
  text: {
    fontSize: 50,
    fontFamily: 'Century Gothic',
    color: 'black',
    textAlign: 'center'
  }
};

AppRegistry.registerComponent('ActivityRecord', () => ActivityRecord);
