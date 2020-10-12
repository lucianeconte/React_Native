import React from 'react'
import { View, Text, Button } from 'react-native'

export default props => (
    <View style={{ flex: 1 }}>
        <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
            {props.voltar
                ? <Button
                    title='Voltar'
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                />
                : false
            }
            {props.avancar
                ? <Button
                    title='Avançar'
                    onPress={() => {
                        props.navigation.push( //navigate ou push (navigate não chama de novo a tela, push sim - quando precisa da mesma tela com outros parâmetros)
                            props.avancar, 
                            //props.avancarParamn || null)  //espera um parâmetro, abaixo um fixo
                            {
                                numero: parseInt(Math.random() * 100)
                            }
                        )
                    }}
                />
                : false
            }
        </View>
        <View style={{ flex: 1 }}>
            {props.children}
        </View>
    </View>
)
