import React from 'react';
import { Text, View } from 'react-native';

export default ({ num = 0 }) => {
    // if (num % 2 === 0) {
    //     return (
    //         <Text>Par</Text>
    //     )
    // } else {
    //     return (
    //         <Text>Ímpar</Text>
    //     )
    // }
    return (
        <View>
            <Text>O resultado é:</Text>
            {num % 2 === 0
                ? <Text>Par</Text>
                : <Text>Ímpar</Text> //pode usar false se não quer retornar nada
            }
        </View>
    )
}