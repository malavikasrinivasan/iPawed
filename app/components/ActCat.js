
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import { Card,
         ListItem,
         Button
} from 'react-native-elements';
// import { List, ListItem } from 'react-native-elements';

export default  class ActCat extends Component {
  render()
  {
    return (
      <View>
        <Text style={styles.sectionTitle}>Categories:</Text>
        <Card
          title='OUTDOOR'
          image={require('../img/dogpark.jpeg')}>
          <Button
            backgroundColor='white'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW ACTIVITIES'/>
          <Text style={styles.instructions}>
            Click to learn more about the different steps involved in taking your dog out on a walk and perfecting it.
          </Text>
        </Card>

        <Card
          title='HOLIDAY'
          image={require('../img/holiday.jpeg')}>
          <Button
            backgroundColor='white'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW ACTIVITIES' />
          <Text style={styles.instructions}>
            Click to learn more about the different steps involved in playing fetch your dog and perfecting it.
          </Text>
        </Card>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sectionTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Century Gothic',
    color: 'black',
    margin: 10,
    marginTop: 30,
    marginBottom: 0,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'Century Gothic',
  },
});


module.exports=ActCat
