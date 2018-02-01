//Add new balance for tab BALANCE
import React, { Component } from 'react';
import {
    View, Text, TextInput, Picker, TouchableOpacity, Alert,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class AddBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: 'withdraw',
            amount: 0,
            isOtherBalance: false,
        };

        this.onPressSubmit = this._onPressSubmit.bind(this);
        this.onPressCancel = this._onPressCancel.bind(this);
    }

    _onPressCancel(){
        Alert.alert(' ', 'Are you sure?',
            [
                { text: 'OK', onPress: () => this.props.navigation.goBack() },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            ]);
    }

    _onPressSubmit() {
        Alert.alert(' ', 'Success',
            [
                { text: 'OK', onPress: () => this.props.navigation.goBack() },
            ]);
    }

    render() {
        return (
            <View>
                <Text>Please select</Text>
                <Picker
                    selectedValue={this.state.balance}
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue === 'other') {
                            this.setState({
                                balance: itemValue,
                                isOtherBalance: true,
                            });
                        } else {
                            this.setState({
                                balance: itemValue,
                                isOtherBalance: false,
                            });
                        }
                    }}>
                    <Picker.Item label="Expense: Water" value="Expense: Water" />
                    <Picker.Item label="Money Out" value="Money Out" />
                    <Picker.Item label="Expense: Ice" value="Expense: Ice" />
                    <Picker.Item label="Other, please specify" value="other" />
                </Picker>
                {
                    (this.state.isOtherBalance) &&
                    <TextInput
                        placeholder="Balance"
                        onChangeText={(balance) => this.setState({ balance })}
                    />
                }
                <TextInput
                    placeholder="Amount"
                    onChangeText={(amount) => this.setState({ amount })}
                    keyboardType='numeric'
                />
                <TouchableOpacity onPress={this.onPressSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressCancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

export default AddBalance;