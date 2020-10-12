import React from 'react'
import { Text } from 'react-native'

// export default props => {
    // const { ini, fim } = props
export default ({ ini, fim }) => {
    const delta = fim - ini + 1
    const aleatorio = parseInt(Math.random() * delta) + ini
    return (
        <Text>O valor aleatório entre {ini} e {fim} é {aleatorio}</Text>
    )
} 