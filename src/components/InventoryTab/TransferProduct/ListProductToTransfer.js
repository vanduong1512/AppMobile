import React, { Component } from 'react';
import {
    View, Text, FlatList, TextInput
} from 'react-native';

class ListProductToTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        }

        this.onEdit = this._onEdit.bind(this);
        this.onChangeAmount = this._onChangeAmount.bind(this);
    }

    _onEdit() {
        this.setState((prev, props) => ({
            isEdit: !prev.isEdit,
        }))
    }

    _onChangeAmount(key, amount) {
        if(isNaN(amount))
            amount = 0;
            
        this.props.parentObj.onChangeAmount(key, amount)
    }

    render() {
        return (
            <View>
                <Text style={{padding: 10}} onPress={this.onEdit}>Edit</Text>
                <FlatList
                    data={this.props.parentObj.listProduct}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <View>
                            {
                                this.state.isEdit &&
                                <Text style={{ padding: 5 }}> Delete </Text>
                            }
                            <Text>{item.name}</Text>
                            {
                                this.state.isEdit ?
                                    <TextInput
                                        value={item.amount.toString()}
                                        onChangeText={(amount) => this.onChangeAmount(item.key, parseInt(amount))}
                                        keyboardType='numeric'
                                    /> :
                                    <Text>{item.amount}</Text>
                            }
                        </View>
                    }
                />
            </View>
        );
    }
}

export default ListProductToTransfer;