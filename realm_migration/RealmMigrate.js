import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { migrateRealm } from './migrateRealm';
import Realm from 'realm';

export default class RealmMigrate extends Component {
    constructor(props) {
        super(props);
        this.state = { realm: undefined, status: 'Loading App...', version: 0 };
    }

    componentDidMount() {
        const configuration = migrateRealm();
        const version = configuration.schemaVersion;
        console.log('versão = ' + version)
        return Realm.open(configuration)
            .catch((e) => {
                const isTypeError = e instanceof TypeError;
                const isFailedNetworkRequest = e.message === 'Network request failed';
                if (isTypeError && isFailedNetworkRequest) {
                    this.setState({status: 'Server could not be reached.'});
                } else if (isTypeError) {
                    this.setState({status: e.message});
                } else {
                    this.setState({status: 'Unknown error'});
                }
            })
            .then((realm) => {
                this.setState({realm, version });
            })
            ;
    }

    render() {
        if (this.state.realm === undefined) {
            return (
                <View>
                    <Text>Aqui{this.state.status}</Text>
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <Text>{`Realm Migrations Example rendered for Version ${this.state.version}!`}</Text>
            </View>
        );
    }
}