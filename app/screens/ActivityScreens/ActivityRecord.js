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
import {Stopwatch} from 'react-native-stopwatch-timer';
import ActivitySummary from './ActivitySummary'

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
  constructor(props){
    super(props);
    this._onFinish = this._onFinish.bind(this);
    this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
      text: 'Notes:'
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  }

  _onLeftButtonPress() {
    this.props.navigator.pop();
  }

  _onFinish() {
    this.props.navigation.navigate('ActivitySummary');
  }

  render(){
        return(
        <View style={styles.screenContainer}>
          <View style={{paddingTop:15, paddingBottom:15}}>
            <Text style={styles.header}>TIME</Text>
            <Stopwatch laps start={this.state.stopwatchStart}
                reset={this.state.stopwatchReset}
                options={options}
                getTime={this.getFormattedTime} />
          </View>

          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>ACTIVITY</Text>
                <Text style={styles.subheader}>Bath time</Text>
              </View>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>GOAL</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.completedgoal}/>
                  <View style={styles.remaininggoal}/>
                  <View style={styles.remaininggoal}/>
                </View>
              </View>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>DISTANCE</Text>
                <Text style={styles.subheader}>N/A</Text>
              </View>
            </View>
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View style={{flexDirection:'row', paddingTop:10, paddingBottom:10}}>
            <TouchableOpacity style={styles.addimg}>
              <Text style={styles.addbuttontext}>{'add photo'}</Text>
              <Text style={styles.plustext}>+</Text>
            </TouchableOpacity>

            <View style={styles.commentbox}>
               <CommentInput
                 multiline = {true}
                 numberOfLines = {4}
                 style = {styles.commenttext}
                 onChangeText={(text) => this.setState({text})}
                 value={this.state.text}
               />
             </View>

          </View>


          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>
          <View>
            <Text style={styles.subheader}>Select pet behaviors:</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
               <TouchableOpacity onPress={this.behavior1} style={{margin:10}}>
                 <View style={[styles.behavior, {backgroundColor:'#D3B69B'}]}/>
                 <Text style={styles.tagtext}>Calm</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={this.behavior2} style={{margin:10}}>
                 <View style={[styles.behavior, {backgroundColor:'#163250'}]}/>
                 <Text style={styles.tagtext}>Fearful</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={this.behavior3} style={{margin:10}}>
                 <View style={[styles.behavior, {backgroundColor:'#F7C68F'}]}/>
                 <Text style={styles.tagtext}>Happy</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={this.behavior4} style={{margin:10}}>
                 <View style={[styles.behavior, {backgroundColor:'#CC2539'}]}/>
                 <Text style={styles.tagtext}>Joyful</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={this.behavior5} style={{margin:10}}>
                 <View style={[styles.behavior, {backgroundColor:'#F9D64B'}]}/>
                 <Text style={styles.tagtext}>Mellow</Text>
               </TouchableOpacity>
            </View>
           </View>
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>



          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.startbutton} onPress={this.toggleStopwatch}>
                <Text style={styles.startbuttontext}> </Text>
                <Text style={styles.startbuttontext}>{!this.state.stopwatchStart ? "START" : "STOP"}</Text>
                <Text style={styles.startbuttontext}> </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.finishbutton} onPress={this._onFinish}>
                <Text style={styles.finishbuttontext}> </Text>
                <Text style={styles.finishbuttontext}>FINISH</Text>
                <Text style={styles.finishbuttontext}> </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.resetStopwatch}>
              <Text style={styles.subheader}>Reset</Text>
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
  commentbox: {
    backgroundColor: '#F0F0F0',
    width: 200,
    height: 100,
    margin: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.5
  },
  commenttext: {
    color: '#163250',
    fontSize: 12,
    margin: 4,
    fontFamily: 'Century Gothic'
  },
  header: {
    color: '#163250',
    fontSize: 18,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subheader: {
    color: '#163250',
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
    color: '#163250',
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
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    margin:10,
    borderColor: 'lightgrey',
    borderWidth: 0.5
  },
  addbuttontext: {
    textAlign: 'center',
    color: '#163250',
    fontSize: 16,
    fontFamily: 'Century Gothic',
  },
  plustext: {
    textAlign: 'center',
    color: '#163250',
    fontSize: 25,
    fontFamily: 'Century Gothic',
  },
  behavior: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderColor: '#163250',
    borderRadius: 100,
    borderWidth: 1,
    margin: 5,
    opacity: 0.8
  },
  tagtext: {
    color: '#163250',
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
    borderColor: '#163250',
    borderRadius: 100,
    borderWidth: 1,
    margin: 5,
    opacity: 0.8
  },
})

const handleTimerComplete = () => alert("custom completion function");

const options = {
  text: {
    fontSize: 50,
    fontFamily: 'Century Gothic',
    color: '#163250',
    textAlign: 'center'
  }
};

AppRegistry.registerComponent('ActivityRecord', () => ActivityRecord);
