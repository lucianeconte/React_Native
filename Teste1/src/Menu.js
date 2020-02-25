import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contador from './componentes/Contador'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import Inverter, { MegaSena } from './componentes/Multi'
import ValidarProps from './componentes/ValidarProps'

export default class Menu extends Component {
    
    render(){
        return (
            <View>
                
                
            </View>
        )
    }
}


/*export default createDrawerNavigator({
    ValidarProps: {
        screen: () => <ValidarProps ano={18} />
    },
    Contador: {
        screen: () => <Contador />
    },
    MegaSena: {
        screen: () => <MegaSena numeros={8} />,
        navegationOptions: { title: 'Mega Sena' }
    },
    Inverter: {
        screen: () => <Inverter texto='React Nativo!' />
    },
    ParImpar: {
        screen: () => <ParImpar numero={30} />,
        navegationOptions: { title: 'Par & Ímpar' }
    },
    Simples: {
        screen: () => <Simples texto='Flexível!!!' />
    }
}, {drawerWidth: 300 })*/