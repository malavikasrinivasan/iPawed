import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput, DatePickerIOS } from 'react-native';
import { Avatar, SocialIcon, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

import Header from './../../components/Header';

export default class AddEventScreen extends Component {
  

  state = {
    eventTitle : '',
    description : '',
    eventDate : new Date()
  }

  handleTitle = (text) => {
    this.setState({eventTitle : text})
  }
  handleDescription = (text) => {
    this.setState({description : text})
  }

  static navigationOptions = {
    title: 'AddEvent',
    headerStyle: {
      backgroundColor: '#5497A7',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.uploadContainer}>
          <Avatar containerStyle = {styles.avatarStyle}
            large
            rounded
            icon={{type: 'ionicon', name: 'ios-camera'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Avatar containerStyle = {styles.avatarStyle}
            large
            rounded
            icon={{type: 'ionicon', name: 'ios-images'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
        <TextInput style = {styles.caption}
               underlineColorAndroid = "transparent"
               placeholder = "Caption"
               placeholderTextColor = "gray"
               multiline = {true}
               autoCapitalize = "none"
               onChangeText = {this.handleTitle}
               onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
        }}/>
        <TextInput style = {styles.description}
               underlineColorAndroid = "transparent"
               placeholder = "Notes"
               placeholderTextColor = "gray"
               multiline = {true}
               autoCapitalize = "none"
               onChangeText = {this.handleTitle}
               onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
        }}/> 
        <View style={styles.dateContainer}>
            <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Date</Text>
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
                color: 'gray'
              },
              dateText: {
                color: 'gray'
              }
              
            }}
            onDateChange={(date) => {this.setState({eventDate: date})}}
            />
          </View>
        <View>
          <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Location</Text>
           <Text style = {{margin: 10, color: 'gray', fontSize: 14}}>Behavior</Text>
        </View>
       
        <View style ={styles.tagContainer}>
          <View style = {styles.tagStyle}>
            <Icon name='circle' color='#D3B69B' size={20}/>
            <Text style={{fontSize: 12, color:'gray'}}>Calm</Text>
          </View>
          <View style = {styles.tagStyle}>
            <Icon name='circle' color='#163250' size={20}/>
            <Text style={{fontSize: 12, color:'gray'}}>Fearful</Text>
          </View>
          <View style = {styles.tagStyle}>
            <Icon name='circle' color='#F7C68F' size={20}/>
            <Text style={{fontSize: 12, color:'gray'}}>Happy</Text>
          </View>
          <View style = {styles.tagStyle}>
            <Icon name='circle' color='#CC2539' size={20}/>
            <Text style={{fontSize: 12, color:'gray'}}>Joyful</Text>
          </View>
          <View style = {styles.tagStyle}>
            <Icon name='circle' color='#F9D64B' size={20}/>
            <Text style={{fontSize: 12, color:'gray'}}>Mellow</Text>
          </View>
        </View>
        <View style={styles.submitContainer}>
          <Avatar containerStyle =   {styles.avatarStyle}
            medium
            rounded
            titleStyle={{fontSize:12}}
            title="DELETE"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Avatar containerStyle = {styles.avatarStyle}
            medium
            rounded
            titleStyle={{fontSize:12}}
            title="SAVE"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  generalText: {
    fontFamily: 'Helvetica', 
    fontSize: 28, 
    color: 'black', 
    margin: 10
  },
  caption: {
      margin: 10,
      height: 30,
      borderColor: 'gray',
      borderBottomWidth: 1,
      color: '#5497A7',
   },
  description: {
      margin: 10,
      height: 100,
      borderColor: 'gray',
      borderBottomWidth: 1,
      color: '#5497A7',
   },
   uploadContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
   },
   avatarStyle: {
    margin: 20
   },
   submitContainer: {
    flex : 0,
    flexDirection: 'row',
    justifyContent: 'center',
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
   }
});
