import React, { Component, } from 'react';
import {
    SectionList, Text, View, Alert
} from 'react-native';

class BalanceInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionList
                renderItem={({ item }) => 
                    <View>
                        <Text>{item.expensesWater.toString()}</Text>
                        <Text>{item.sale.toString()}</Text>
                        <Text>{item.withRaw.toString()}</Text>
                        <Text>{item.beginningBalance.toString()}</Text>
                    </View>
                }
                renderSectionHeader={({ section }) => <Text>{section.key}</Text>}
                sections={this.props.arrBalance}
            />
        );
    }
}

export default BalanceInfo;