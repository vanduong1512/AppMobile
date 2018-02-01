// component for Screen Sales.js. result to filter

import React, { Component } from 'react';
import {
    SectionList, View, ListItem, Text
} from 'react-native';

class ListSaled extends Component {
    constructor(props) {
        super(props);

        this.onPressSale = this._onPressSale.bind(this);
    }

    _onPressSale() {
        this.props.parentObj.onPressViewSaleDetail();
    }

    render() {
        return (
            <View>
                <SectionList
                    renderItem={({ item }) => <Text onPress={ this.onPressSale }>{item.name}</Text>}
                    extraData={this.state} 
                    renderSectionHeader={({ section }) => <Text>{section.key.toString()}</Text>}
                    sections={this.props.parentObj.dataSource}
                />
            </View>
        );
    };
}

export default ListSaled;