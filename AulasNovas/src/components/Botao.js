import React from 'react'
import { Text, Button } from 'react-native'

export default props => {

    function Executar() {
        console.warn('Exec #01!!!')
    }

    return (
        <>
            <Button
                title="Executar #01!"
                onPress={Executar} //Executar -> só referencia da função //// Executar() -> chamada da função
            />
            <Button
                title="Executar #02!"
                onPress={function () {
                    console.warn('Exec #02!!!')
                }}
            />

            <Button
                title="Executar #03!"
                onPress={() => console.warn('Exec #03!!!')}
            />
        </>
    )
}