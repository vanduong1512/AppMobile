import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DetailBill extends Component {
    render() {
        return (
            <View>
                <View>
                    <View>
                        <Text>Subtotal</Text>
                        <Text>price</Text>
                    </View>
                    <View>
                        <Text>Discount</Text>
                        <Text>input discount</Text>
                    </View>
                    <View>
                        <Text>TOTAL</Text>
                        <Text>info total</Text>
                    </View>
                    
                </View>
                <View>
                    <View>
                        <Text>Amount Given</Text>
                        <Text>Input amount</Text>
                    </View>
                    <View>
                        <Text>Change</Text>
                        <Text>Info Change</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default DetailBill;