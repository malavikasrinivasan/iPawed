import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as firebase from 'firebase';

export default class OnboardingQ3 extends Component {
  static navigationOptions = {
    title: 'Pet Set Go!',
    headerTintColor: '#5E0D6E',
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
      notes: ''
    };
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
  firebase.database().ref('userDetails/'+ this.state.userID + '/petDetails/').update({
    behavior: this.state.notes,
  }).then(() => {
    this.props.navigation.navigate('OnboardingQ4', {
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
            <Text style={styles.questionText}>
              {"Do you know of any behavioral characteristics your pet has (e.g. social, anxious, timid, excited, etc.)?"}
            </Text>
            <View style={styles.commentContainer}>
               <TextInput
                 multiline = {true}
                 numberOfLines = {4}
                 style = {styles.commentText}
                 placeholder="Describe here"
                 placeholderTextColor="grey"
                 onChangeText={notes => this.setState({ notes })}
                 value={this.state.notes}
               />
             </View>
          </View>
        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:'row', margin: 15}}>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={[styles.dot, {backgroundColor:'#5E0D6E'}]}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
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
    backgroundColor: '#5E0D6E',
    opacity: 0.15,
    height: 480,
    width: 480,
    borderRadius: 240,
  },
  mainContainer: {
    backgroundColor: '#5E0D6E',
    opacity: 0.35,
    position: 'absolute',
    height: 400,
    width: 400,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    backgroundColor: 'rgb(238,230,240)',
    opacity: 1,
    height: 150,
    width: 260,
    borderRadius: 8,
    alignItems: 'flex-start',
    alignSelf: 'center'
  },
  commentText: {
    flex: 1,
    fontFamily: 'Century Gothic',
    fontSize: 14,
    color: 'black',
    margin: 10,
    marginLeft: 13,
    marginRight: 13,
    width: 234
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 4,
    backgroundColor: 'lightgrey'
  },
  nextContainer: {
    backgroundColor: '#5E0D6E',
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

AppRegistry.registerComponent('OnboardingQ3', () => OnboardingQ3);
