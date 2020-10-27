import React from 'react';
import { Root } from 'native-base';
import { createAppContainer } from 'react-navigation';
import {isSignedIn} from './screens/Auth';
import { createRootNavigator } from './routes';
import 'react-native-gesture-handler';

export default class App extends React.Component {
    state = {
        signed: false,
        signLoaded: false,
        text: '',
    };

    componentDidMount() {
        isSignedIn()
            .then(res => this.setState({ signed: res, signLoaded: true }))
            .catch(err => alert('Erro'));
    }

    render() {
        const { signLoaded, signed } = this.state;

        if (!signLoaded) {
            return null;
        }

        const AppContainer = createAppContainer(createRootNavigator(signed));
        return (
            <Root>
                <AppContainer />
            </Root>
        );
    }
}
