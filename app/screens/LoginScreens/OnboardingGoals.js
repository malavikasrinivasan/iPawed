import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

export default class OnboardingGoals extends Component {
  static navigationOptions = {
    title: 'Pet Set Go!',
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
  };

  constructor(props){
    super(props);
    this.state = {
      opt1: 2,
      opt2: 1,
      opt3: 3,
      opt4: 3,
    };
    this.opt1sub = this.opt1sub.bind(this);
    this.opt1add = this.opt1add.bind(this);
    this.opt2sub = this.opt2sub.bind(this);
    this.opt2add = this.opt2add.bind(this);
    this.opt3sub = this.opt3sub.bind(this);
    this.opt3add = this.opt3add.bind(this);
    this.opt4sub = this.opt4sub.bind(this);
    this.opt4add = this.opt4add.bind(this);

  }

  opt1sub(){
    if (this.state.opt1>0){
      this.setState({opt1: this.state.opt1-1})
    }
  }

  opt1add(){
    this.setState({opt1: this.state.opt1+1})
  }

  opt2sub(){
    if (this.state.opt2>0){
      this.setState({opt2: this.state.opt2-1})
    }
  }

  opt2add(){
    this.setState({opt2: this.state.opt2+1})
  }

  opt3sub(){
    if (this.state.opt3>0){
      this.setState({opt3: this.state.opt3-1})
    }
  }

  opt3add(){
    this.setState({opt3: this.state.opt3+1})
  }

  opt4sub(){
    if (this.state.opt4>0){
      this.setState({opt4: this.state.opt4-1})
    }
  }

  opt4add(){
    this.setState({opt4: this.state.opt4+1})
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
  firebase.database().ref('userDetails/'+ this.state.userID + '/weeklyGoals/').update({
    trainGoal: this.state.opt1,
    careGoal: this.state.opt2,
    playGoal: this.state.opt3,
    calmGoal: this.state.opt4
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
            <Text style={styles.questionText}>
              {"Let's set some weekly activity goals."}
            </Text>
            <Text style={[styles.questionText, {fontSize:13, marginTop:-8}]}>
              {"Here's what we recommend\nfor each category:"}
            </Text>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={[styles.optionContainer, {backgroundColor:'rgb(214,154,56)'}]}>
                  <Text style={styles.optionText}>
                    {"Train"}
                  </Text>
                  <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', flex:0.6}}>
                    <TouchableOpacity style={{flex:0.4}} onPress={this.opt1sub}>
                      <Icon name='md-remove' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                    </TouchableOpacity>
                    <Text style={[styles.optionText, {fontSize:23, color:'#163250', margin:5}]}>
                      {this.state.opt1}
                    </Text>
                    <TouchableOpacity style={{flex:0.4}} onPress={this.opt1add}>
                      <Icon name='md-add' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.optionContainer, {backgroundColor:'rgb(87,193,170)'}]}>
                  <Text style={styles.optionText}>
                    {"Care"}
                  </Text>
                  <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', flex:0.6}}>
                    <TouchableOpacity style={{flex:0.4}} onPress={this.opt2sub}>
                      <Icon name='md-remove' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                    </TouchableOpacity>
                    <Text style={[styles.optionText, {fontSize:23, color:'#163250', margin:5}]}>
                      {this.state.opt2}
                    </Text>
                    <TouchableOpacity style={{flex:0.4}} onPress={this.opt2add}>
                      <Icon name='md-add' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>

            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <View style={[styles.optionContainer, {backgroundColor:'rgb(207,65,83)'}]}>
                <Text style={styles.optionText}>
                  {"Play"}
                </Text>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', flex:0.6}}>
                  <TouchableOpacity style={{flex:0.4}} onPress={this.opt3sub}>
                    <Icon name='md-remove' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                  </TouchableOpacity>
                  <Text style={[styles.optionText, {fontSize:23, color:'#163250', margin:5}]}>
                    {this.state.opt3}
                  </Text>
                  <TouchableOpacity style={{flex:0.4}} onPress={this.opt3add}>
                    <Icon name='md-add' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.optionContainer, {backgroundColor:'rgb(132,72,146)'}]}>
                <Text style={styles.optionText}>
                  {"Calm"}
                </Text>
                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', flex:0.6}}>
                  <TouchableOpacity style={{flex:0.4}} onPress={this.opt4sub}>
                    <Icon name='md-remove' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                  </TouchableOpacity>
                  <Text style={[styles.optionText, {fontSize:23, color:'#163250', margin:5}]}>
                    {this.state.opt4}
                  </Text>
                  <TouchableOpacity style={{flex:0.4}} onPress={this.opt4add}>
                    <Icon name='md-add' style={[styles.optionText, {fontSize:18,color:'#163250'}]}/>
                  </TouchableOpacity>
                </View>
              </View>




            </View>
          </View>
        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection:'row', margin: 15}}>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={styles.dot}/>
              <View style={[styles.dot, {backgroundColor:'#5AC8B0'}]}/>
            </View>
            <TouchableOpacity
              style={styles.nextContainer}
              onPress={() => this.updateProfile()}>
              <Text style={styles.nextText}>
                {"FINISH"}
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
    backgroundColor: 'lightgrey',
    opacity: 0.15,
    height: 480,
    width: 480,
    borderRadius: 240,
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    opacity: 0.35,
    position: 'absolute',
    height: 400,
    width: 400,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    backgroundColor: 'lightgrey',
    opacity: 1,
    height: 100,
    width: 100,
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 4,
    backgroundColor: 'lightgrey'
  },
  nextContainer: {
    backgroundColor: 'lightgrey',
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
    color: '#163250',
    textAlign: 'center',
    fontSize: 26,
  },
  skipText: {
    fontFamily: 'Century Gothic',
  }
});

AppRegistry.registerComponent('OnboardingGoals', () => OnboardingGoals);
