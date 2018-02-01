import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import { StackNavigator } from 'react-navigation';

import BalanceInfo from './BalanceInfo';
import AddButton from '../AddButton';
import { convertStringToDate } from '../Utilities';

class Balance extends Component {
  static navigationOptions = {
    tabBarLabel: 'Balance'
  }

  constructor(props) {
    super(props);

    this.state = {
      fromDate: '01/01/2018',
      toDate: '01/03/2018',
      arrBalance: [
        { data: [{ key: 1, expensesWater: 40, sale: 500, withRaw: 2500, beginningBalance: 4240 }, { key: 2, expensesWater: 40, sale: 500, withRaw: 2500, beginningBalance: 4240 }], key: '01/02/2018' },
        { data: [{ key: 2, expensesWater: 50, sale: 600, withRaw: 4000, beginningBalance: 1234 }], key: '01/03/2018' },
      ],
      arrFilterBalance: [],
    }

    this.navigateAddBalance = this._navigateAddBalance.bind(this);
    this.setFromDate = this._setFromDate.bind(this);
    this.setToDate = this._setToDate.bind(this);
    this.filterBalanceFollowDate = this._filterBalanceFollowDate.bind(this);
    this.onAddNewBalance = this._onAddNewBalance.bind(this);
  };

  componentWillMount() {
    this.setFromDate(this.state.fromDate);
    this.setToDate(this.state.toDate);
  }

  _navigateAddBalance(){
    this.props.navigation.navigate('AddBalanceTab');
  }

  _setFromDate(fromDate) {
    this.setState({ fromDate })

    this.filterBalanceFollowDate();
  }

  _setToDate(toDate) {
    this.setState({ toDate });

    this.filterBalanceFollowDate();
  }

  _filterBalanceFollowDate() {
    var fromDate = convertStringToDate(this.state.fromDate);
    var toDate = convertStringToDate(this.state.toDate);

    this.setState({
      arrFilterBalance: this.state.arrBalance.filter(element => {
            var dateSale = convertStringToDate(element.key);
            return ((dateSale >= fromDate) && (dateSale <= toDate));
        })
    })
}

_onAddNewBalance() {
  
}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <View>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.fromDate}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="01/01/2010"
            maxDate="01/01/2030"
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
            onDateChange={(date) => this.setFromDate(date)}
          />
          <DatePicker
            style={{ width: 200 }}
            date={this.state.toDate}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="01/01/2010"
            maxDate="01/01/2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateIsnput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => this.setToDate(date)}
          />
        </View>
        <BalanceInfo arrBalance={this.state.arrFilterBalance} />
        <AddButton navigate={ this.navigateAddBalance }/>
      </View>
    );
  }
}

export default Balance;