import React, { Component } from 'react';
import {
    Vibration,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BarcodeScanner from 'react-native-barcodescanner';
import App from '../App';

export default class BarcodeScannerApp extends Component {
    static navigationOptions = {
        title: 'Barcode',
    };
    constructor(props) {
        super(props);

        this.state = {
            barcode: ' ',
            torchMode: 'off',
            cameraType: 'back',
            type: ' ',
        };

        this.barcodeReceived = this.barcodeReceived.bind(this);
    }

    barcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) {
            Vibration.vibrate();
            this.setState({
                barcode: e.data,
                type: e.type,
            });
            this.props.navigation.state.params.getDataFromChild(e.data);
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <BarcodeScanner
                onBarCodeRead={this.barcodeReceived}
                style={{ flex: 1 }}
                torchMode={this.state.torchMode}
                cameraType={this.state.cameraType}
            />
        );
    }
}