import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    Back,
    Image,
    AlertAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, } from 'react-navigation';

import ContentProduct from '../components/HomeTab/ContentScanProducts';
import AddForm from '../components/HomeTab/AddForm';

import store from '../redux/store';

import Response from '../API/demo';

class PaomartApp extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Scan',
        headerRight:
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('OptionsScreen')}>
                    <Image
                        source={require('../img/options.png')}
                    />
                </TouchableOpacity>
            </View>
    });

    constructor(props) {
        super(props);
        this.state = {
            isAdding: false,
        };

        this.getDataFromChild = this._getDataFromChild.bind(this);
        this.navigateScannerScreen = this._navigateScannerScreen.bind(this);
        this.onAddForm = this._onAddForm.bind(this);
        this.onPressCancel = this._onPressCancel.bind(this);
    };

    _getDataFromChild(barcode) {
        var addAmount = 1;
        var isEdit = false;
        if (this.props.arrProducts.length > 0) {
            this.props.arrProducts.map(e => {
                if (e.barcode === barcode) {
                    store.dispatch({
                        type: 'ADD_MORE_AMOUNT',
                        barcode,
                        addAmount,
                    });
                    isEdit = true;
                    return;
                }
            });
            //add to list
            if (!isEdit) {
                store.dispatch({ type: 'ADD_PRODUCT', barcode, amount: 1, price: 1000 });
            }
        }
        else store.dispatch({ type: 'ADD_PRODUCT', barcode, amount: 1, price: 1000 });
        this.setState({ isAdding: false });
    }

    _navigateScannerScreen() {
        this.props.navigation.navigate('ScannerScreen', { getDataFromChild: this.getDataFromChild });
        this.onAddForm;
    }

    _onAddForm() {
        this.setState((prevState, props) => ({
            isAdding: !prevState.isAdding,
        }));
    }

    _onPressCancel() {
        Alert.alert(
            'Warning!',
            'Are you sure?',
            [
                { text: 'OK', onPress: () => store.dispatch({ type: 'CANCEL_SALE_PRODUCT' }) },
                { text: 'Cancel' }
            ]
        )
    }    

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 30 }}>List Products</Text>
                    <TouchableOpacity onPress={this.onAddForm}>
                        <Text style={{ fontSize: 30, }}>+</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isAdding === true &&
                    <AddForm parentObj={{ navigate: this.navigateScannerScreen, getDataFromChild: this.getDataFromChild }} />
                }
                {
                    this.props.arrProducts.length > 0 &&
                    <ContentProduct />
                }
                <View>
                    <TouchableOpacity style={styles.btnSell}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSell} onPress={this.onPressCancel}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBBBBB',
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    btnSell: {
        padding: 10,
        justifyContent: 'center',
        width: 150,
        backgroundColor: '#6666FF',
        margin: 10,
        alignItems: 'center',
    },
});

function mapStateToProps(state) {
    return { arrProducts: state.arrProducts };
}

export default connect(mapStateToProps)(PaomartApp);
