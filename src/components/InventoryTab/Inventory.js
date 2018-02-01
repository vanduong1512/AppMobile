//tab INVENTORY
import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import { getInventoryService } from '../../API/Inventory';
import Response from '../../API/demo';

import AddButton from '../AddButton';
import ListTitleProduct from './ListTitleProduct';

class Inventory extends Component {
    static navigationOptions = {
        tabBarLabel: 'Inventory'
    }

    constructor(props) {
        super(props);

        this.state = {
            locationInventory: 1,
            arrWareHouse: [],
            dataFiltered: [],
            dataDetailFiltered: [],
        };

        this.navigateInventoryTransfer = this._navigateInventoryTransfer.bind(this);
        this.navigateProductDetail = this._navigateProductDetail.bind(this);
        this.setLocationInventory = this._setLocationInventory.bind(this);
        this.filterData = this._filterData.bind(this);
        this.onNestProduct = this._onNestProduct.bind(this);
    }

    componentWillMount() {
        this.filterData(this.state.locationInventory);

        getInventoryService.getWareHouse().then(res => this.setState({ arrWareHouse: res }))
    }

    _navigateInventoryTransfer() {
        this.props.navigation.navigate('InventoryTransferTab');
    }

    _navigateProductDetail(keyProduct, keyDetail) {
        this.props.navigation.navigate('InventoryProductDetail', { keyProduct, keyDetail })
    }

    _setLocationInventory(locationInventory) {
        this.setState({ locationInventory });

        this.filterData(locationInventory);
    }

    _filterData(locationInventory) {
        let dataFilter = this.props.inventoryProduct.filter(e => {
            return (e.locationInventory === locationInventory);
        });

        this.setState((prev, props) => ({
            dataFiltered: dataFilter,
            dataDetailFiltered: prev.dataDetailFiltered.filter(detail => {
                dataFilter.forEach(data => {
                    return (detail.keyProduct === data.key);
                })
            })
        }));
    }
    _onNestProduct(key) {
        this.setState((prev, props) => ({
            dataFiltered: prev.dataFiltered.map(element => {
                if (element.key === key) {
                    return { ...element, isNestedProduct: !element.isNestedProduct }
                }
                return element;
            }),
        }))

    }

    render() {
        const inventory = [
            { key: 0, name: 'TP Ho Chi Minh' },
            { key: 1, name: 'Ha Noi' },
        ];
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <View>
                    <Picker
                        selectedValue={this.state.locationInventory}
                        onValueChange={(itemValue, itemIndex) => this.setLocationInventory(itemValue)}
                        mode='dropdown'>
                        {
                            this.state.arrWareHouse.map(item => {
                                return <Picker.Item key={item.Id} label={item.Name} value={item.Id} />;
                            })
                        }
                    </Picker>
                    <ListTitleProduct parentObj={{
                        data: this.state.dataFiltered,
                        dataDetail: this.state.dataDetailFiltered,
                        onNestProduct: this.onNestProduct,
                        navigateProductDetail: this.navigateProductDetail,
                    }} />
                </View>
                <AddButton navigate={this.navigateInventoryTransfer} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        inventoryProduct: state.inventoryProduct,
        inventoryProductDetail: state.inventoryProductDetail
    }
}

export default connect(mapStateToProps)(Inventory);