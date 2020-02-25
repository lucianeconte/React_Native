import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'

const alunos = [
    { id: 1, nome: 'João', nota: 7.9 },
    { id: 2, nome: 'Ana', nota: 9.1 },
    { id: 3, nome: 'Maria', nota: 8.5 },
    { id: 4, nome: 'Carlos', nota: 6.3 },
    { id: 5, nome: 'Pedro', nota: 8.0 },
    { id: 6, nome: 'Marcos', nota: 7.9 },
    { id: 7, nome: 'Marta', nota: 9.1 },
    { id: 8, nome: 'Joana', nota: 8.5 },
    { id: 8, nome: 'Victor', nota: 7.0 },

    { id: 11, nome: 'João', nota: 7.9 },
    { id: 12, nome: 'Ana', nota: 9.1 },
    { id: 13, nome: 'Maria', nota: 8.5 },
    { id: 14, nome: 'Carlos', nota: 6.3 },
    { id: 15, nome: 'Pedro', nota: 8.0 },
    { id: 16, nome: 'Marcos', nota: 7.9 },
    { id: 17, nome: 'Marta', nota: 9.1 },
    { id: 18, nome: 'Joana', nota: 8.5 },
    { id: 19, nome: 'Victor', nota: 7.0 },
]

const itemEstilo = {
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#DDD',
    borderWidth: 0.5,
    borderColor: '#222',

    //Flex
    //justifyContent: 'space-between'
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //justifyContent: 'space-around',
    //alignItems: 'flex-end',
}

export const Aluno = props =>
    <View style={itemEstilo}>
        <Text>Nome: {props.nome}</Text>
        <Text style={{fontWeight: 'bold'}}>Nota: {props.nota}</Text>
    </View>

export default props => {
    const renderItem = ({ item }) => {
        return <Aluno {...item} />
    }

    return (
        <ScrollView>
            <FlatList data={alunos} renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()} />
        </ScrollView>
    )
}