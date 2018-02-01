import React, { Component } from 'react';
import {
    TouchableOpacity, Text, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ListProductToSale extends Component {
    constructor(props) {
        super(props);

        this.onPressProduct = this._onPressProduct.bind(this);
    }

    _onPressProduct(product) {
        this.props.parentObj.onPressProduct(product);
    }

    render() {
        return (
            <FlatList
                data={this.props.parentObj.listSale}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => this.onPressProduct(item)}>
                        <Icon name="star" size={30} color="yellow" />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

export default ListProductToSale;