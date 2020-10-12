import React, { Component } from 'react';
import { Text, TextInput, Button, View } from 'react-native';

import MegaNumero from './Numero'

export default class Mega extends Component {

    // uma das maneiras de fazer, outra é no constructor
    state = {
        qtdeNumeros: this.props.qtdeNumeros,
        numeros: []
    }

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         qtdNumeros = this.props.qtdNumeros
    //     }
    // }

    // alterarQtdNumero(qtde) { //assim ocorre erro que não é função
    //     this.setState({ qtdNumeros: qtde })
    // }
    //o this dentro de uma "areofunction" nunca muda, dai não dá o erro informando que não é função
    alterarQtdNumero = (qtde) => {
        this.setState({ qtdeNumeros: +qtde }) //sinal da + na frente força que será um valor númerico
    }

    gerarNumeroNaoContido = nums => {
        const novo = parseInt(Math.random() * 60) + 1
        return nums.includes(novo) ? this.gerarNumeroNaoContido(nums) : novo
    }

    //Forma recomendada, usando funções
    gerarNumeros = () => {
        const numeros = Array(this.state.qtdeNumeros)
            .fill()
            .reduce(n => [...n, this.gerarNumeroNaoContido(n)], [])
            .sort((a, b) => a - b)
        this.setState({ numeros })
    }

    exibirNumeros = () => {
        const nums = this.state.numeros
        return nums.map(num => {
            return <MegaNumero key={num} num={num} />
        })
    }

    //Forma mais "simples" de entender o código
    // gerarNumeros = () => {
    //     const { qtdeNumeros } = this.state

    //     const numeros = []
    //     for(let i = 0; i < qtdeNumeros; i++) {
    //         const n = this.gerarNumeroNaoContido(numeros)
    //         numeros.push(n)
    //     }

    //     numeros.sort((a, b) => a - b)

    //     this.setState({ numeros })
    // }

    render() {
        return (
            <>
                <Text>
                    Gerador de Mega Sena
                </Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={{ borderBottomWidth: 1 }}
                    placeholder="Qtd de números"
                    value={`${this.state.qtdeNumeros}`} //forçando string com crase, para sair advertencia
                    onChangeText={this.alterarQtdNumero}
                />
                <Button
                    title='Gerar'
                    onPress={this.gerarNumeros}
                />
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: 20
                }}>
                    {this.exibirNumeros()}
                </View>
            </>
        )
    }
}