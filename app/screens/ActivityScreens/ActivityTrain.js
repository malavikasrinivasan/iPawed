import React, {Component} from 'react';
import {AppRegistry,
        Text,
        View,
        StyleSheet,
        Button} from 'react-native';

export default class ActivityTrain extends Component {
  constructor(props){
      super(props);
      this.state = {}
      this._onPress = this._onPress.bind(this);
      this._onLeftButtonPress = this._onLeftButtonPress.bind(this);
  }

  render(){
      return(
        <View style={styles.scene}>
          <Text style={{textAlign:'center',
                        color:'black',
                        fontFamily: 'Century Gothic'}}>
            [Training page]
          </Text>
          {/*<Button onPress={this._onPress} title="Back"/>*/}
        </View>
      );
    }

  _onPress() {
    this.props.navigator.pop();
  }
  _onLeftButtonPress() {
    this.props.navigator.pop();
  }
}

  const styles = StyleSheet.create({
    scene: {
      backgroundColor: 'white',
      padding: 10,
      paddingTop: 100,
      flex: 1,
    },
    transformProps: {
      marginBottom: 10,
    }
  })

AppRegistry.registerComponent('ActivityTrain', () => ActivityTrain);
