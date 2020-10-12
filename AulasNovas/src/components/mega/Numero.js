import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default ({ num }) => {
    return (
        <View style={style.Container}>
            <Text style={style.Num}>
                {num}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    Container: {
        height: 50,
        width: 50,
        backgroundColor: "#000",
        borderRadius: 25,
        margin: 5,
    },
    Num: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 12
    }
})