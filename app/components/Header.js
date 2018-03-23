import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headerMessage: this.props.headerMessage
		}
	}

	render() {
		return (
			<View style={styles.viewContainer}>
				<Text style={styles.headerContent}>{ this.state.headerMessage }</Text>
			</View>
			);
	}
}

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#84A9C0',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  headerContent: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  }
});

AppRegistry.registerComponent('Header', () => Header);