// Screen show List sale filter follow date

import React, { Component } from 'react';
import {
    StyleSheet, View, Text
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { StackNavigator } from 'react-navigation';

import ListSaled from './ListSaled';
import { convertStringToDate } from '../Utilities';

class Sales extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: "15/1/2018",
            toDate: "1/3/2018",
            dataSource: [{ data: [{ key: 1, name: 'SO-001', }, { key: 2, name: 'SO-002' }, { key:3, name: 'SO-003' }], key: '01/01/2018' }, 
            { data: [{ key: 4, name: 'SO-004' }], key: '01/03/2018' }],
            dataFiltered: [],
        }

        this.setFromDate = this._setFromDate.bind(this);
        this.setToDate = this._setToDate.bind(this);
        this.filterSale = this._filterSale.bind(this);
        this.onPressViewSaleDetail = this._onPressViewSaleDetail.bind(this);
    }

    componentWillMount() {
        this.setFromDate(this.state.fromDate);
        this.setToDate(this.state.toDate);
    }

    _setFromDate(fromDate) {
        this.setState({ fromDate });

        this.filterSale();
    }

    _setToDate(toDate) {
        this.setState({ toDate });

        this.filterSale();
    }

    _filterSale() {
        var fromDate = convertStringToDate(this.state.fromDate);
        var toDate = convertStringToDate(this.state.toDate);

        this.setState({
            dataFiltered: this.state.dataSource.filter(element => {
                var dateSale = convertStringToDate(element.key);
                return ((dateSale >= fromDate) && (dateSale <= toDate));
            })
        })
    }

    _onPressViewSaleDetail() {
        this.props.navigation.navigate('SaleDetail');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text onPress={() => navigate('SaleDetailTab')}>navigate</Text>
                <View>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.fromDate}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="1/1/2016"
                        maxDate="1/1/3000"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(fromDate) => { this.setFromDate(fromDate) }}
                    />
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.toDate}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="1/1/2016"
                        maxDate="1/1/3000"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(toDate) => { this.setToDate(toDate) }}
                    />
                </View>
                <ListSaled parentObj={{
                    dataSource: this.state.dataFiltered,
                    onPressViewSaleDetail: this.onPressViewSaleDetail,
                }} />
            </View>
        )
    }
}



export default Sales;