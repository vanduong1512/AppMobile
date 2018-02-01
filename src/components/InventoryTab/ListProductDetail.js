import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

class ListProduct extends Component {
    constructor(props) {
        super(props);

        this.onPressproduct = this._onPressProduct.bind(this);
    }

    _onPressProduct(keyDetail) {
        this.props.parentObj.navigateProductDetail(this.props.parentObj.keyProduct, keyDetail);
    }

    render() {
        return (
            <FlatList
                data={this.props.parentObj.listProduct}
                renderItem={({ item }) => 
                    <Text onPress={() => this.onPressproduct(item.key)}>{item.name}</Text>
                }
                keyExtractor={(item, index) => item.name}
            />
        );
    };
}

export default ListProduct;