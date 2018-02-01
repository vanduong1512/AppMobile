import React, { Component } from 'react';
import {
    StyleSheet, View, Text, Modal, PanResponder, Picker, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import store from '../../redux/store';

class ModalAddPO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPurchasOrder: '',
            isVisible: true,
        }

        this.onPressAdd = this._onPressAdd.bind(this);
    }

    _onPressAdd() {
        store.dispatch({
            type: 'ADD_PRODUCT_TO_PO',
            keyPO: this.state.selectedPurchasOrder,
            product: this.props.parentObj.productToAdd,
        })

        this.props.parentObj.onCloseModal();
    }

    componentWillMount() {
        if (this.props.purchaseOrder.length > 0) {
            this.setState({
                selectedPurchasOrder: this.props.purchaseOrder[0].key,
            })
        }

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
        }

        this.props.parentObj.onCloseModal();
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
                            <Picker
                                selectedValue={this.state.selectedPurchasOrder}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedPurchasOrder: itemValue })}
                                mode='dropdown'
                            >
                                {
                                    this.props.purchaseOrder.map(e => <Picker.Item key={e.key} label={e.key} value={e.key} />
                                    )
                                }
                            </Picker>
                            <TouchableOpacity onPress={this.onPressAdd}>
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
    }
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

function mapStateToProps(state) {
    return {
        purchaseOrder: state.purchaseOrder,
    }
}

export default connect(mapStateToProps)(ModalAddPO);

// export default ModalAddPO;