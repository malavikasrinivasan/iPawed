import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';

export default class OnboardingQ5 extends Component {
  static navigationOptions = {
    title: 'Pet Set Go!',
    headerTintColor: '#D74456',
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
  };

  constructor(props){
    super(props);
    this.state = {
      opt1: this.props.navigation.state.params.opt1,
      opt2: this.props.navigation.state.params.opt2,
      opt3: this.props.navigation.state.params.opt3,
      opt4: this.props.navigation.state.params.opt4,
      notificationTime: '6:00 pm',
    };

    if (this.state.opt1){
      this.timeplaceholder = '8:00 am';
      this.state.notificationTime = this.timeplaceholder;
    }
    else if (this.state.opt2) {
      this.timeplaceholder = '12:00 pm';
      this.state.notificationTime = this.timeplaceholder;
    }
    else if (this.state.opt3) {
      this.timeplaceholder = '6:00 pm';
      this.state.notificationTime = this.timeplaceholder;
    }
    else if (this.state.opt4) {
      this.timeplaceholder = '9:00 pm';
      this.state.notificationTime = this.timeplaceholder;
    }
  }

  componentDidMount(){
      const { params } = this.props.navigation.state;
      const userID = params ? params.userID : null;
      const userName = params ? params.userName : null;
      this.setState({
          userID: params.userID,
          userName: params.userName
      });
  }

  updateProfile() {
  firebase.database().ref('userDetails/'+ this.state.userID + '/ownerInfo/').update({
    notificationTime : this.state.notificationTime,
  }).then(() => {
    this.props.navigation.navigate('Home', {
    userID: this.state.userID,
    userName: this.state.userName
  });
  }).catch((error) => {
    alert(error)
  });
}

  render(){
    return(
      <View style={styles.screenContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.backgroundContainer}/>
          <View style={styles.mainContainer}/>
          <View style={{position:'absolute'}}>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={[styles.optionContainer, this.state.opt1 && styles.optionSelected]}>
                  <Text style={styles.optionText}>
                    {"Morning"}
                  </Text>
                </View>
                <View style={[styles.optionContainer, this.state.opt2 && styles.optionSelected]}>
                  <Text style={styles.optionText}>
                    {"Afternoon"}
                  </Text>
                </View>
                <View style={[styles.optionContainer, this.state.opt3 && styles.optionSelected]}>
                  <Text style={styles.optionText}>
                    {"Evening"}
                  </Text>
                </View>
                <View style={[styles.optionContainer, this.state.opt4 && styles.optionSelected]}>
                  <Text style={styles.optionText}>
                    {"Night"}
                  </Text>
                </View>
            </View>
            <Text style={styles.questionText}>
              {"Great! We'll send you reminders at:"}
            </Text>
            <DatePicker
              mode="time"
              placeholder={this.timeplaceholder}
              date={this.state.notificationTime}
              format="h:mm a"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                alignSelf: 'center',
                alignContent:'center',
                height:30,
                width:100,
                backgroundColor:'#D74456',
                borderRadius: 5,
                flex: 1,
                justifyContent: 'center'
              }}
              showIcon={true}
              iconComponent={
                <Icon name='chevron-down' size={14} style={styles.chevron} />
              }
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
                  fontFamily: "Century Gothic",
                  color: 'white',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold'
                },
                placeholderText: {
                  fontFamily: "Century Gothic",
                  color: 'white',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }
              }}
              onDateChange={(date) => {this.setState({notificationTime: date})}}
            />

          </View>
        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:'row', margin: 15}}>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={[styles.dot, {backgroundColor:'#D74456'}]}/>
            </View>
            <TouchableOpacity
              style={styles.nextContainer}
              onPress={() => this.updateProfile()}>
              <Text style={styles.nextText}>
                {"NEXT"}
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
    backgroundColor: '#D74456',
    opacity: 0.15,
    height: 480,
    width: 480,
    borderRadius: 240,
  },
  mainContainer: {
    backgroundColor: '#D74456',
    opacity: 0.35,
    position: 'absolute',
    height: 400,
    width: 400,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    backgroundColor: '#D74456',
    opacity: 0.5,
    height: 80,
    width: 80,
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionSelected: {
    opacity: 1,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 4,
    backgroundColor: 'lightgrey'
  },
  chevron: {
    color: 'white',
    margin: 5
  },
  nextContainer: {
    backgroundColor: '#D74456',
    height: 50,
    width: 500,
    justifyContent: 'center'
  },
  questionText: {
    fontFamily: 'Century Gothic',
    fontSize: 17,
    color: '#163250',
    textAlign: 'center',
    margin: 20
  },
  optionText: {
    fontFamily: 'Century Gothic',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  nextText: {
    fontFamily: 'Century Gothic',
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
  },
  skipText: {
    fontFamily: 'Century Gothic',
  }
});

AppRegistry.registerComponent('OnboardingQ5', () => OnboardingQ5);
