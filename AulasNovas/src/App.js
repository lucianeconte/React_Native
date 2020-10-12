import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

// import Primeiro from './components/Primeiro'
// import CompPadrao, { Comp1, Comp2 } from './components/Multi'
// import MiMax from './components/MiMax'
// import Aleatorio from './components/Aleatorio'
// import Titulo from './components/Titulo'
// import Botao from './components/Botao'
// import Contador from './components/Contador'
// import Pai from './components/direta/Pai'
// import Pai from './components/indireta/Pai'
// import ContadorV2 from './components/Contador/ContadorV2'
// import Diferenciar from './components/Diferenciar'
// import ParImpar from './components/ParImpar'
// import Famila from './components/relacao/Familia'
// import Membro from './components/relacao/Membro'
// import UsuarioLogado from './components/UsuarioLogado'
// import ListaProdutos from './components/Produtos/ListaProdutos'
// import ListaProdutosV2 from './components/Produtos/ListaProdutosV2'
// import DigiteSeuNome from './components/DigiteSeuNome'
// import FlexBoxV1 from './components/layout/FlexBoxV1'
// import FlexBoxV2 from './components/layout/FlexBoxV2'
// import FlexBoxV3 from './components/layout/FlexBoxV3'
// import FlexBoxV4 from './components/layout/FlexBoxV4'
// import Mega from './components/mega/Mega'
import VirtualizedListExample from './components/VirtualizedListExample'

// function App() {
//     return <Text>Luci</Text>
// }

// export default App;

export default () => (
    <View style={style.App}>
        <VirtualizedListExample />
        {/* <Mega qtdeNumeros={12} /> */}
        {/*
        <FlexBoxV4 />
        <FlexBoxV2 />
        <FlexBoxV1 />
        <DigiteSeuNome />
        <ListaProdutosV2 />
        <ListaProdutos />
        <UsuarioLogado usuario={{ nome: 'Luci', email: 'lucianeconte@gmail.com' }}/>
        <UsuarioLogado usuario={{ nome: 'Ana' }}/>
        <UsuarioLogado usuario={{ email: 'jose@gmail.com' }}/>
        <UsuarioLogado usuario={{}}/>
        <UsuarioLogado usuario={null}/>
        <Famila>
            <Membro nome="Ana" sobrenome="Silva" />
            <Membro nome="Pedro" sobrenome="Silva" />
        </Famila>
        <Famila>
            <Membro nome="Carlos" sobrenome="Ribeiro" />
            <Membro nome="Marcos" sobrenome="Ribeiro" />
            <Membro nome="Letícia" sobrenome="Ribeiro" />
            <Membro nome="Rafaela" sobrenome="Ribeiro" />
        </Famila>
        <ParImpar num={2}/>
        <Diferenciar />
        <ContadorV2 /> 
        <Pai />
        <Contador inicial={100} passo={10} />
        <Contador />
        <Botao />
        <Titulo principal="Cadastro Produto"
            secundario="Tela de Cadastro" />
        <Aleatorio ini={20} fim={200}/>
        <MiMax min={3} max={38}/>
        <MiMax min="3" max="38"/>
        <CompPadrao />
        <Comp1 />
        <Comp2 />
        <Primeiro />
        <Text>LUci - dentro de "aero function"</Text> */}
    </View>
)

const style = StyleSheet.create({
    App: {
        // backgroundColor: 'yellow',
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    }
})

//pode ter arquivo de estilo também