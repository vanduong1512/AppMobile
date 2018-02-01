import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import HomeScreen from './HomeScreen';
import App from '../App'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.onPressLogin = this.onPressLogin.bind(this);
    }

    onPressLogin() {
        this.props.navigation.navigate('HomeScreen');

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeScreen' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'white'}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor={'white'}
                    underlineColorAndroid={'white'}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                <TouchableOpacity style={styles.buttonLogin} onPress={this.onPressLogin}>
                    <Text style={{ color: 'white', fontSize: 20 }}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontStyle: 'italic' }}>No account yet?Sign up.</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AE1F1F',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    textInput: {
        width: '95%',
        color: 'white',
    },
    buttonLogin: {
        backgroundColor: '#555B65',
        width: '95%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
