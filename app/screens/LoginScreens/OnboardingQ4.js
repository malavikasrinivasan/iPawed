import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

export default class OnboardingQ4 extends Component {
  static navigationOptions = {
    title: 'Pet Set Go!',
    headerTintColor: '#D74456',
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
      opt1: false,
      opt2: false,
      opt3: false,
      opt4: false,
      time: ''
    };
    this.toggleOpt1 = this.toggleOpt1.bind(this);
    this.toggleOpt2 = this.toggleOpt2.bind(this);
    this.toggleOpt3 = this.toggleOpt3.bind(this);
    this.toggleOpt4 = this.toggleOpt4.bind(this);
  }

  toggleOpt1() {
    if (!this.state.opt1){
      this.setState({opt2: false});
      this.setState({opt3: false});
      this.setState({opt4: false});
      this.setState({time: 'morning'});
    }
    this.setState({opt1: !this.state.opt1});
  }

  toggleOpt2() {
    if (!this.state.opt2){
      this.setState({opt1: false});
      this.setState({opt3: false});
      this.setState({opt4: false});
      this.setState({time: 'afternoon'});
    }
    this.setState({opt2: !this.state.opt2});
  }

  toggleOpt3() {
    if (!this.state.opt3){
      this.setState({opt1: false});
      this.setState({opt2: false});
      this.setState({opt4: false});
      this.setState({time: 'evening'});
    }
    this.setState({opt3: !this.state.opt3});
  }

  toggleOpt4() {
    if (!this.state.opt4){
      this.setState({opt1: false});
      this.setState({opt2: false});
      this.setState({opt3: false});
      this.setState({time: 'night'});
    }
    this.setState({opt4: !this.state.opt4});
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
    if (!this.state.opt1
        && !this.state.opt2
        && !this.state.opt3)
    {
      alert("Please select a choice (guessing is fine!)")
      return
    }
  firebase.database().ref('userDetails/'+ this.state.userID + '/ownerInfo/').update({
    preferredTime : this.state.time,
  }).then(() => {
    this.props.navigation.navigate('OnboardingQ5', {
    userID: this.state.userID,
    userName: this.state.userName,
    opt1: this.state.opt1,
    opt2: this.state.opt2,
    opt3: this.state.opt3,
    opt4: this.state.opt4
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
            <Text style={[styles.questionText, {marginTop: -10}]}>
              {"When is your preferred time to do an activity with your new pet?"}
            </Text>
            <Text style={[styles.questionText, {fontSize:13, marginTop:-4}]}>
              {"Setting a routine and building consistent habits\nhelps your pet acclimate to their new home."}
            </Text>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.toggleOpt1}>
                  <View style={[styles.optionContainer, this.state.opt1 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Morning"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleOpt2}>
                  <View style={[styles.optionContainer, this.state.opt2 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Afternoon"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleOpt3}>
                  <View style={[styles.optionContainer, this.state.opt3 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Evening"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleOpt4}>
                  <View style={[styles.optionContainer, this.state.opt4 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Night"}
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:'row', margin: 15}}>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={[styles.dot, {backgroundColor:'#D74456'}]}/>
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

AppRegistry.registerComponent('OnboardingQ4', () => OnboardingQ4);
