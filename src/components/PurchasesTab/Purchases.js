import React, { Component } from 'react';
import {
    View, FlatList, Text, TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import store from '../../redux/store';

import ModalAddPO from './ModalAddPO';

class Purchases extends Component {
    static navigationOptions = {
        tabBarLabel: 'Purchase'
    }

    constructor() {
        super();
        this.state = {
            productToAdd: null,
            isVisibleAddModal: false,
            // dataProduct: [
            //     { key: 1, name: 'Golden Raisin 500g', keyPO: '' },
            //     { key: 2, name: 'Trung Nguyen Instant Black', keyPO: 'PO-001' },
            // ],
            // dataPurchaseOrder: [
            //     { key: 'PO-001', status: 'Pick up on Jan 26', listProduct: [{ key: 1, name: 'Trung Nguyen Instant BlacK', amount: 1 }] },
            //     { key: 'PO-002', status: 'Shipped', listProduct: [] },
            //     { key: 'PO-003', status: 'Arrived', listProduct: [] },
            // ],
        };

        this.onCloseModalAddPO = this._onCloseModalAddPO.bind(this);
        this.onOpenModaladdPO = this._onOpenModaladdPO.bind(this);
        this.onOpenPODetail = this._onOpenPODetail.bind(this);
        // this.onDeleteProductPO = this._onDeleteProductPO.bind(this);
    }

    _onCloseModalAddPO() {
        this.setState({
            isVisibleAddModal: false,
        })
    }

    _onOpenModaladdPO(product) {
        this.setState({
            isVisibleAddModal: true,
            productToAdd: product,
        })
    }

    _onOpenPODetail(purchase) {
        this.props.navigation.navigate('DetailPurchaseOrder', {
            detailPO: purchase,
            // onDeleteProductPO: this.onDeleteProductPO
        })
    }

    // _onDeleteProductPO(keyPO, keyProduct) {
    //     this.setState((prev, props) => ({
    //         dataPurchaseOrder: prev.dataPurchaseOrder.map(e => {
    //             if (e.key === keyPO) {
    //                 var listProduct = e.listProduct.filter(product => {
    //                     var temp = (!(product.key === keyProduct));
    //                     return (!(product.key === keyProduct));
    //                 })
    //                 return { ...e, listProduct }
    //             }

    //             return e;
    //         })
    //     }))
    // }

    render() {
        return (
            <View>
                {
                    this.state.isVisibleAddModal &&
                    <ModalAddPO parentObj={{
                        productToAdd: this.state.productToAdd,
                        onCloseModal: this.onCloseModalAddPO
                    }} />
                }
                <Text
                    style={{ padding: 10 }}
                    onPress={() => this.props.navigation.navigate('ListPurchase', {
                        onOpenPODetail: this.onOpenPODetail
                    })}>
                    List purchases order</Text>
                <Text style={{ padding: 10 }}>Create new purchase order</Text>
                <View>
                    <Text style={{ padding: 10 }}>Out of Stock</Text>
                </View>
                <FlatList
                    data={this.props.purchaseProduct}
                    renderItem={({ item }) =>
                        <View>
                            <Text>{item.name}</Text>
                            {
                                item.keyPO !== null &&
                                <Text>Added to {item.keyPO}</Text>
                            }
                            <TouchableOpacity onPress={() => this.onOpenModaladdPO(item)}>
                                <Text>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        purchaseProduct: state.purchaseProduct
    }
}

export default connect(mapStateToProps)(Purchases);

// export default Purchases;