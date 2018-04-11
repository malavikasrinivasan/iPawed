import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Image, TouchableOpacity } from 'react-native';

import Header from './../../components/Header';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import Timeline from 'react-native-timeline-listview'



export default class TimelineScreen extends Component {

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

  constructor(){
    super();
    this.onEventPress = this.onEventPress.bind(this)
    this.renderDetail = this.renderDetail.bind(this)

    this.data = [
      {
        time: 'January 4, 2018',
        title: 'Adoption Day!',
        description: 'Adopted Peanut!!!',
        imageUrl: 'https://i.pinimg.com/736x/dd/a4/3b/dda43bf31a3e21896a423f19fbebdf70--german-shepherd-pups-shepherd-dogs.jpg'
      },
      {
        time: 'January 6, 2018',
        title: 'First walk',
        description: 'Went on our first walk, Peanut did great',
        imageUrl: 'https://i1.wp.com/doglers.com/wp-content/uploads/2015/01/Cute-german-shepherd-Puppy-Playing.jpg'
      },
      {
        time: 'January 9, 2018',
        title: 'Vet visit',
        description: 'Peanut got all his shots today, looking healthy!',
        imageUrl: 'https://thehappypooch.com/wp-content/uploads/2016/03/sleeping-dog.jpg'
      },
      {
        time: 'January 13, 2018',
        title: 'Hike',
        description: 'Went hiking on the trails behind our house, Peanut got into a fight with another dog :(',
        imageUrl: 'https://i.pinimg.com/originals/fe/76/e2/fe76e2bdd2dc58485114a9ee11f910e4.jpg'
      }
    ];

    this.state = {
      selected: null
    };
  }

    onEventPress(data){
      this.setState({selected: data});
      this.props.navigation.navigate('ViewEvent');
    }

    renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    var desc = (
            <View style={styles.descriptionContainer}>
              <Text style={[styles.textDescription]}>{rowData.description}</Text>
            </View>
          )
    if(rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )

    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
      )
    }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topRow}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddEvent')}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image
                source={require("../../icon/plus.png")}
                style={{height:25, width:25, justifyContent:'center', margin:13}}/>
            </View>
          </TouchableOpacity>

          <Text style={styles.generalText}>
            Memories with Peanut!
          </Text>
        </View>
        <View style={styles.timelineContainer}>
          <Timeline
            data = {this.data}
            circleSize={12}
            circleColor='#5AC8B0'
            lineColor='grey'
            lineWidth={1}
            timeContainerStyle={{minWidth:0, marginTop: -5}}
            timeStyle={styles.time}
            titleStyle={styles.title}
            descriptionStyle={styles.textDescription}
            options={{
              style:{paddingTop:5}
            }}
            columnFormat='two-column'
            onEventPress={this.onEventPress}
            renderDetail={this.renderDetail}
        />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  time: {
    fontSize:14,
    textAlign: 'right',
    backgroundColor:'white',
    color:'black',
    fontFamily:'Century Gothic',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    fontFamily:'Century Gothic'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  textDescription: {
    fontSize: 10,
    color:'black',
    fontFamily:'Century Gothic',
    margin: 5,
  },
  generalText: {
    fontFamily: 'Century Gothic',
    fontSize: 26,
    color: 'black',
    margin: 10
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  timelineContainer: {
    flex: 1,
    margin: 10
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5
  }
});

AppRegistry.registerComponent('TimelineScreen', () => TimelineScreen);
