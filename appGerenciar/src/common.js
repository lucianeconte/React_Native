import { Alert } from 'react-native'

const server = 'https://synnax.herokuapp.com';

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err.response.data}`)
        console.log('erros:')
        console.log(Object.keys(err))
        console.log(Object.keys(err.response)) //usar para saber as chaves que tem, asism podem ser usadas

    } else {
        Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err}`)
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }