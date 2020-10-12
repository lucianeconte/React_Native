import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default props => {
    const [nome, setNome] = useState('Teste')
    return (
        <View>
            <Text>{nome}</Text>
            <TextInput
                placeholder="Digite seu nome" 
                value={nome} //sem value pode alterar sem usar o evento onChangeText (ideal é usar assim)
                onChangeText={nome => setNome(nome)} />
        </View>
    )
}