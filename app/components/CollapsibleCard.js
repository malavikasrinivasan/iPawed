
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
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CollapsibleCard extends Component {
    anime = {
        height: new Animated.Value(),
        expanded: false,
        contentHeight: 0,
    }

    constructor(props) {
        super(props);

        this._initContentHeight = this._initContentHeight.bind(this);
        this.toggle = this.toggle.bind(this);
        this.anime.expanded = props.expanded;
        this.state = {
          icon: 'chevron-right'
        };
    }

    _initContentHeight(evt) {
        if (this.anime.contentHeight>0) return;
        this.anime.contentHeight = evt.nativeEvent.layout.height;
        this.anime.height.setValue(this.anime.expanded ? this._getMaxValue() : this._getMinValue() );
    }

    _getMaxValue() { return this.anime.contentHeight };
    _getMinValue() { return 0 };

    toggle() {
        Animated.timing(this.anime.height, {
            toValue: this.anime.expanded ? this._getMinValue() : this._getMaxValue(),
            duration: 300,
        }).start();
        this.anime.expanded = !this.anime.expanded;
    }

    render() {
        return (
            <View>
              <TouchableOpacity onPress={this.toggle}>
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                  <Icon name={this.state.icon} size={18} style={styles.actStepMoreIcon} />
                  <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
              </TouchableOpacity>


                <Animated.View style={{ height: this.anime.height }} onLayout={this._initContentHeight}>
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    margin: 10,
    color: '#5AC8B0',
    fontFamily: "Century Gothic"
  },
  actStepMoreIcon: {
    color:'grey',
    margin: 10,
    marginTop: 12,
    marginRight: 0,
    fontWeight:'bold',
  },
});

module.exports=CollapsibleCard;
