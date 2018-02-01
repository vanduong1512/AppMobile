//show list product to sale in home
import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Text,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

import store from '../../redux/store';

class ContentProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barcode: '',
            amount: 0,
        };

        this.onChangeAmount = this._onChangeAmount.bind(this);
    };

    _onChangeAmount(barcode, amount) {
        store.dispatch({
            type: 'EDIT_AMOUNT',
            barcode,
            amount
        })
    }

    render() {
        const { arrProducts } = this.props;
        return (
            <FlatList
                data={arrProducts}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <View>
                            <Text style={{ fontSize: 20 }}>{item.barcode}</Text>
                            <Text style={{ fontSize: 20 }}>{item.price * item.amount}</Text>
                            <View style={styles.container2}>
                                <TextInput
                                    style={styles.txtAmount}
                                    onChangeText={(amount) => this.onChangeAmount(item.barcode, amount)}
                                    value={item.amount.toString()}
                                    keyboardType='numeric'
                                />
                                <TouchableOpacity style={styles.btnDelete} onPress={() => {
                                    var barcode = item.barcode;
                                    store.dispatch({
                                        type: 'DELETE_PRODUCT',
                                        barcode
                                    })
                                }}>
                                    <Text style={{ color: 'white', fontSize: 25 }}>x</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                keyExtractor={item => item.barcode}
            />
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        margin: 10,
        padding: 20,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    btnDelete: {
        backgroundColor: '#CC0000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        margin: 15,
    },
    txtAmount: {
    },
});

function mapStateToProps(state) {
    return {
        arrProducts: state.arrProducts,
    };
}

export default connect(mapStateToProps)(ContentProducts);