import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, TextInput, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';

export default class GetPetDetails extends Component {

  static navigationOptions = {
    title: 'Peternal',
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
  };

  state = {
    userID:'',
    userName:'',
    petName : '',
    petBreed : '',
    petColor: '',
    petWeight: '',
    petGender: '',
    petAdoptionDate : null,
    petBirthDay : null
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

  _onAddPress() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  uploadPetProfile() {
    console.log(this.state.petAdoptionDate == null)
    console.log(this.state.petBirthDay == null)
    if (this.state.petName == '' 
      || this.state.petBreed == ''
      || this.state.petColor == ''
      || this.state.petWeight == ''
      || this.state.petGender == ''
      || this.state.petAdoptionDate == null
      || this.state.petBirthDay == null
    ){
      alert("All fields are mandatory")
      return
    }



    firebase.database().ref('userDetails/'+ this.state.userID + '/petDetails').set({
      petName : this.state.petName,
      petBreed : this.state.petBreed,
      petColor: this.state.petColor,
      petWeight: this.state.petWeight,
      petGender: this.state.petGender,
      petAdoptionDate : this.state.petAdoptionDate,
      petBirthDay : this.state.petBirthDay
    }).then(() => {
      this.props.navigation.navigate('Home', {
      userID: this.state.userID,
      userName: this.state.userName
    });
    }).catch((error) => {
      alert(error)
    });
  }

  render() {

    return (
      <View style={styles.screenContainer}>

        <TouchableOpacity
          style={styles.addimg}
          onPress={this._onAddPress}>
          <Text style={styles.addbuttontext}>{"Upload your pet's\nphoto!"}</Text>
          <Text style={styles.plustext}>+</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Name: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="name"
              placeholderTextColor='lightgrey'
              autoCorrect='false'
              onChangeText={petName => this.setState({ petName })}
              value={this.state.petName}
              />

          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Breed: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="breed"
              placeholderTextColor='lightgrey'
              autoCorrect='false'
              onChangeText={petBreed => this.setState({ petBreed })}
              value={this.state.petBreed}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Color: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="color"
              placeholderTextColor='lightgrey'
              onChangeText={petColor => this.setState({ petColor })}
              value={this.state.petColor}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Weight: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="weight (lbs)"
              placeholderTextColor='lightgrey'
              autoCorrect='false'
              keyboardType='numeric'
              onChangeText={petWeight => this.setState({ petWeight })}
              value={this.state.petWeight}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder="Gender: "
              placeholderTextColor='black'
              editable={false}/>
            <TextInput style={{fontFamily: "Century Gothic", fontWeight:'bold', flex:0.5}}
              placeholder="male/female"
              placeholderTextColor='lightgrey'
              autoCapitalize='none'
              onChangeText={petGender => this.setState({ petGender })}
              value={this.state.petGender}
              />
          </View>

          <View style={styles.formTextInput}>
            <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
              placeholder={"Adoption Date: "}
              placeholderTextColor='black'
              editable={false}/>
            <DatePicker
              date={this.state.petAdoptionDate}
              mode="date"
              placeholder="yyyy-mm-dd"
              format="YYYY-MM-DD"
              minDate="2010-01-01"
              maxDate="2020-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                flex:0.5
              }}
              showIcon={false}
              iconComponent={<Icon name="calendar" size = {24} color="gray" />}
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
                },
                placeholderText: {
                  fontFamily: "Century Gothic",
                  fontWeight:'bold',
                  color: 'lightgrey'
                }
              }}
              onDateChange={(date) => {this.setState({petAdoptionDate: date})}}
            />
          </View>

          <View style={{height: 35, width: 300}}>
            <View style={{flexDirection: 'row'}}>
              <TextInput style={{fontFamily: "Century Gothic", flex:0.5}}
                placeholder="Birthday: "
                placeholderTextColor='black'
                editable={false}/>

              <DatePicker
                date={this.state.petBirthDay}
                mode="date"
                placeholder="yyyy-mm-dd"
                format="YYYY-MM-DD"
                minDate="2010-01-01"
                maxDate="2020-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={{
                  flex:0.5
                }}
                showIcon={false}
                iconComponent={<Icon name="calendar" size = {24} color="gray" />}
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
                  },
                  placeholderText: {
                    fontFamily: "Century Gothic",
                    fontWeight:'bold',
                    color: 'lightgrey'
                  }
                }}
                onDateChange={(date) => {this.setState({petBirthDay: date})}}
              />

            </View>
            <Text style={{fontSize:10, fontFamily:"Century Gothic"}}>
              {"(if you're not sure, guess)"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={ () => this.uploadPetProfile() }>
          <Text style={styles.textButtonStyle}>
            Create profile
          </Text>
        </TouchableOpacity>
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
  welcomeText: {
    color: 'black',
    fontSize: 30,
    margin: 15,
    textAlign: 'center'
  },
  formContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTextInput: {
    flexDirection: 'row',
    height: 35,
    width: 300
  },
  buttonStyle: {
    width: 130,
    backgroundColor: '#5AC8B0',
    borderRadius: 7,
    shadowOffset:{height: 2},
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    shadowRadius: 2
  },
  textButtonStyle: {
    margin: 8,
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontFamily: 'Century Gothic'
  },
  addimg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    borderRadius: 7
  },
  addbuttontext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontFamily: 'Century Gothic',
  },
  plustext: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    fontFamily: 'Century Gothic',
  }
});
