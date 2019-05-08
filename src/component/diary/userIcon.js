import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Avatar} from "react-native-elements";


export default class UserIcon extends Component {

    _defaultOnPress() {
        // empty
    }

    render() {
        return (
            <Avatar small rounded
                containerStyle={localStyle.container}
                source={{uri: this.props.iconUrl}}
                onPress={this.props.onPress ? this.props.onPress : this._defaultOnPress.bind(this)}
                activeOpacity={0.7}
            />
        );
    }
}

const localStyle = StyleSheet.create({
    container: {
        marginTop: 3,
        marginRight: 8,
    }
});