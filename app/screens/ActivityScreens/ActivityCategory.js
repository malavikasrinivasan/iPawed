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
import SpecificCategoryCard from '../../components/SpecificCategoryCard';

export default class ActivityCategory extends Component {

  static navigationOptions = {
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
  };

  state = {
    userID:'',
    // recommendedActivities: null
  }


  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    }
}

componentDidMount() {

  const {params} = this.props.navigation.state
  console.log(params.item)

  firebase.database().ref('activityCategories/' + params.item.title + '/' + 'Activities' + '/').once('value')
  .then( (snap) => {

      var items = [];
      snap.forEach((child) => {
          items.push({
            title: child.val().title,
            category: child.val().Category,
            desc: child.val().desc,
            steps: child.val().Steps,
            video: child.val().Video,
            imageurl: child.val().imageurl});
      });

      console.log('items', items);

      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
      });
  });
}

  render() {
    const {params} = this.props.navigation.state
    const item = params.item
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F8F8F8'}}>

      <Text style={styles.screenTitle}>
        {item.title}
      </Text>

        <View style={{flexDirection:'row', justifyContent: 'center', flexWrap: 'wrap'}}>
            <ListView
                contentContainerStyle = {{flexDirection: 'row', flexWrap: 'wrap'}}
                // style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
            />
        </View>
      </ScrollView>
      );
    }

    _renderItem(item) {

      return (
        <SpecificCategoryCard navigation={this.props.navigation} item={item} />
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
      height: 120,
      width: 120,
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
      color:'black',
      fontFamily: 'Century Gothic',
      fontSize: 14,
      opacity: 1,
      padding: 5,
      paddingBottom: 10,
      fontStyle:'italic',
      position: 'absolute'
    },
    catInnerCirc: {
      width:70,
      height:70,
      borderRadius: 35,
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
      width: 120,
      height: 120,
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
