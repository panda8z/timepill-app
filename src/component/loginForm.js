import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, InteractionManager, Alert} from 'react-native';
import {FormInput, Button} from "react-native-elements";
import {Navigation} from 'react-native-navigation';

import Color from '../style/color'
import Api from '../util/api'
import BottomNav from '../nav/bottomNav'


export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            username: '',
            password: ''
        });
    }

    async login() {
        let isLoginSucc, errMsg = '账号或密码不正确';

        try {
            isLoginSucc = await Api.login(this.state.username, this.state.password);
        } catch (err) {
            errMsg = err.message;
        }

        return {
            isLoginSucc,
            errMsg
        }
    }

    _checkResult(result) {
        InteractionManager.runAfterInteractions(() => {
            if(result.isLoginSucc) {
                Navigation.setRoot(BottomNav.config());

            } else {
                Alert.alert(
                    result.errMsg,
                    '',
                    [
                        {text: '确定', onPress: () => {}},
                    ],
                    {cancelable: false}
                );
            }
        });
    }

    _clickLogin() {
        this.props.setLoading(true);
        this.login().then(result => {
            this.props.setLoading(false);
            this._checkResult(result);
        });
    }

    _usernameSubmit() {
        this.refs.loginPw.focus();
    }

    _passwordSubmit() {
        this._clickLogin();
    }

    render() {return (
        <View>
            <Text style={localStyle.title}>{'欢迎来到胶囊日记'}</Text>

            <View style={localStyle.form}>
                <FormInput ref="loginUsername"

                    selectionColor={Color.primary}
                    underlineColorAndroid='transparent'
                    keyboardType='email-address'
                    value={this.state.username}

                    autoCorrect={false}
                    autoFocus={false}
                    autoCapitalize='none'
                    
                    placeholderTextColor={Color.inactiveText}
                    placeholder='账号邮箱'
                    returnKeyType="next"

                    onChangeText={(text) => this.setState({username: text})}
                    onSubmitEditing={this._usernameSubmit.bind(this)}
                />

                <FormInput ref="loginPw"

                    selectionColor={Color.primary}
                    underlineColorAndroid='transparent'

                    value={this.state.password}
                    secureTextEntry={true}
                    selectTextOnFocus={true}
                    autoCorrect={false}
                    
                    placeholder='登录密码'
                    placeholderTextColor={Color.inactiveText}
                    returnKeyType='done'

                    onChangeText={(text) => this.setState({password: text})}
                    onSubmitEditing={this._passwordSubmit.bind(this)}
                />
            </View>

            <Button borderRadius={999} title={'登录'} backgroundColor={Color.primary}
                onPress={this._clickLogin.bind(this)}
            />
        </View>
    );}
}

const localStyle = StyleSheet.create({
    title: {
        fontSize: 26,
        paddingBottom: 35,
        color: '#222',
        textAlign: 'center'
    },
    form: {
        paddingBottom: 20,
    }
});