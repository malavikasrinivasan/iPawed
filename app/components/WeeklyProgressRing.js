import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TouchableOpacity, Image } from 'react-native'

import { CircularProgress } from './CircularProgress'

const WeeklyProgressRing =({
  completed = 1,
  total = 3,
  completedColor = '#e54747',
  blankColor = '#f7e1e1',
  activityName = 'A'
}) => {
  let percent = completed * 100 / total
  let pending = total - completed
  return(
    <View style={styles.mainContainer}>
      <Text style={styles.activityHeader}>
        {activityName}
      </Text>
      <CircularProgress
        percentage = { percent }
        donutColor = { completedColor }
        blankColor = { blankColor }
        progressWidth = { 24 }
        size = { 60 }
        >
        <View style={styles.mainTextContainer}>
          <View>
            <Text style={styles.bigText}>
              { completed }
            </Text>
          </View>
        </View>
      </CircularProgress>
      <Text style={styles.smallText}>
        of { total }
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  mainTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  bigText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
  },
  smallText:{
    color: 'black',
    fontSize: 12,
    fontFamily: 'Century Gothic',
    textAlign: 'center'
  },
  activityHeader:{
    color: 'black',
    fontSize: 16,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    marginVertical: 5
  }
})

export { WeeklyProgressRing }