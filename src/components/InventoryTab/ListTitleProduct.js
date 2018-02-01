import React, { Component } from 'react';
import { FlatList, Text, View, Alert } from 'react-native';
import store from '../../redux/store';

import ListProductDetail from './ListProductDetail';

class ListTitleProduct extends Component {
    constructor(props) {
        super(props);

        this.onNestedProduct = this._onNestedProduct.bind(this);
    }

    _onNestedProduct(key) {
        store.dispatch({
            type: 'ON_NESTED_PRODUCT',
            key
        })
        this.props.parentObj.onNestProduct(key);
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.parentObj.data}
                    renderItem={({ item }) =>
                        <View>
                            <Text onPress={() => this.onNestedProduct(item.key)}>{item.title}</Text>
                            {
                                item.isNestedProduct &&
                                <ListProductDetail parentObj={{
                                    keyProduct: item.key,
                                    listProduct: item.items,
                                    navigateProductDetail: this.props.parentObj.navigateProductDetail,
                                }} />
                            }
                        </View>
                    }
                />
            </View>
        );
    };
}

export default ListTitleProduct;