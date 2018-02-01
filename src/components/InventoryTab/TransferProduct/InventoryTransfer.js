//this component tranfer product between inventories
import React, { Component } from 'react';
import { View, Picker, Text, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';

import store from '../../../redux/store';
import SuggestingInputProduct from '../../SuggestingInput';
import ModalTransferProduct from './ModalTransferProduct';
import ListProductToTransfer from './ListProductToTransfer';

class InventoryTransfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisibleModal: false,
            fromInventory: 1,
            toInventory: 2,
            dataProduct: [],//all product of fromInventory
            dataProductToTransfer: [],//list product are added to tranfer to another inventory
            productTransfer: [],//product to Tranfer other inventory
        };

        this.setFromInventory = this._setFromInventory.bind(this);
        this.setToInventory = this._setToInventory.bind(this);
        this.onSubmit = this._onSubmit.bind(this);
        this.onCancel = this._onCancel.bind(this);
        this.onCloseModal = this._onCloseModal.bind(this);
        this.onOpenModal = this._onOpenModal.bind(this);
        this.loadProductFromInventory = this._loadProductFromInventory.bind(this);
        this.onPressAddTransfer = this._onPressAddTransfer.bind(this);
        this.onEditAmountProductTransfer = this._onEditAmountProductTransfer.bind(this);
    }

    componentWillMount() {
        this.loadProductFromInventory(this.state.fromInventory);
    }

    _setFromInventory(fromInventory) {
        this.setState({ fromInventory });

        this.loadProductFromInventory(fromInventory);
    }

    _loadProductFromInventory(locationInventory) {
        let arrTitleProduct = this.props.inventoryProduct.filter(e => {
            return (e.locationInventory === locationInventory);
        });

        let dataProduct = [];

        arrTitleProduct.forEach(e => {
            this.props.inventoryProductDetail.forEach(e2 => {
                if (e.key === e2.keyProduct)
                    dataProduct = dataProduct.concat(e2);
            })
        })

        this.setState({
            dataProduct,
        })
    }

    _setToInventory(toInventory) {
        this.setState({ toInventory });
    }

    _onCloseModal() {
        this.setState({
            isVisibleModal: false,
        });
    }

    _onOpenModal(productDetail) {
        this.setState({
            isVisibleModal: true,
            productTransfer: productDetail,
        });
    }

    _onSubmit() {
        Alert.alert(
            '',
            'Success',
            [
                { text: 'OK', onPress: () => console.log('sucess OK') },
            ]);
    }

    _onCancel() {
        Alert.alert(
            'Notification',
            'Are you sure?',
            [
                { text: 'OK', onPress: () => {
                    this.setState({
                        dataProductToTransfer: []
                    })
                } },
                { text: 'Cancel' },
            ]);
    }

    _onPressAddTransfer(productTransfer, amount) {
        var isExisted = this._isExistedList(this.state.dataProductToTransfer, productTransfer);

        console.log('existed: ' + isExisted);

        if (isExisted) {
            this.setState((prev, props) => ({
                isVisibleModal: false,
                dataProductToTransfer: prev.dataProductToTransfer.map(e => {
                    if (e.key === productTransfer.key) {
                        isProductExisted = true;
                        return { ...e, amount: e.amount + productTransfer.amount };
                    }
                    return e;
                }),
                dataProduct: prev.dataProduct.map(e => {
                    if (e.key === productTransfer.key)
                        return { ...e, amount: e.amount - productTransfer.amount }
                    return e;
                })
            }))
        } else {
            this.setState((prev, props) => ({
                isVisibleModal: false,
                dataProductToTransfer: prev.dataProductToTransfer.concat(productTransfer),
                dataProduct: prev.dataProduct.map(e => {
                    if (e.key === productTransfer.key)
                        return { ...e, amount: e.amount - productTransfer.amount }
                    return e;
                })
            }))
        }
        console.log('dataProduct: ' + this.state.dataProduct)
    }

    _isExistedList(dataProductToTransfer, productTransfer) {
        var result = false;
        dataProductToTransfer.forEach(e => {
            if (e.key === productTransfer.key) {
                result = true;
                return;
            }
        })

        return result;
    }

    _onEditAmountProductTransfer(key, amount) {
        this.setState((prev, props) => ({
            dataProductToTransfer: prev.dataProductToTransfer.map(e => {
                if(e.key === key) {
                    if(amount <= e.totalAmount)
                        return { ...e, amount }
                    else {
                        alert('This Amount is too big');
                        return {...e, amount: e.totalAmount};
                    }
                }
                return e;
            })
        }))
    }

    render() {
        const inventoty = [
            { key: 0, name: 'TP Hồ Chí Minh' },
            { key: 1, name: 'Ha Noi' },
        ];
        return (
            <View>
                <View>
                    <Text>From</Text>
                    <Picker
                        selectedValue={this.state.fromInventory}
                        onValueChange={(fromInventory) => this.setFromInventory(fromInventory)}>
                        {
                            inventoty.map(item => {
                                return <Picker.Item key={item.name} label={item.name} value={item.key} />;
                            })
                        }
                    </Picker>
                    <Text>To</Text>
                    <Picker
                        selectedValue={this.state.toInventory}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                                toInventory: itemValue,
                            })
                        }}>
                        {
                            inventoty.map(item => {
                                return <Picker.Item key={item.name} label={item.name} value={item.key} />;
                            })
                        }
                    </Picker>
                    {
                        this.state.isVisibleModal &&
                        <ModalTransferProduct
                            parentObj={{
                                onPressAdd: this.onPressAddTransfer,
                                onPressCancel: this.onPressCancelTransfer,
                                onCloseModal: this.onCloseModal,
                                productTransfer: this.state.productTransfer
                            }}
                        />
                    }
                    <SuggestingInputProduct parentObj={{
                        dataSource: this.state.dataProduct,
                        onPressProduct: this.onOpenModal,
                    }} />
                    <ListProductToTransfer
                        parentObj={{
                            listProduct: this.state.dataProductToTransfer,
                            onChangeAmount: this.onEditAmountProductTransfer
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity>
                        <Text onPress={this.onSubmit}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text onPress={this.onCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        inventoryProduct: state.inventoryProduct,
        inventoryProductDetail: state.inventoryProductDetail,
    }
}

export default connect(mapStateToProps)(InventoryTransfer);