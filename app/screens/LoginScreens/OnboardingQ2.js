import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

export default class OnboardingQ2 extends Component {
  static navigationOptions = {
    title: 'Pet Set Go!',
    headerTintColor: '#DFA13A',
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
      opt5: false
    };
    this.toggleOpt1 = this.toggleOpt1.bind(this);
    this.toggleOpt2 = this.toggleOpt2.bind(this);
    this.toggleOpt3 = this.toggleOpt3.bind(this);
    this.toggleOpt4 = this.toggleOpt4.bind(this);
    this.toggleOpt5 = this.toggleOpt5.bind(this);
  }

  toggleOpt1() {
    if (!this.state.opt1){
      this.setState({opt5: false});
    }
    this.setState({opt1: !this.state.opt1});
  }

  toggleOpt2() {
    if (!this.state.opt2){
      this.setState({opt5: false});
    }
    this.setState({opt2: !this.state.opt2});
  }

  toggleOpt3() {
    if (!this.state.opt3){
      this.setState({opt5: false});
    }
    this.setState({opt3: !this.state.opt3});
  }

  toggleOpt4() {
    if (!this.state.opt4){
      this.setState({opt5: false});
    }
    this.setState({opt4: !this.state.opt4});
  }

  toggleOpt5() {
    if (!this.state.opt5){
      this.setState({opt1: false});
      this.setState({opt2: false});
      this.setState({opt3: false});
      this.setState({opt4: false});
    }
    this.setState({opt5: !this.state.opt5});
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
        && !this.state.opt3
        && !this.state.opt4
        && !this.state.opt5)
    {
      alert("Please select a choice (guessing is fine!)")
      return
    }
  firebase.database().ref('userDetails/'+ this.state.userID + '/petDetails/training').set({
    name: this.state.opt1,
    potty: this.state.opt2,
    leash: this.state.opt3,
    commands: this.state.opt4
  }).then(() => {
    this.props.navigation.navigate('OnboardingQ3', {
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
              {"To the best of your knowledge, does your pet have any of these basic skills?"}
            </Text>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.toggleOpt1}>
                  <View style={[styles.optionContainer, this.state.opt1 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Responds to name"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleOpt2}>
                  <View style={[styles.optionContainer, this.state.opt2 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Potty trained"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleOpt3}>
                  <View style={[styles.optionContainer, this.state.opt3 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Can walk on a leash"}
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.toggleOpt4}>
                  <View style={[styles.optionContainer, this.state.opt4 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Basic commands (sit, stay, etc)"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleOpt5}>
                  <View style={[styles.optionContainer, this.state.opt5 && styles.optionSelected]}>
                    <Text style={styles.optionText}>
                      {"Nope,\nteach me everything!"}
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
              <View style={[styles.dot, {backgroundColor:'#DFA13A'}]}/>
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
    backgroundColor: '#DFA13A',
    opacity: 0.15,
    height: 480,
    width: 480,
    borderRadius: 240,
  },
  mainContainer: {
    backgroundColor: '#DFA13A',
    opacity: 0.35,
    position: 'absolute',
    height: 400,
    width: 400,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    backgroundColor: '#DFA13A',
    opacity: 0.5,
    height: 70,
    width: 100,
    borderRadius: 8,
    margin: 5,
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
    backgroundColor: '#DFA13A',
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
    fontSize: 14,
    textAlign: 'center',
    margin: 5
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

AppRegistry.registerComponent('OnboardingQ2', () => OnboardingQ2);
