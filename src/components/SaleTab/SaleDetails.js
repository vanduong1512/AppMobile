import React, { Component } from 'react';
import {
    View, Text, FlatList, Header, StyleSheet, TextInput, TouchableOpacity
} from 'react-native';

class SaleDetail extends Component {
    static navigationOptisons = {
        tabBarVisible: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            arrSale: [
                {
                    key: 1,
                    name: 'Nhat vi Fish sauce patis 480',
                    price: 120,
                    amount: 1,
                    isDelete: false
                }, {
                    key: 2,
                    name: 'Trung Nguyen Sang Tao 1',
                    price: 320,
                    amount: 1, 
                    isDelete: false
                }
            ],
        };

        this.onDeleteSaleProduct = this._onDeleteSaleProduct.bind(this);
    };

    _onDeleteSaleProduct(key) {
        // var arrSale = this.state.arrSale.filter(function(e) { return e.key != key });
        this.setState((prevState, props) => ({
            arrSale: prevState.arrSale.filter((element) => (element.key !== key) ),
        }));
    }

    render() {
        return (
            <View>
                <Text style={{ margin: 20, }} onPress={() =>
                    this.setState((prevState, props) => ({ isEdit: !prevState.isEdit, }))}> Edit </Text>
                {
                    this.state.arrSale.length > 0 &&
                    <FlatList
                        data={this.state.arrSale}
                        extraData={this.state}
                        renderItem={({ item }) =>
                            <View>
                                {
                                    this.state.isEdit &&
                                    <TouchableOpacity onPress={() => this.onDeleteSaleProduct(item.key)}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                }
                                <Text>This is page sale detail</Text>
                                <Text>Image</Text>
                                <View>
                                    <Text>{item.name}</Text>
                                    <View>
                                        <TextInput
                                            value={item.price !== undefined ? item.price.toString() : ''}
                                            edittable={this.state.isEdit}
                                        />
                                        <TextInput
                                            value={item.amount !== undefined ? item.amount.toString() : ''}
                                            edittable={this.state.isEdit}
                                        />
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={(item) => item.key}
                    />
                }
                <View>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>
            </View>
        );
    };
}

export default SaleDetail;