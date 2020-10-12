import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, Button } from 'react-native';

const DATA = [{ "descricao": "PIC FRUTA LIMAO SeN", "favorito": false, "id_identificador": 330, "prc_venda": "2.7000", "qtd_atual": "15.0000", "referencia": "200445", "unidade": "UNI" },
{ "descricao": "PIC ACAI SeN  ", "favorito": false, "id_identificador": 317, "prc_venda": "3.9000", "qtd_atual": "29.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "PIC BOMBOM BRIG SeN ", "favorito": false, "id_identificador": 323, "prc_venda": "4.5000", "qtd_atual": "16.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "PIC FRUTA ABACAXI SeN  ", "favorito": false, "id_identificador": 329, "prc_venda": "2.7000", "qtd_atual": "7.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "PIC FRUTA UVA SeN   ", "favorito": false, "id_identificador": 331, "prc_venda": "2.7000", "qtd_atual": "17.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "REF SCHWEPPES CITRUS 350ML", "favorito": false, "id_identificador": 417, "prc_venda": "4.9000", "qtd_atual": "23.0000", "referencia": "", "unidade": "LAT" },
{ "descricao": "SORV ACAI NAT 1,5L", "favorito": true, "id_identificador": 188, "prc_venda": "30.0000", "qtd_atual": "3.0000", "referencia": "200449", "unidade": "UNI" },
{ "descricao": "SORV FLOCOS", "favorito": true, "id_identificador": 697, "prc_venda": "22.5000", "qtd_atual": "4.0000", "referencia": "200230", "unidade": "UNI" },
{ "descricao": "SORV FRUTAS 1,5L", "favorito": true, "id_identificador": 691, "prc_venda": "22.5000", "qtd_atual": "0.0000", "referencia": "200230", "unidade": "UNI" },
{ "descricao": "SORV LEITE TRUF 1L", "favorito": true, "id_identificador": 481, "prc_venda": "22.5000", "qtd_atual": "1.0000", "referencia": "200230", "unidade": "UNI" },
{ "descricao": "SORV ACAI C/ GUAR SeN 180G", "favorito": true, "id_identificador": 185, "prc_venda": "5.9000", "qtd_atual": "0.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "SORV POTE 1L GOIABADA", "favorito": true, "id_identificador": 614, "prc_venda": "12.9000", "qtd_atual": "0.0000", "referencia": "", "unidade": "FD" },
{ "descricao": "SORV POTE 1L LEITE COND ", "favorito": true, "id_identificador": 489, "prc_venda": "12.9000", "qtd_atual": "0.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "SORV POTE 1L MILHO VERDE", "favorito": true, "id_identificador": 560, "prc_venda": "12.9000", "qtd_atual": "0.0000", "referencia": "", "unidade": "UNI" },
{ "descricao": "SORV POTE 1L MORANGO", "favorito": true, "id_identificador": 490, "prc_venda": "12.9000", "qtd_atual": "0.0000", "referencia": "", "unidade": "UNI" }];

const getItem = (data, index) => {
  //console.log(DATA[index].descricao)
  return {
    id: Math.random().toString(12).substring(0),
    id_identificador: `${DATA[index].id_identificador}`,
    descricao: `${DATA[index].descricao}`,
    prc_venda: `${DATA[index].prc_venda}`, 
    favorito: `${DATA[index].favorito}`,
  }
}

const getItemCount = (data) => {
  return DATA.length
}

const Item = ({ descricao, id_identificador, prc_venda, favorito }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.descricao}>{id_identificador} - {descricao}</Text>
      <Text>{prc_venda} {favorito == 'true' ? '*' : '' }</Text>
    </View>
  );
}


const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        //renderItem={renderProduct}
        renderItem={({ item }) => 
          <Item 
            descricao={item.descricao} 
            id_identificador={item.id_identificador} 
            prc_venda={item.prc_venda} 
            favorito={item.favorito}
          />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  descricao: {
    fontSize: 18,
  },
});

export default VirtualizedListExample;
