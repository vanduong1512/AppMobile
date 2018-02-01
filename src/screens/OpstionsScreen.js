import React, { Component } from 'react';
import {
    View, Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class OptionsScreen extends Component {
    constructor(props) {
        super(props);

        this.onPressEditProfile = this._onPressEditProfile.bind(this);
    }

    _onPressEditProfile() {
        this.props.navigation.navigate('EditProfile');
    }

    render() {
        return(
            <View>
                <View>
                    <Text>ACCOUNT</Text>
                    <Text onPress={this.onPressEditProfile}>Edit Profile</Text>
                    <Text>Change PassWord</Text>
                </View>
                <View>
                    <Text>SETTINGS</Text>
                    <Text>Role Access</Text>
                </View>
                <Text>Log out</Text>
            </View>
        );
    }
}

export default OptionsScreen;