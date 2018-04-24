import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, AppRegistry, Button, Image, TouchableOpacity } from 'react-native';

import Header from './../../components/Header';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import Timeline from 'react-native-timeline-listview'
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';
import * as firebase from 'firebase';


export default class TimelineScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
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
        headerRight:
          <TouchableOpacity onPress={() => params.handleMenuToggle()}>
          <Image
            source={require("../../icon/menu.png")}
            style={{height:16, width:20, justifyContent:'center', margin:13}}/>
          </TouchableOpacity>
      }
    };

    
  constructor(){
    super();
    this.onEventPress = this.onEventPress.bind(this)
    this.renderDetail = this.renderDetail.bind(this)

    this.data = [
      {
        time: 'Jan 04, 2018',
        title: 'Adoption Day!',
        description: 'Adopted Peanut!!!',
        imageUrl: 'https://i.pinimg.com/736x/dd/a4/3b/dda43bf31a3e21896a423f19fbebdf70--german-shepherd-pups-shepherd-dogs.jpg'
      },
      {
        time: 'Jan 06, 2018',
        title: 'First walk',
        description: 'Went on our first walk, Peanut did great',
        imageUrl: 'https://i1.wp.com/doglers.com/wp-content/uploads/2015/01/Cute-german-shepherd-Puppy-Playing.jpg'
      },
      {
        time: 'Jan 09, 2018',
        title: 'Vet visit',
        description: 'Peanut got all his shots today, looking healthy!',
        imageUrl: 'https://thehappypooch.com/wp-content/uploads/2016/03/sleeping-dog.jpg'
      },
      {
        time: 'Jan 13, 2018',
        title: 'Hike',
        description: 'Went hiking on the trails behind our house, Peanut got into a fight with another dog :(',
        imageUrl: 'https://i.pinimg.com/originals/fe/76/e2/fe76e2bdd2dc58485114a9ee11f910e4.jpg'
      },
      {
        time: 'Jan 13, 2018',
        title: 'Hike',
        description: 'Went hiking on the trails behind our house, Peanut got into a fight with another dog :(',
        imageUrl: 'https://i.pinimg.com/originals/fe/76/e2/fe76e2bdd2dc58485114a9ee11f910e4.jpg'
      }
    ];

    this.state = {
      userID : '',
      selected: null,
      menuOpen: false
    };

    console.log(this.data);
  }

  componentDidMount(){ 

    const firebaseUserID = firebase.auth().currentUser.uid;
    this.setState({userID: firebaseUserID});
    console.log("Hi");
  }

  toggleControlPanel = () => {
    this.state.menuOpen ? this._drawer.close() : this._drawer.open();
    this.setState({menuOpen: !this.state.menuOpen});
  }

    onEventPress(data){
      this.setState({selected: data});
      this.props.navigation.navigate('ViewEvent');
    }

  renderDetail(rowData, sectionID, rowID) {
    let title = null
    var desc = null
    if(rowData.description && rowData.imageUrl)
      desc = (
        <View style={{backgroundColor: '#5AC8B0', borderRadius: 10}}>
          <Text style={[styles.title]}>{rowData.title}</Text>
          <View style={styles.descriptionContainer}>
            <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
            <Text style={[styles.textDescription]}>{rowData.description}</Text>
          </View>
        </View>
      )

    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
      )
  }

    componentDidMount(){
      this.props.navigation.setParams({
        handleMenuToggle: this.toggleControlPanel,
      });
    }

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        side='right'
        content={<ControlPanel navigation={this.props.navigation}/>}
        captureGestures={true}
        acceptTap={true}
        tapToClose={true}
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        panCloseMask={0.3}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.generalText}>
            Memories with Peanut!
          </Text>
        </View>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddEvent', {userID: this.state.userID})}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Icon
                name="ios-add-circle" size = {40} color = "#5AC8B0"
                style={{justifyContent:'center'}}/>
            </View>
        </TouchableOpacity>
        <ScrollView style={styles.timelineContainer}>
          <Timeline
            data = {this.data}
            circleSize={12}
            circleColor='black'
            lineColor='gray'
            lineWidth={1}
            timeContainerStyle={{minWidth:0, marginTop: -5}}
            timeStyle={styles.time}
            titleStyle={styles.title}
            descriptionStyle={styles.textDescription}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'dot'}
            columnFormat='two-column'
            onEventPress={this.onEventPress}
            renderDetail={this.renderDetail}
            // showTime = {false}
        />
      </ScrollView>
    </View>
    </Drawer>
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
    fontSize:12,
    textAlign: 'right',
    backgroundColor:'black',
    color:'white',
    fontFamily:'Century Gothic',
    fontWeight: 'bold',
    borderWidth: 6,
    borderRadius: 1
  },
  title: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    fontFamily:'Century Gothic',
    marginLeft: 10
  },
  descriptionContainer:{
    flexDirection: 'row',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    backgroundColor: '#5AC8B0',
    borderRadius: 10,
  },
  textDescription: {
    flex: 1, 
    flexWrap: 'wrap',
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
    flex: 0,
    margin: 10
  },
  list: {
    flex: 1,
    margin:20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5
  }
});


