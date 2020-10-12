import React from 'react';
import { View, StyleSheet } from 'react-native';

import Quadrado from './Quadrado'

export default props => {
    return (
        <View style={style.FlexV3}>
            <Quadrado cor='pink' />
            <Quadrado cor='#F00' />
            <Quadrado cor='#090' />
            <Quadrado cor='#009' />
            <Quadrado cor='yellow' />
        </View>
    )
}

const style = StyleSheet.create({
    FlexV3: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        height: 350,
        width: '100%',
        backgroundColor: '#000'
    }
})