//Tab SALE product
import React, { Component } from 'react';
import {
    View, Text, TextInput, FlatList, Alert, Modal, TouchableOpacity, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';

import BuyProduct from './BuyProduct';
import SuggestingInput from '../SuggestingInput';
import ListProductToSale from './ListProductToSale';

class Products extends Component {
    static navigationOptions = {
        tabBarLabel: 'Sale',
    }

    constructor(props) {
        super(props);

        this.state = {
            isVisibleDetail: false,
            filterProduct: [{ name: 'nguyen' }, { name: 'van' }, { name: 'duong' }],
            productAdd: '',
        };

        this.onCloseModal = this._onCloseModal.bind(this);
        this.onOpenModal = this._onOpenModal.bind(this);
        this.onPressAddMore = this._onPressAddMore.bind(this);
        this.onPressDone = this._onPressDone.bind(this);
        this.onPressViewTotalReport = this._onPressViewTotalReport.bind(this);
    }

    _onCloseModal() {
        this.setState({
            isVisibleDetail: false,
        });
    }

    _onOpenModal(product) {
        this.setState({
            isVisibleDetail: true,
            productAdd: product,
        });
    }

    _onPressAddMore(barcode, amount) {
        var isEdit = false;
        if (this.props.arrProducts.length > 0) {
            this.props.arrProducts.map(e => {
                if (e.barcode === barcode) {
                    store.dispatch({
                        type: 'ADD_MORE_AMOUNT',
                        barcode,
                        addAmount: amount,
                    });
                    isEdit = true;
                    return;
                }
            });
            //add to list
            if (!isEdit) {
                store.dispatch({ type: 'ADD_PRODUCT', barcode, amount, price: 1000 });
            }
        }
        else store.dispatch({ type: 'ADD_PRODUCT', barcode, amount, price: 1000 });
        this.onCloseModal();
    }

    _onPressDone(barcode, amount) {
        this.onPressAddMore(barcode, amount);

        this.props.navigation.navigate('ScanTab');
    }

    _onPressViewTotalReport() {
        this.props.navigation.navigate('ListSaled');
    }

    render() {
        // var dataSource = [{ barcode: 11111, name: 'nguyen', isDelete: false }, { barcode: 22222, name: 'van', isDelete: false }, { barcode: 333333, name: 'duong', isDelete: false }, { barcode: 44444, name: '1512', isDelete: false }];
        var dataSource = [{ key: 1, name: 'nguyen', barcode: 11111, price: 10000 }, { key: 2, name: 'van', barcode: 22222, price: 10000 }, { key: 3, name: 'duong', barcode: 333333, price: 10000 }, { key: 4, name: '1512', barcode: 44444, price: 10000 }];
        var { filterProduct } = this.state;
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <View>
                <TouchableOpacity onPress={this.onPressViewTotalReport}>
                    <Text>P5,000.00</Text>
                    <Text>Total sales ...</Text>
                </TouchableOpacity>
                {
                    this.state.isVisibleDetail &&
                    <BuyProduct parentObj={{
                        onCloseModal: this.onCloseModal, onPressDone: this.onPressDone,
                        onPressAddMore: this.onPressAddMore, productAdd: this.state.productAdd,
                    }} />
                }
                <Text>This is product Tab</Text>
                <SuggestingInput parentObj={{
                    dataSource: dataSource,
                    onPressProduct: this.onOpenModal,
                }} />
                <ListProductToSale
                    parentObj={{
                        listSale: dataSource,
                        onPressProduct: this.onOpenModal,
                    }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
});

function mapStateToProps(state) {
    return { arrProducts: state.arrProducts };
}

export default connect(mapStateToProps)(Products)