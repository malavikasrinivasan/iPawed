import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput, DatePickerIOS, TouchableOpacity, Image } from 'react-native';
import { Avatar, SocialIcon, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import Header from './../../components/Header';

export default class AddEventScreen extends Component {

  static navigationOptions = {
    title: 'Timeline',
     tabBarIcon: ({tintColor}) => (
        <Icon name="heart" size={24} color={tintColor} />
      ),
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
    eventTitle : 'Event Title',
    description : '',
    eventDate : new Date()
  }

  handleTitle = (text) => {
    this.setState({eventTitle : text})
  }
  handleDescription = (text) => {
    this.setState({description : text})
  }

  _onCamPress() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  _onLibPress() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          {this.state.eventTitle}
        </Text>

        <View style={styles.box}>
          <View style={{margin:10}}>
            <Text style={styles.subheader}>
              {"Add Peanut's media!\n"}
            </Text>
            <View style = {styles.uploadContainer}>
              <TouchableOpacity
                onPress={this._onCamPress}
                style={{flex:0.5}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Image
                    source={require("../../icon/camera.png")}
                    style={{height: 25, width: 25, justifyContent: 'center'}}/>
                </View>
                <Text style={[styles.label, {fontSize: 10, textAlign: 'center'}]}>
                  {"Take photo"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this._onLibPress}
                style={{flex:0.5}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Icon
                    name='plus'
                    size={24}
                    color={"black"}
                    style={{justifyContent:'center'}}/>
                </View>
                <Text style={[styles.label, {fontSize: 10, textAlign: 'center'}]}>
                  {"Upload from library"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.dateContainer}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
            date={this.state.eventDate}
            mode="date"
            placeholder="Date"
            format="YYYY-MM-DD"
            minDate="2010-01-01"
            maxDate="2020-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
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
              }

            }}
            onDateChange={(date) => {this.setState({eventDate: date})}}
            />
          </View>

        <View style={{borderColor: '#E0E0E0', borderWidth: 1, alignSelf:'stretch', marginBottom:10, backgroundColor:'#E0E0E0'}}/>

        <View>
          <Text style={styles.subheader}>Behavior tags:</Text>
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

         <View style={styles.box}>
           <View style={styles.commentbox}>
              <TextInput
                multiline = {true}
                numberOfLines = {4}
                style = {styles.commenttext}
                placeholder="Notes"
                placeholderTextColor="grey"
              />
          </View>
        </View>

        <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.deletebutton}
          onPress={() => this.props.navigation.navigate('Timeline')}>
          <Text style={styles.deletebuttontext}> </Text>
          <Text style={styles.deletebuttontext}>DELETE</Text>
          <Text style={styles.deletebuttontext}> </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.savebutton}
          onPress={() => this.props.navigation.navigate('Timeline')}>
          <Text style={styles.savebuttontext}> </Text>
          <Text style={styles.savebuttontext}>SAVE</Text>
          <Text style={styles.savebuttontext}> </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  welcomeText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'SignPainter',
    textAlign: 'center',
    margin: 20
  },
  generalText: {
    fontFamily: 'Century Gothic',
    fontSize: 28,
    color: 'black'
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
    fontSize: 14,
    fontFamily:'Century Gothic'
  },
  box: {
    alignItems: 'stretch',
    backgroundColor: '#F6F6F6',
    borderColor: '#E0E0E0',
    borderWidth: 1.5
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   },
   submitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
   },
  dateContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
   },
  tagContainer: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
   },
   tagStyle: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10,
  },
  deletebutton: {
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
  savebutton: {
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
  deletebuttontext: {
    textAlign: 'center',
    color: 'black',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Century Gothic'
  },
  savebuttontext: {
    textAlign: 'center',
    color: 'white',
    flexDirection: 'column',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Century Gothic'
  },
  behavior: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1,
    margin: 5,
    opacity: 0.8
  },
  tagtext: {
    color: 'black',
    fontSize: 11,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  commentbox: {
    height: 70,
    alignSelf: 'stretch',
    margin: 8,
    marginTop: 2
  },
  commenttext: {
    color: 'black',
    fontSize: 14,
    margin: 4,
    fontFamily: 'Century Gothic'
  },
});
