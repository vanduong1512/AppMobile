import React, { Component } from 'react';
import {
    View, Text, FlatList, TextInput
} from 'react-native';
import { connect } from 'react-redux';

import store from '../../redux/store';

class DetailPurchaseOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            detailPO: '',
        }

        this.onPressDelete = this._onPressDelete.bind(this);
        this.onChangeAmountProduct = this._onChangeAmountProduct.bind(this);
        this.onEditPO = this._onEditPO.bind(this);
    }

    componentWillMount() {
        var { params } = this.props.navigation.state;
        this.setState({
            detailPO: params.detailPO
        })
    }

    _onPressDelete(keyProduct) {
        this.setState((prev, state) => ({
            detailPO: {
                ...prev.detailPO, listProduct: prev.detailPO.listProduct.filter(product => {
                    return (!(product.key === keyProduct));
                })
            }
        }))

        store.dispatch({
            type: 'DELETE_PRODUCT_PO',
            keyPO: this.props.navigation.state.params.detailPO.key,
            keyProduct: keyProduct,
        });

    }

    _onChangeAmountProduct(productPO, amount) {
        if (isNaN(amount))
            amount = 0;
        this.setState((prev, props) => ({
            detailPO: {
                ...prev.detailPO, listProduct: prev.detailPO.listProduct.map(e => {
                    if (e.key === productPO.key) {
                        return { ...e, amount }
                    }
                    return e;
                })
            }
        }))
    }

    _onEditPO() {
        this.setState((prev, props) => ({
            isEdit: !prev.isEdit,
        }))

        if (this.state.isEdit) {
            store.dispatch({
                type: 'CHANGE_AMOUNT_PRODUCT_PO',
                detailPO: this.state.detailPO
            })
        }
    }

    render() {
        // var { params } = this.props.navigation.state;
        return (
            <View>
                <Text style={{ padding: 10 }} onPress={this.onEditPO}>Edit</Text>
                <View>
                    <Text>{this.state.detailPO.key}</Text>
                    <Text>{this.state.detailPO.status}</Text>
                </View>
                <FlatList
                    data={this.state.detailPO.listProduct}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <View>
                            {
                                this.state.isEdit &&
                                <Text style={{ padding: 10 }} onPress={() => this.onPressDelete(item.key)}>delete</Text>
                            }
                            <Text>{item.name}</Text>
                            {
                                !this.state.isEdit ?
                                    <Text>{item.amount}</Text> :
                                    <TextInput
                                        value={item.amount.toString()}
                                        keyboardType='numeric'
                                        onChangeText={(amount) => this.onChangeAmountProduct(item, parseInt(amount))}
                                    />
                            }
                        </View>
                    }
                />
            </View>
        );
    }
}

// function mapStateToProps(state) {
//     return 
// }

// export default connect()(DetailPurchaseOrder);

export default DetailPurchaseOrder;