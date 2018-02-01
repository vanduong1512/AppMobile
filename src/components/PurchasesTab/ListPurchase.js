import React, { Component } from 'react';
import {
    View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class ListPurchase extends Component {
    constructor() {
        super();
        
        this.onPressPurchaseOrder = this._onPressPurchaseOrder.bind(this);
    }
    
    _onPressPurchaseOrder(purchase) {
        this.props.navigation.state.params.onOpenPODetail(purchase);
    }

    render() {
        return (
            <View>
                <Text>Purchase Order</Text>
                <FlatList
                    data={this.props.purchaseOrder}
                    renderItem={({ item }) =>
                        <View>
                            <View>
                                <TouchableOpacity onPress={() => this.onPressPurchaseOrder(item)}>
                                <Text>{item.key}</Text>
                                <Text>{item.status}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        purchaseOrder: state.purchaseOrder
    }
}

export default connect(mapStateToProps)(ListPurchase);

// export default ListPurchase;