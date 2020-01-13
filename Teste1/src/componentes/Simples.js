import React from 'react'
import { Text } from 'react-native'
import Padro from '../estilo/Padrao'

//export default function(props) {
//    return <Text>{props.texto}</Text>
//}

//Outra forma de fazer, código mais enxuto
export default props => 
    <Text style={Padro.ex}>Arrow 1: {props.texto}</Text>