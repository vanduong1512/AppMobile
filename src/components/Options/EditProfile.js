import React, { Component } from 'react';
import {
    View, Text, TextInput,
} from 'react-native';
import { connect } from 'react-redux';

class EditProfile extends Component {
    render() {
        return (
            <View>
                <Text>Name</Text>
                <TextInput
                    placeholder='name'
                    value={this.props.userInfo.name}
                />
                <Text>UserName</Text>
                <TextInput
                    placeholder='Username'
                    value={this.props.userInfo.username}
                />
                <Text>Email</Text>
                <TextInput
                    placeholder='Email'
                    value={this.props.userInfo.email}
                />
                <Text>Phone Number</Text>
                <TextInput
                    placeholder='Phone Number'
                    value={this.props.userInfo.phoneNumber}
                />
                <Text>Role</Text>
                <Text>{this.props.userInfo.role}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo.profile,
    }
}

export default connect(mapStateToProps)(EditProfile);