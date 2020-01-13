import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import Inverter, { MegaSena } from './componentes/Multi'

export default class App extends Component {

  render() {
    return (
      <View style={styles.containter}>
        {/* <Text style={styles.f40}>App</Text> */}
        <Simples texto='Flexível' />
        <ParImpar numero={30} />
        <Inverter texto='React Nativo!' />
        <MegaSena numeros={6} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }/*,
  f40: {
    fontSize: 40
  }*/

})