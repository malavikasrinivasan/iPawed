import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ListView,
  ActivityIndicator
} from 'react-native';
import { Card,
  ListItem,
  Button
} from 'react-native-elements';
import * as firebase from 'firebase';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import RecActCard from '../../components/RecActCard';
import HorActCards from '../../components/HorActCards';
import ActCat from '../../components/ActCat';
import ActivityCard from '../../components/ActivityCard';
import Drawer from 'react-native-drawer';
import ControlPanel from './../../components/ControlPanel';

export default class ActivityMain extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarIcon: ({tintColor}) => (
        <Icon name="paw" size={24} color={tintColor}/>
      ),
    title: 'Activities',
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

  state = {
    userID:'',
    recommendedActivities: null,
    menuOpen: false
  }

  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    }
}

toggleControlPanel = () => {
  this.state.menuOpen ? this._drawer.close() : this._drawer.open();
  this.setState({menuOpen: !this.state.menuOpen});
}

getUserRecommendedActivities(userID){
  firebase.database().ref('userDetails/' + userID + '/' + 'recommendedActivities' + '/').once('value')
  .then((snapshot) => {
    this.setState({
      recommendedActivities: snapshot.val()
    });
    // console.log(recommendedActivities)
  })
  .catch((error) => {
    alert("Error")
  })

}

getRef() {
  return firebase.database().ref();
}

componentDidMount() {
  this.props.navigation.setParams({
    handleMenuToggle: this.toggleControlPanel,
  });
  const user = firebase.auth().currentUser;
  console.log("user",user)
  const userID = user ? user.uid : null;
  console.log("uid",userID)

  if(userID) {
    this.setState({
      userID: userID,
      // recommendedActivities: user.recommendedActivities
    });

    // this.getUserRecommendedActivities(userID)
    // this.setState({
    //           dataSource: this.state.dataSource.cloneWithRows(this.state.recommendedActivities)
    //       });
  }

  // console.log("Getting Firebase items");

  firebase.database().ref('userDetails/' + userID + '/' + 'recommendedActivities' + '/').on('value', (snap) => {
      console.log('snap', snap);

      var items = [];
      snap.forEach((child) => {
          items.push({
            title: child.val().title,
            category: child.val().category,
            desc: child.val().desc,
            steps: child.val().steps,
            video: child.val().video,
          imageurl: child.val().imageURL});
      });

      console.log('items', items);

      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
      });
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
      <ScrollView style={{flex: 1, backgroundColor: '#F8F8F8'}}>

      <Text style={styles.screenTitle}>
        {"Explore Activities"}
      </Text>

        <Text style={styles.subheader}>
          {"Keep your routine strong or try something new. As long as you're hanging out with Peanut, you're making memories."}
        </Text>

        <Text style={styles.sectionTitle}>
          {"Recommended for you:"}
        </Text>

        <ScrollView horizontal={true}>
            <ListView
                horizontal={true}
                // style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
            />
      </ScrollView>

        {/* <ScrollView horizontal={true}>
            <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
              <Card containerStyle={styles.cardStyle}>
                    <ImageBackground
                        style={styles.thumbnail}
                        source={require('../../img/bath.jpeg')}/>
                    <Text style={styles.activityTitle}>
                      {"Bath Time"}
                    </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
              <Card containerStyle={styles.cardStyle}>
                    <ImageBackground
                        style={styles.thumbnail}
                        source={require('../../img/dogpark.jpeg')}/>
                    <Text style={styles.activityTitle}>
                      {"Play Fetch"}
                    </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
              <Card containerStyle={styles.cardStyle}>
                    <ImageBackground
                        style={styles.thumbnail}
                        source={require('../../img/swimming.jpeg')}/>
                    <Text style={styles.activityTitle}>
                      {"Swim"}
                    </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
              <Card containerStyle={styles.cardStyle}>
                    <ImageBackground
                        style={styles.thumbnail}
                        source={require('../../img/hiking.jpeg')}/>
                    <Text style={styles.activityTitle}>
                      {"Hike"}
                    </Text>
              </Card>
            </TouchableOpacity>
      </ScrollView> */}


      <Text style={styles.sectionTitle}>
        {"Your most recent:"}
      </Text>

      <ScrollView horizontal={true}>
          <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
            <Card containerStyle={styles.cardStyle}>
                  <ImageBackground
                      style={styles.thumbnail}
                      source={require('../../img/vet.png')}/>
                  <Text style={styles.activityTitle}>
                    {"Vet Visit"}
                  </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
            <Card containerStyle={styles.cardStyle}>
                  <ImageBackground
                      style={styles.thumbnail}
                      source={require('../../img/walking.jpeg')}/>
                  <Text style={styles.activityTitle}>
                    {"Walk"}
                  </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
            <Card containerStyle={styles.cardStyle}>
                  <ImageBackground
                      style={styles.thumbnail}
                      source={require('../../img/treatpuzzle.jpeg')}/>
                  <Text style={styles.activityTitle}>
                    {"Puzzle"}
                  </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.25}}  onPress={() => this.props.navigation.navigate('ActivityDetail')}>
            <Card containerStyle={styles.cardStyle}>
                  <ImageBackground
                      style={styles.thumbnail}
                      source={require('../../img/hurdles.jpeg')}/>
                  <Text style={styles.activityTitle}>
                    {"Obstacles"}
                  </Text>
            </Card>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>
          {"Categories:"}
        </Text>

        <View style={{margin:10}}>
        <View style={{flexDirection:'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems:'center'}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={[styles.catImage, {backgroundColor:'black', opacity:1}]}/>
              <Image source={require('../../img/wood.jpg')} style={[styles.catImage, {position:'absolute'}]}/>
              <View style={styles.catInnerCirc}/>
              <Text style={styles.catTitle}>
                {"Home"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems:'center'}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={[styles.catImage, {backgroundColor:'black', opacity:1}]}/>
              <Image source={require('../../img/grass.jpg')} style={[styles.catImage, {position:'absolute'}]}/>
              <View style={styles.catInnerCirc}/>
              <Text style={styles.catTitle}>
                {"Play"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

          <View style={{flexDirection:'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems:'center'}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={[styles.catImage, {backgroundColor:'black', opacity:1}]}/>
                <Image source={require('../../img/fur.jpg')} style={[styles.catImage, {position:'absolute'}]}/>
                <View style={styles.catInnerCirc}/>
                <Text style={styles.catTitle}>
                  {"Care"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems:'center'}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={[styles.catImage, {backgroundColor:'black', opacity:1}]}/>
                <Image source={require('../../img/blanket.jpg')} style={[styles.catImage, {position:'absolute'}]}/>
                <View style={styles.catInnerCirc}/>
                <Text style={styles.catTitle}>
                  {"Lazy"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

    </ScrollView>
    </Drawer>
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };

    return (
      <ActivityCard navigation={this.props.navigation} item={item} />
    );
  }
}

const styles = StyleSheet.create({
  screenTitle: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'SignPainter',
    textAlign: 'center',
    marginTop: 10
  },
  subheader: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    margin: 10,
    marginBottom: 0
  },
  sectionTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Century Gothic',
    color: 'black',
    margin: 10,
    marginTop: 30,
    marginBottom: 0,
  },
  cardStyle: {
    height: 135,
    width: 135,
    margin: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
    alignItems: 'center',
    shadowOffset:{height: 1.5},
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    shadowRadius: 2,
  },
  catTitle: {
    textAlign: 'center',
    color:'white',
    fontFamily: 'Century Gothic',
    fontSize: 18,
    opacity: 1,
    padding: 5,
    paddingBottom: 10,
    position: 'absolute'
  },
  catImage: {
    width:185,
    height:185,
    opacity: 0.6,
    margin: 1,
  },
  catInnerCirc: {
    width:70,
    height:70,
    opacity:0,
    position:'absolute',
    backgroundColor:'white'
  },
  activityTitle: {
    textAlign: 'center',
    color:'black',
    fontFamily: 'Century Gothic',
    fontSize: 15,
    opacity: 1,
    marginTop: -28.5,
    padding: 5,
    backgroundColor:'rgba(255,255,255,0.8)',
  },
  thumbnail: {
    width: 135,
    height: 135,
    justifyContent:'flex-start',
    alignItems:'stretch',
    marginTop:-16,
    opacity:1
  },
  instructions: {
    fontSize: 8.5,
    textAlign: 'left',
    color: '#333333',
    fontFamily: 'Century Gothic',
  },
});

AppRegistry.registerComponent('ActivityMain', () => ActivityMain);
