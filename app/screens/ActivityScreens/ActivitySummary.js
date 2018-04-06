import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        TouchableOpacity} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';


export default class ActivitySummary extends Component {
  constructor(props){
      super(props);
      this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
      this.duration = props.duration;
      this.currentTime = props.currentTime;
  }

  render(){
      return(
      <View style={styles.screenContainer}>
          <View>
            <Text style={styles.header}>TIME</Text>
            <Stopwatch laps start={this.currentTime}
              reset={false}
              options={options}
              getTime={this.currentTime} />
          </View>

          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>ACTIVITY</Text>
                <Text style={styles.subheader}>Bath time</Text>
              </View>
              <View>
                <Text style={[styles.header, {paddingLeft:20,paddingRight:20}]}>DISTANCE</Text>
                <Text style={styles.subheader}>N/A</Text>
              </View>
            </View>
          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>

          <View>
            <Text style={styles.header}>GOAL</Text>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <View style={styles.completedgoal}/>
              <View style={styles.completedgoal}/>
              <View style={styles.remaininggoal}/>
            </View>
            <Text style={styles.subheader}>
              {"\nYou've completed 2 of 3 Activities this week.\nKeep it up!"}
            </Text>

            <Text style={[styles.subheader,{fontSize:10, fontStyle:'italic'}]}>
              {"\nExperts recommend that you do a physical activity\nwith your pet several times a week."}
            </Text>
          </View>


          <View style={{borderColor: 'grey', borderWidth: 0.5, alignSelf:'stretch'}}/>
          <TouchableOpacity style={styles.submitbutton} onPress={this._onRightButtonPress}>
            <Text style={styles.buttontext}> </Text>
            <Text style={styles.buttontext}>SAVE</Text>
            <Text style={styles.buttontext}> </Text>
          </TouchableOpacity>
        </View>
      );
    }

  _onLeftButtonPress() {
    this.props.navigator.pop();
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
    completedgoal: {
      backgroundColor:'#5AC8B0',
      width: 50,
      height: 50,
      alignSelf: 'center',
      borderRadius: 100,
      margin: 5,
      opacity: 0.8
    },
    remaininggoal: {
      backgroundColor:'white',
      width: 50,
      height: 50,
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
    submitbutton: {
      width: 60,
      height: 60,
      alignSelf: 'center',
      backgroundColor: '#5AC8B0',
      borderRadius: 100,
      shadowOffset:{height: 3},
      shadowColor: 'grey',
      shadowOpacity: 1.0
    },
    buttontext: {
      textAlign: 'center',
      color: 'white',
      flexDirection: 'column',
      flex: 1,
      fontSize: 16,
      fontFamily: 'Century Gothic',
    }
  })

  const options = {
    text: {
      fontSize: 50,
      fontFamily: 'Century Gothic',
      color: '#163250',
      textAlign: 'center'
    }
  };

AppRegistry.registerComponent('ActivitySummary', () => ActivitySummary);
