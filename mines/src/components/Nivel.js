import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const Nivel = ({ texto, cor, dificuldade }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: cor}]}
                onPress = {dificuldade}>
                <Text style={styles.buttonLabel}>{ texto }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 5,
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold',
    },
})

export default Nivel;
