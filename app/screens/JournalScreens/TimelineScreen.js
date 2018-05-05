import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, AppRegistry, Button, Image, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';

import Header from './../../components/Header';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import Timeline from 'react-native-timeline-listview'
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import * as firebase from 'firebase';


export default class TimelineScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Timeline',
       tabBarIcon: ({tintColor}) => (
          <FAIcon name="heart" size={24} color={tintColor}/>
        ),
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


  constructor(){
    super();
    this.onEventPress = this.onEventPress.bind(this)
    this.renderDetail = this.renderDetail.bind(this)

    this.state = {
      userID : '',
      selected: null,
      petName: null,
      timelineData: null,
      menuOpen: false,
      memoryUpdate: false
    };

    // console.log(this.data);
  }

  memoryUpdate = (memoryUpdate) => {
    // this.setState({memoryUpdate})
    console.log(memoryUpdate);
    const firebaseUserID = firebase.auth().currentUser.uid;
    this.setState({userID: firebaseUserID});
    console.log(firebaseUserID);

    var memories = [];

    // getting data from firebase for the timeline
    firebase.database().ref('userDetails/'+ firebaseUserID + '/journalDetails').once("value").then((snapshot) => {
      // console.log(snapshot.val());
      console.log(snapshot.numChildren());
      snapshot.forEach( function(child) {

        console.log(child.val());
        memory = child.val();
        memories.push({

          time: memory.eventDate,
          title: memory.eventTitle,
          description: memory.eventNotes,
          imageUrl: memory.imageURL,
          location: memory.eventLocation,
          anxious: memory.anxious,
          aggressive: memory.aggressive,
          calm: memory.calm,
          excited: memory.excited,
          affectionate: memory.affectionate,
        });
      });

      console.log(length(memories));

      this.setState({
        timelineData : memories
      });

    });

  }



  componentDidMount(){

    this.props.navigation.setParams({
      handleMenuToggle: this.toggleControlPanel,
    });

    const firebaseUserID = firebase.auth().currentUser.uid;
    this.setState({userID: firebaseUserID});
    console.log(firebaseUserID);

    var memories = [];

    // getting pet name
    firebase.database().ref('userDetails/'+ firebaseUserID + '/petDetails').once("value").then((snapshot) => {
      console.log(snapshot.val().petName);
      this.setState({
        petName: snapshot.val().petName
      })
    });


    // getting data from firebase for the timeline
    firebase.database().ref('userDetails/'+ firebaseUserID + '/journalDetails').once("value").then((snapshot) => {
      snapshot.forEach( function(child) {
        // console.log(child.val());
        memory = child.val();
        memories.push({

          time: memory.eventDate,
          title: memory.eventTitle,
          description: memory.eventNotes,
          imageUrl: memory.imageURL,
          location: memory.eventLocation,
          anxious: memory.anxious,
          aggressive: memory.aggressive,
          calm: memory.calm,
          excited: memory.excited,
          affectionate: memory.affectionate,
        });
      });

      this.setState({
        timelineData : memories
      });

  });

  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

    onEventPress(data){
      this.setState({selected: data});
      console.log(data);
      this.props.navigation.navigate('ViewEvent', {eventData: data});
    }

  renderLocation(location) {
    return    <Icon name='ios-pin' size={15} color ="#777">
                <Text style={styles.locationText}> {location}</Text>
              </Icon>
  }

  renderBehaviors(behaviors_on) {
      const circles = [];

      behaviors_on.map(behavior =>
        // console.log(behavior);
        circles.push(
          <View>
          <View style={[styles.behaviorCircle, {backgroundColor:behavior.color}]}/>
          </View>
        )
      )
    return circles

  }



  renderDetail(rowData, sectionID, rowID) {
    let title = null
    var desc = null
    // Checking which behaviors are on.
    var behaviors_on = []
    if(rowData.anxious == true) {
      behaviors_on.push({name : "Anxious", color: "#78037c"})
    }
    if(rowData.aggressive == true) {
      behaviors_on.push({name : "Aggressive", color: "#CC2539"})
    }
    if(rowData.calm == true) {
      behaviors_on.push({name : "Content", color: "#6592CC"})
    }
    if(rowData.excited == true) {
      behaviors_on.push({name : "Excited", color: "#5AC8B0"})
    }
    if(rowData.affectionate == true) {
      behaviors_on.push({name : "Affectionate", color: "#fca903"})
    }
    // console.log(behaviors_on);
    if(rowData.title && rowData.imageUrl)
      desc = (
        <View style={{borderColor:'lightgrey', borderRadius: 10, borderWidth:1,  shadowOffset:{height: 3}, shadowColor: '#ccc', shadowOpacity: 0.0, overflow:'hidden', backgroundColor:'#FCFCFC'}}>
          <View style={{flexDirection: 'row', flex:1}}>
            <View style={{flex:0.5, alignItems: 'stretch'}}>
              <ImageBackground source={{uri: rowData.imageUrl}} style={{width:150,height:150, alignSelf:'stretch'}}>

                <View style={{justifyContent:'flex-end', flex: 1}}>
                  <Text style={styles.imageTitle}>
                    {rowData.time}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={{flex:0.5, justifyContent: 'center', margin: 10, alignItems: 'center'}}>

                  <Text style={[styles.title]}>{rowData.title}</Text>
                  {rowData.location ? this.renderLocation(rowData.location) : null}
                  <Text style={styles.descriptionText}>"{rowData.description}"</Text>
                  <View style={{flex : 0.5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                  {behaviors_on ? this.renderBehaviors(behaviors_on) : null}
                  </View>
            </View>

          </View>




        </View>
      )

    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
      )
  }

  render() {

    if (!this.state.timelineData) {
      return (
        <ActivityIndicator size='large' />
        );
    }

    // console.log("Inside render now!");
    // console.log(this.state.timelineData);

    // if(this.state.memoryUpdate) {
    //   this.componentDidMount()
    // }


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
      <View style={styles.container}>
        <View>
            <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems:'center', marginTop: 10, marginLeft: 10}}>
              <TouchableOpacity>
                <Icon
                  name="ios-add-circle" size = {50} color = "#5AC8B0"
                  style={{justifyContent:'center', shadowOffset:{height: 3}, shadowColor: '#ccc', shadowOpacity: 0.0}}
                  onPress={() => this.props.navigation.navigate('AddEvent', {userID: this.state.userID, onNavigateBack: this.memoryUpdate})}/>
              </TouchableOpacity>
              <View style={{ flex:1 }}>
                <Text style={styles.generalText}>Memories with {this.state.petName} </Text>
              </View>
            </View>
        </View>
        <ScrollView style={styles.timelineContainer} >
          <Timeline
            data = {this.state.timelineData}
            circleSize={15}
            circleColor= '#5AC8B0'
            lineColor='gray'
            lineWidth={1}
            timeContainerStyle={{minWidth:0, marginTop: -5}}
            timeStyle={styles.time}
            titleStyle={styles.title}
            descriptionStyle={styles.textDescription}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'none'}
            // columnFormat='two-column'
            onEventPress={this.onEventPress}
            renderDetail={this.renderDetail}
            showTime = {false}
        />
      </ScrollView>
    </View>
    </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  time: {
    fontSize:16,
    color:'#163250',
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontFamily:'Century Gothic',
    fontWeight: 'bold',
    margin: 5,
    marginLeft:20,
    marginBottom: 0
  },
  title: {
    fontSize: 17,
    color: '#163250',
    opacity: 1.5,
    // fontWeight: 'bold',
    fontFamily:'Century Gothic',
    marginTop: 5,
  },
  descriptionContainer:{
    flexDirection: 'row',
    marginLeft: 10
  },
  textDescription: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 10,
    color:'black',
    fontFamily:'Century Gothic',
    margin: 5,
  },
  generalText: {
    textAlign: 'center',
    fontFamily: 'Century Gothic',
    fontSize: 26,
    color: 'black',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  timelineContainer: {
    flex: 1,
    // alignItems: "center",
    margin: 10
  },
  list: {
    flex: 1,
    margin:20,
  },
  descriptionText: {
    fontFamily: 'Century Gothic',
    color: '#777',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'left'
  },
  image: {
    width: 150,
    height: 150,
    marginTop: -10,
    marginLeft: 0,
  },
  locationText: {
    fontFamily: 'Century Gothic',
    color: '#777',
    fontSize: 12,
    marginTop: 5
  },
  behaviorCircle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1,
    margin: 5,
    opacity: 0.8
  },
  tagtext: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    fontStyle: 'italic'
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

});
