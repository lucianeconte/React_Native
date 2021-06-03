import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'

import axios from 'axios'

import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'
import session from '../session';
import {TOKEN} from '../variables';

import { server, showError, showSuccess } from '../common'
import colors from './colors'

const initialState = {
    name: '',
    login: 'luci',
    password: '159-*/753',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                login: this.state.login,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            let dados = '{"username": "' + this.state.login + '", "password": "' + this.state.password + '"}'
            const res = await axios.post(`${server}/api-token-auth/`, dados, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const token = res.data.token
            console.log(token)

            await session.set(TOKEN, token);

            // const headers = {
            //     'Authorization': 'token ' + token
            // }
            //console.log(headers)
            // const me = await axios.get('https://synnax.herokuapp.com/core/me/', {
            //     headers: headers
            // })
            // console.log(me)

            axios.defaults.headers.common['Authorization'] = `token ${token}`
            this.props.navigation.navigate('Home') 
        } catch (e) {
            showError(e)
        }

    }

    render() {
        const validations = []
        validations.push(this.state.login && this.state.password.length >= 3)
        validations.push(this.state.password && this.state.password.length >= 3)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a) //verificando se todos os elementos do array são verdadeiros, se um resultado for false, o resultado é false

        return (
            // <ImageBackground source={backgroundImage}
                // />
            <View style={styles.background}>
                <Text style={styles.title}>Synnax</Text>
                {/* <Text style={{fontSize: 14}}>Gerencie seu negócio</Text> */}
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome'
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })} />
                    }
                    <AuthInput icon='at' placeholder='Login'
                        value={this.state.login}
                        style={styles.input}
                        onChangeText={login => this.setState({ login })} />
                    <AuthInput icon='lock' placeholder='Senha'
                        value={this.state.password}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' placeholder='Confirmação de Senha'
                            value={this.state.confirmPassword}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={
                        () => this.setState({ stageNew: !this.state.stageNew }) //alternar valores sempre que clicar
                    }>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta'}
                    </Text>
                </TouchableOpacity>
            </View>
            // {/* </ImageBackground> */}
        )
    }
}

export const isSignedIn = async () => {
    const token = 'a';
    return token !== null ? true : false;
  };

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: colors.blue2,
        fontSize: 60,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: colors.blue3,
        padding: 20,
        width: '90%',
        borderRadius: 20,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: colors.blue2,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})
