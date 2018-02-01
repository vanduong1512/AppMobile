import React, { Component } from 'react';
import {
    StyleSheet, View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


import AddBalance from './BalanceTab/AddBalance';

class AddButton extends Component {
    render() {
        return (
            <ActionButton buttonColor="rgb(255,219,87)"
                onPress={ this.props.navigate }
            >
            </ActionButton>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

export default AddButton;