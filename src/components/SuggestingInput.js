import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

class SuggestingInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: null,
            arrFiltered: []
        }

        this.onChangeText = this._onChangeText.bind(this);
        this.onPressProduct = this._onPressProduct.bind(this);
    }

    _onChangeText(searchText) {
        var arr = [];
        if (searchText === '') {
            this.setState({
                searchText: '',
                arrFiltered: [],
            })
            return arr;
        }

        var arr = this.props.parentObj.dataSource.filter(product => product.name.search(searchText) >= 0);

        this.setState({
            searchText: searchText,
            arrFiltered: arr,
        })
    }

    _onPressProduct(product) {
        this.setState({
            searchText: '',
            arrFiltered: [],
        })
        this.props.parentObj.onPressProduct(product);
    }

    render() {
        return (
            <View>
                <SearchBar
                    round
                    value={this.state.searchText}
                    onChangeText={(searchText) => this.onChangeText(searchText)}
                    onClearText={() => (searchText) => this.setState({ searchText: '' })}
                    placeholder='Type Here...' />
                <FlatList
                    data={this.state.arrFiltered}
                    extraData={this.state}
                    renderItem={({ item }) =>
                        <Text onPress={() => this.onPressProduct(item)}>
                            {item.name}
                        </Text>
                    }
                />
            </View>
        );
    }
}

export default SuggestingInput;