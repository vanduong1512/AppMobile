// Buy more and finish buying
import React, { Component } from 'react';
import {
    Modal, View, Text, StyleSheet, PanResponder, TextInput, TouchableOpacity
} from 'react-native';

class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true,
            amountProduct: 1,
        };
    };

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gesture) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }

    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.pageX === event.nativeEvent.locationX) {
            this.setState({
                isVisible: false,
            });
            this.props.parentObj.onCloseModal();
            this.onPressDone = this._onPressDone.bind(this);
            this.onPressAddMore = this._onPressAddMore.bind(this);
        }
    }

    _onPressDone(barcode, amount) {
        this.props.parentObj.onPressDone(barcode, amount);
    }

    _onPressAddMore(barcode, amount) {
        this.props.parentObj.onPressAddMore(barcode, amount);
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
                            <Text>{this.props.parentObj.productAdd.name}</Text>
                            <TextInput
                                placeholder="Amount"
                                keyboardType='numeric'
                                onChangeText={(amountProduct) => this.setState({ amountProduct })}
                            />
                            <TouchableOpacity onPress={() =>
                                this.props.parentObj.onPressDone(this.props.parentObj.productAdd.barcode, parseFloat(this.state.amountProduct))}>
                                <Text>DONE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => 
                                this.props.parentObj.onPressAddMore(this.props.parentObj.productAdd.barcode, parseFloat(this.state.amountProduct))}>
                                <Text>ADD MORE</Text>
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

export default ProductDetails;