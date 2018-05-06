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
import CategoryCard from '../../components/CategoryCard';
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
      fontFamily: 'Century Gothic',
      fontSize: 22,
      color: 'black',
      fontWeight: 'normal'
    },
    headerRight:
      <TouchableOpacity onPress={() => params.handleMenuToggle()}>
      <Image
        source={require("../../icon/menu.png")}
        style={{height:16, width:20, justifyContent:'center', margin:13}}/>
      </TouchableOpacity>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        }),
        dataSourceCat: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        userID:'',
        userDetails: null,
        recommendedActivities: null,
        menuOpen: false
    };
}

toggleControlPanel = () => {
  this.state.menuOpen ? this._drawer.close() : this._drawer.open();
  this.setState({menuOpen: !this.state.menuOpen});
}

getUserData(userID){
  firebase.database().ref('userDetails/' + userID + '/').once('value')
  .then((snapshot) => {
    this.setState({
      userDetails: snapshot.val()
    });
  })
  .catch((error) => {
    alert("Error")
  })
}


setRecommendedActivities(userID){
  firebase.database().ref('userDetails/'+ userID + '/' + 'recommendedActivities/').remove();

  const totalTrain = 10;
  const totalPlay = 7;
  const totalCalm = 8;
  const totalCare = 6;
  firebase.database().ref('userDetails/' + userID + '/').once('value')
  .then((snapshot) => {
    const userDetails = snapshot.val();
    this.setState({
      userDetails: snapshot.val()
    });

    // =========================================================================
    // use profile information to adjust number of each activity:
    // =========================================================================
    var numberTrain = 1;
    var numberCare = 1;
    var numberPlay = 1;
    var numberCalm = 1;

    // using pet age/recency:
    // -------------------------------
    var adoptdate = new Date(userDetails.petDetails.petAdoptionDate);
    var birthdate = new Date(userDetails.petDetails.petBirthDay);
    var curdate = new Date();
    var yearNorm = 60*60*24*30*1000*12;
    var adoptAge = (curdate - adoptdate)/yearNorm;   // (in years)
    var petAge = (curdate - birthdate)/yearNorm      // (in years)
    // if recently adopted (< 6 months), train
    if (adoptAge < 0.5){
      numberTrain += 1;
    }
    // if young (< 1 year), play [NOTE: removed additional train b/c redundant?]
    if (petAge < 1){
      numberPlay += 1;
    }
    // if old (> 10 years), calm
    if (petAge > 10){
      numberCalm += 1;
    }

    // user-described experience level:
    // -------------------------------
    var experienceStr = userDetails.ownerInfo.experience
    if (experienceStr == 'no'){
      numberTrain += 1;
    }
    else if (experienceStr == 'a lot'){
      numberTrain -= 1;
    }

    // - recent activities? (not now... but in the future) -
    // -------------------------------
    // using user goals and progress:
    // -------------------------------
    var trainCompleted = Boolean(userDetails.weeklyGoals.trainGoal <= userDetails.weeklyGoals.trainGoalProgress);
    var playCompleted = Boolean(userDetails.weeklyGoals.playGoal <= userDetails.weeklyGoals.playGoalProgress);
    var calmCompleted = Boolean(userDetails.weeklyGoals.calmGoal <= userDetails.weeklyGoals.calmGoalProgress);
    var careCompleted = Boolean(userDetails.weeklyGoals.careGoal <= userDetails.weeklyGoals.careGoalProgress);
    if (!(trainCompleted && playCompleted && calmCompleted && careCompleted)){
      if (trainCompleted){
        numberTrain = 0;
      }
      if (playCompleted){
        numberPlay = 0;
      }
      if (careCompleted){
        numberCare = 0;
      }
      if (calmCompleted){
        numberCalm = 0;
      }
    }

    // =========================================================================
    // now get a list of activities in each category to select randomly from:
    // =========================================================================
    if (numberTrain != 0){
      var t;
      for (t=0; t<numberTrain; t++){
        var idx = Math.floor(Math.random()*totalTrain);
        console.log(idx);
        firebase.database().ref('activityCategories/Train/Activities/').orderByKey().limitToFirst(idx).once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            this.setState({
              title:key,
              steps:childData.Steps,
              category:childData.Category,
              desc:childData.desc,
              imageurl:childData.imageurl,
              video:childData.Video
            });
          });
          firebase.database().ref('userDetails/'+ userID + '/' + 'recommendedActivities/' + this.state.title +"/" ).set({
            title: this.state.title,
            steps: this.state.steps,
            video: this.state.video,
            desc: this.state.desc,
            imageurl: this.state.imageurl,
            category: this.state.category
          }).catch((error) => {
            alert(error)
          });
        });
      }
    }
    if (numberPlay != 0){
      var p;
      for (p=0; p<numberPlay; p++){
        var idx = Math.floor(Math.random()*totalPlay);
        console.log(idx);
        firebase.database().ref('activityCategories/Play/Activities/').orderByKey().limitToFirst(idx).once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            this.setState({
              title:key,
              steps:childData.Steps,
              category:childData.Category,
              desc:childData.desc,
              imageurl:childData.imageurl,
              video:childData.Video
            });
          });
          firebase.database().ref('userDetails/'+ userID + '/' + 'recommendedActivities/' + this.state.title +"/" ).set({
            title: this.state.title,
            steps: this.state.steps,
            video: this.state.video,
            desc: this.state.desc,
            imageurl: this.state.imageurl,
            category: this.state.category
          }).catch((error) => {
            alert(error)
          });
        });
      }
    }
    if(numberCare != 0){
      var r;
      for (r=0; r<numberCare; r++){
        var idx = Math.floor(Math.random()*totalCare);
        console.log(idx);
        firebase.database().ref('activityCategories/Care/Activities/').orderByKey().limitToFirst(idx).once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            this.setState({
              title:key,
              steps:childData.Steps,
              category:childData.Category,
              desc:childData.desc,
              imageurl:childData.imageurl,
              video:childData.Video
            });
          });
          firebase.database().ref('userDetails/'+ userID + '/' + 'recommendedActivities/' + this.state.title +"/" ).set({
            title: this.state.title,
            steps: this.state.steps,
            video: this.state.video,
            desc: this.state.desc,
            imageurl: this.state.imageurl,
            category: this.state.category
          }).catch((error) => {
            alert(error)
          });
        });
      }
    }
    if (numberCalm != 0){
      var m;
      for (m=0; m<numberCalm; m++){
        var idx = Math.floor(Math.random()*totalCalm);
        console.log(idx);
        firebase.database().ref('activityCategories/Calm/Activities/').orderByKey().limitToFirst(idx).once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            this.setState({
              title:key,
              steps:childData.Steps,
              category:childData.Category,
              desc:childData.desc,
              imageurl:childData.imageurl,
              video:childData.Video
            });
          });
          firebase.database().ref('userDetails/'+ userID + '/' + 'recommendedActivities/' + this.state.title +"/" ).set({
            title: this.state.title,
            steps: this.state.steps,
            video: this.state.video,
            desc: this.state.desc,
            imageurl: this.state.imageurl,
            category: this.state.category
          }).catch((error) => {
            alert(error)
          });
        });
      }
    }
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
  const userID = user ? user.uid : null;

  if(userID) {
    this.setState({
      userID: userID,
    });
    this.setRecommendedActivities(userID);

    firebase.database().ref('userDetails/' + userID + '/recommendedActivities/').on('value', (snap) => {
        var items = [];
        snap.forEach((child) => {
            items.push({
              title: child.val().title,
              category: child.val().category,
              desc: child.val().desc,
              steps: child.val().steps,
              video: child.val().video,
              imageurl: child.val().imageurl});
        });

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
        });
    });
  }
  firebase.database().ref('activityCategories/').on('value', (snap) => {
    var categories = [];
    snap.forEach((child) => {
      categories.push({
          title: child.val().title,
          imageurl: child.val().imageurl});
    });
    this.setState({
        dataSourceCat: this.state.dataSourceCat.cloneWithRows(categories)
    });
  });
}

  render() {
    if (!this.state.userDetails) {
      return (
        <ActivityIndicator size='large' />
        );
    }

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

        <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop:10}}>
          <ListView
                contentContainerStyle={{flexDirection: 'row',
                flexWrap: 'wrap'}}
                dataSource={this.state.dataSourceCat}
                renderRow={this._renderItemFL.bind(this)}
            />
        </View>



    </ScrollView>
    </Drawer>
    );
  }

  _renderItem(item) {
    return (
      <ActivityCard navigation={this.props.navigation} item={item} userID = {this.state.userID} />
    );
  }

  _renderItemFL(item) {
      return (
        <CategoryCard navigation={this.props.navigation} item={item} userID = {this.state.userID} />
      );
  }
}

const styles = StyleSheet.create({
  screenTitle: {
    color: 'black',
    fontSize: 26,
    fontFamily: 'Century Gothic',
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
