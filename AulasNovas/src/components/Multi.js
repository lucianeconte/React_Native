import React from 'react'
import { Text } from 'react-native'

export default function Comp() {
    return <Text>Comp #Oficial</Text>
}

export function Comp1() {
    return <Text>Comp #01</Text>
}

export function Comp2() {
    return <Text>Comp #02</Text>
}

// export { Comp1, Comp2 }

//Embora pode ter mais de um componente por arquivo, o recomendado é só um compente por arquivo