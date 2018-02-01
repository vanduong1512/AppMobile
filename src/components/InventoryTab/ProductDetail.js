// screen tab edit favorite + amount product detail INVENTORY tab
import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect, connectAdvanced } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { CheckBox } from 'react-native-elements';

import AddButton from '../AddButton';
import store from '../../redux/store';

class ProductDetail extends Component {
    static navigationOptions = {}

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isEdit: false,
        }

        this.navigateInventoryTransfer = this._navigateInventoryTransfer.bind(this);
        this.renderStarIcon = this._renderStarIcon.bind(this);
        this.renderCheckBoxFavorite = this._renderCheckBoxFavorite.bind(this);
        this.onPressEdit = this._onPressEdit.bind(this);
        this.onCheckFavorite = this._onCheckFavotrite.bind(this);
        this.onChangeAmount = this._onChangeAmount.bind(this);
    }

    componentWillMount() {
        var { params } = this.props.navigation.state;
        this.setState({
            data: this.props.inventoryProductDetail.filter(e => {
                return (e.keyProduct === params.keyProduct && e.keyDetail === params.keyDetail);
            }),
        });
    }

    _navigateInventoryTransfer() {
        this.props.navigation.navigate('InventoryTransferTab');
    }

    _renderStarIcon(isFavorite) {
        if (isFavorite)
            return <Icon name="star" size={30} color="yellow" />
        return <Icon name="star-border" size={30} color="yellow" />
    }

    _renderCheckBoxFavorite(name, key, isFavorite) {
        return (<CheckBox
            title={name}
            checked={isFavorite}
            onPress={() => this.onCheckFavorite(key)}
        />);
    }

    _onPressEdit() {
        var { params } = this.props.navigation.state;
        this.setState((prev, props) => ({
            isEdit: !prev.isEdit,
        }));

        if (this.state.isEdit) {
            console.log('isedit ' + this.state.isEdit)
            store.dispatch({
                type: 'ON_CHANGE_PRODUCT_DETAIL',
                inventoryProductDetail: this.state.data,
                keyProduct: params.keyProduct,
                keyDetail: params.keyDetail
            })
        }
    }

    _onCheckFavotrite(key) {
        this.setState((prev, props) => ({
            data: prev.data.map(e => {
                if (e.key === key)
                    return { ...e, isFavorite: !e.isFavorite };
                return e;
            })
        }))
    }

    _onChangeAmount(key, amount) {
        if (isNaN(amount)) {
            this.setState((prev, props) => ({
                data: prev.data.map(e => {
                    if (e.key === key)
                        return { ...e, amount: 0 }
                    return e;
                })
            }))
        }
        else {
            this.setState((prev, props) => ({
                data: prev.data.map(e => {
                    if (e.key === key)
                        return { ...e, amount }
                    return e;
                })
            }))
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <Text onPress={this.onPressEdit}>Edit</Text>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <View>
                            <Text>{item.name}</Text>
                            {
                                !this.state.isEdit ?
                                    this.renderStarIcon(item.isFavorite) :
                                    this.renderCheckBoxFavorite(item.name, item.key, item.isFavorite)
                            }
                            {
                                ((this.state.isEdit && item.isFavorite) || !(this.state.isEdit)) ?
                                    <Text>{item.amount}</Text>
                                    :
                                    <TextInput
                                        value={item.amount.toString()}
                                        onChangeText={(amount) => this.onChangeAmount(item.key, parseInt(amount))}
                                        keyboardType='numeric'
                                    />
                            }
                        </View>
                    }
                />
                <AddButton navigate={this.navigateInventoryTransfer} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { inventoryProductDetail: state.inventoryProductDetail };
}

export default connect(mapStateToProps)(ProductDetail);