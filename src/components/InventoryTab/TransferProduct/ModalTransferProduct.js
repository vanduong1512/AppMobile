import React, { Component } from 'react';
import {
    Modal, View, Text, StyleSheet, PanResponder, TextInput, TouchableOpacity, Alert
} from 'react-native';

class ModalTransferProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true,
            amount: 1,
        }

        this.onChangeAmount = this._onChangeAmount.bind(this);
        this.onPressAdd = this._onPressAdd.bind(this);
        this.onPressCancel = this._onPressCancel.bind(this);
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gesture) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })

        if(this.props.parentObj.productTransfer.amount === 0) {
            alert('get out stock!');
            this.props.parentObj.onCloseModal();
        }
    }

    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.pageX === event.nativeEvent.locationX) {
            this.setState({
                isVisible: false,
            });
            this.props.parentObj.onCloseModal();
        }
    }

    _onPressAdd() {
        this.props.parentObj.onPressAdd({ ...this.props.parentObj.productTransfer, amount: parseInt(this.state.amount), totalAmount: this.props.parentObj.productTransfer.amount }, parseInt(this.state.amount));
    }

    _onPressCancel() {
        this.props.parentObj.onCloseModal()
    }

    _onChangeAmount(amount) {
        if(amount === 0) return;
        if (isNaN(amount))
            amount = 1;

        if (amount > this.props.parentObj.productTransfer.amount) {
            Alert.alert(
                'Error',
                'Amount input is bigger than product amount!',
                [
                    { text: 'OK', onPress: () => this.setState({ amount: this.props.parentObj.productTransfer.amount }) },
                ])
        }
        else {
            this.setState({ amount });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}
                >
                    <View style={styles.containerModal} {...this.panResponder.panHandlers}>
                        <View style={styles.modal}>
                            <Text>{this.props.parentObj.productTransfer.name}</Text>
                            <TextInput
                                placeholder="Amount"
                                keyboardType='numeric'
                                value={this.state.amount.toString()}
                                onChangeText={(amount) => this.onChangeAmount(amount)}
                            />
                            <TouchableOpacity onPress={() => this.onPressAdd()}>
                                <Text>ADD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modal: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
    },
});

export default ModalTransferProduct;