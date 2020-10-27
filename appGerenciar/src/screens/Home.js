import { ScrollView, Image, VirtualizedList } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Body,
    View,
    Content,
    Footer,
    Item,
    Input,
    Right,
    CardItem,
    Text,
    Subtitle,
    Toast,
    ActionSheet,
} from 'native-base';
import colors from '../screens/colors';
import utils from '../services/utils';
//import Spinner from 'react-native-loading-spinner-overlay';
//import sesssion from '../../session';
import {
    NavigatorBox,
    NavigatorContent,
    ScrollNavigator,
    ViewNavigator,
} from '../components/BottomNavigator/styled';

import Icon from 'react-native-vector-icons/MaterialIcons'
import IconF from 'react-native-vector-icons/FontAwesome'
import IconA from 'react-native-vector-icons/AntDesign'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casasDecimaisQuantidade: 2,
            casasDecimaisPreco: 2,
            //   pedido_id: this.props.navigation.getParam('pedido_id'),
            //   numero: this.props.navigation.getParam('numero'),
            tipo: 'Pa',
            search: false,
            searchTextPerson: '',
            searchTextParceiro: '',
            listParceiros: [],
            listProduct: [],
            listItens: [],
            cliente: {},
            //   nomeCliente: this.props.navigation.getParam('nomeCliente'),
            totalItens: 0,
            qtdItens: 0,
            spinner: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', async () => {
            this.fecthItens();
        });
    }

      resetSearch = tipo => {
        if (tipo == 'Pa') {
          this.setState({
            searchTextParceiro: [],
            listParceiros: '',
          });
        }

        if (tipo == 'C') {
          this.setState({
            searchTextPerson: [],
            listPerson: '',
          });
        }

        return true;
      };


    handleSearchPersonChange = string => {
        this.setState({ searchTextPerson: string });
    };

    handleSearchParceiroChange = string => {
        this.setState({ searchTextParceiro: string });
    };

    tratsArrPerson = data => {
        if (data == null) {
            Toast.show({
                position: 'top',
                text: 'Nenhum cliente encontrado!',
                buttonText: 'Ok',
                duration: 7000,
            });
            return [];
        }

        var arr = [];

        this.setState({
            listPerson: arr,
        });

        for (var d = 0; d < data[0].CPF_CNPJ.length; d++) {
            var person = {};
            person.cpf_cnpj = data[0].CPF_CNPJ[d];
            person.id_cliente = data[0].ID_CLIENTE[d];
            person.nome = data[0].NOME[d];
            arr.push(person);
        }

        this.setState({
            listPerson: arr,
        });

        return arr;
    };

    tratsArrItens = async data => {
        if (data == null) {
            return [];
        }

        var arr = await [];

        await this.setState({
            listItens: [],
        });

        for (var d = 0; d < data[0].DESCRICAO.length; d++) {
            var item = {};
            item.descricao = data[0].DESCRICAO[d];
            item.desconto = data[0].DESCONTO[d];
            item.id_identificador = data[0].ID_IDENTIFICADOR[d];
            item.id_itemprev = data[0].ID_ITEMPREV[d];
            item.impresso = data[0].IMPRESSO[d];
            item.item_cancel = data[0].ITEM_CANCEL[d];
            item.medida = data[0].MEDIDA[d];
            item.observacao = data[0].OBSERVACAO[d];
            item.qtd = data[0].QTD[d];
            item.total = data[0].TOTAL[d];
            arr.push(item);
        }

        await this.setState({
            listItens: arr,
        });

        return arr;
    };

    fecthParceiros = async () => {
        let string = this.state.searchTextPerson;

        const tokenJson = await AsyncStorage.getItem('token')
        let token = null

        try {
            token = JSON.parse(tokenJson)
        } catch (e) {
            //tokenJson está inválido
        }

        try {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `token ${token}`

                const headers = {
                    'Authorization': 'token ' + token
                }

                const res = await axios.get('https://synnax.herokuapp.com/core/businessparters/?search=' + string, {
                    headers: headers
                });

                await this.setState({
                    listParceiros: res.data
                });
            } else {
                console.log('Token inválido')
            }

            return true;
        } catch (_err) {
            Toast.show({
                position: 'top',
                text: 'Nenhum parceiro encontrado!',
                buttonText: 'Ok',
                duration: 7000,
            });
            return false;
        }
    };

    getTotalItens = async () => {
        const { listItens } = this.state;
        var total = 0;
        var qtdItens = 0;

        for (var l = 0; l < listItens.length; l++) {
            if (listItens[l].item_cancel != 'S') {
                total = parseFloat(total) + parseFloat(listItens[l].total);
                qtdItens++;
            }
        }
        this.setState({
            totalItens: total,
            qtdItens: qtdItens,
        });
    };

    fecthItens = async () => {
        const { pedido_id } = this.state;
        try {
            var response = await sdk.get('/Cheff_BuscaItens/' + pedido_id);
            await this.tratsArrItens(response.data.result);
            await this.getTotalItens();
            return true;
        } catch (_err) {
            return false;
        }
    };

    novoParceiro = async item => {
        try {

            await this.props.navigation.navigate('novoParceiro');

            return true;
        } catch (_err) {
            return false;
        }
    };

    addPerson = async item => {
        const $this = this;
        const { pedido_id } = this.state;
        try {
            await sdk.get('/Cheff_GravaCliente/' + pedido_id + '/' + item.id_cliente);

            this.setState({
                cliente: item,
            });

            Toast.show({
                position: 'top',
                text: 'Adicionado com sucesso!',
                buttonText: 'Ok',
                duration: 7000,
            });

            setTimeout(function () {
                $this.setState({ spinner: false });
            }, 500);

            await this.setSeacrh('P');

            return true;
        } catch (_err) {
            setTimeout(function () {
                $this.setState({ spinner: false });
            }, 500);

            return false;
        }
    };

    fecthProduct = async () => {
        const string = await this.state.searchTextProduct;

        if (string == '') {
            Toast.show({
                position: 'top',
                text: 'Informe a descrição ou parte da descrição que deseja pesquisar!',
                buttonText: 'Ok',
                duration: 7000,
            });
        } else {
            try {
                var response = await sdk.get('/BuscaProdutos_NOVO/' + string);

                await this.setState({
                    listProduct: response.data.result[0]
                });

                return true;
            } catch (_err) {
                Toast.show({
                    position: 'top',
                    text: 'Nenhum produto encontrado!',
                    buttonText: 'Ok',
                    duration: 7000,
                });
                return false;
            }
        }
    };

    renderPerson = item => {
        const cliente = this.state.cliente;
        var background =
            item.id_cliente == cliente.id_cliente ? colors.blue : 'gray';
        const pf_pj = item.cpf_cnpj.length > 14 ? 'CNPJ:' : 'CPF:';
        return (
            <CardItem
                key={item.id_cliente + 'cliente'}
                style={{ borderRadius: 20, marginBottom: 10 }}>
                <Body>
                    <Text style={{ color: background }}>{item.nome}</Text>
                    <Text style={{ fontSize: 12, color: colors.blue2 }}>
                        {pf_pj} {item.cpf_cnpj}
                    </Text>
                </Body>
                <Right>
                    <Button onPress={() => this.addPerson(item)}
                        style={{
                            alignSelf: 'flex-end',
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: 40,
                            width: 40,
                            borderRadius: 40,
                            backgroundColor: colors.blue,
                            justifyContent: "center"
                        }}>
                        <Icon
                            style={{ marginLeft: 0, marginRight: 0, fontSize: 28 }}
                            name="add"
                        />
                    </Button>
                </Right>
            </CardItem>
        );
    };

    setSeacrh = (tipo = null) => {
        this.setState({
            tipo: tipo,
            search: true,
        });

        if (tipo == null) {
            return false;
        }

        return this.setState({
            tipo: tipo,
            search: true,
        });
    };

    showAction = async item => {
        var arr = ['Imprimir Item', 'Cancelar item', 'Voltar'];

        if (item.impresso == 'S') {
            arr = ['Reimprimir Item', 'Cancelar Item', 'Voltar'];
        }

        ActionSheet.show(
            {
                options: arr,
                title: 'Ações',
                destructiveButtonIndex: item.impresso == 'S' ? 1 : 1,
            },
            buttonIndex => {
                if (buttonIndex == 0) {
                    return this.printItem(item);
                }
                if (buttonIndex == 1) {
                    return this.cancelItem(item);
                }
            },
        );
        return;
    };

    cancelItem = async item => {
        const id_pre_venda_item = item.id_itemprev;
        await sdk.get('/Cheff_CancelaItem/' + id_pre_venda_item);
        await this.fecthItens();
        await this.totalItens();
        Toast.show({
            position: 'top',
            text: 'Item cancelado!',
            buttonText: 'Ok',
            duration: 7000,
        });
        return true;
    };

    totalItens = async () => {
        const { listItens } = this.state;
        let total = 0;
        var qtdItens = 0;

        for (var l = 0; l < listItens.length; l++) {
            if (listItens[l].item_cancel != 'S') {
                const t = parseFloat(total).toFixed(this.state.casasDecimaisPreco);
                const vlrI = parseFloat(listItens[l].total).toFixed(this.state.casasDecimaisPreco);
                total = parseFloat(parseFloat(t) + parseFloat(vlrI)).toFixed(this.state.casasDecimaisPreco);
                qtdItens++;
            }
        }

        console.log(total)
        this.setState({
            totalItens: total,
            qtdItens: qtdItens,
        });
    };

    renderListItem = (item, index) => {
        const desconto = parseFloat(item.desconto).toFixed(
            this.state.casasDecimaisPreco,
        );
        const observacao = item.observacao;
        const total = this.state.listItens.length;

        if (item.item_cancel == 'S') {
            return (
                <CardItem
                    key={item.id_itemprev + 'listitem'}
                    style={{ borderRadius: 20, marginTop: 10 }}>
                    <Text style={{ color: '#d2d3d5' }}>{parseInt(total - index)}</Text>
                    <Body style={{ marginLeft: 10 }}>
                        <Text
                            style={{
                                color: '#d2d3d5',
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                                textDecorationColor: '#000',
                            }}>
                            {item.descricao}
                        </Text>
                        <Text
                            note
                            numberOfLines={1}
                            style={{
                                fontSize: 12,
                                color: '#d2d3d5',
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                                textDecorationColor: '#000',
                            }}>
                            Qtd.{' '}
                            {utils.numberToReal(item.qtd, this.state.casasDecimaisQuantidade)}{' '}
                            {item.medida} | R${' '}
                            {utils.numberToReal(item.total, this.state.casasDecimaisPreco)}
                        </Text>
                        {observacao != '' && (
                            <Text
                                note
                                numberOfLines={1}
                                style={{
                                    fontSize: 12,
                                    color: '#d2d3d5',
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                    textDecorationColor: '#000',
                                }}>
                                Obs.: {observacao}
                            </Text>
                        )}
                    </Body>
                </CardItem>
            );
        }
        return (
            <Touchable onPress={() => this.showAction(item)}>
                <CardItem
                    key={item.id_itemprev + 'listitem'}
                    style={{ borderRadius: 20, marginTop: 10 }}>
                    <Text style={{ color: 'gray' }}>{parseInt(total - index)}</Text>
                    <Body style={{ marginLeft: 10 }}>
                        <Text style={{ color: colors.blue }}>{item.descricao}</Text>
                        <Text note numberOfLines={1} style={{ fontSize: 12 }}>
                            Qtd.{' '}
                            {utils.numberToReal(item.qtd, this.state.casasDecimaisQuantidade)}{' '}
                            {item.medida} | R${' '}
                            {utils.numberToReal(item.total, this.state.casasDecimaisPreco)}
                            {desconto > 0 && (
                                <Text style={{ fontSize: 12, color: 'gray' }}>
                                    {' '}
                  | Desc. R${' '}
                                    {utils.numberToReal(desconto, this.state.casasDecimaisPreco)}
                                </Text>
                            )}
                        </Text>
                        {observacao != '' && (
                            <Text
                                note
                                numberOfLines={1}
                                style={{ fontSize: 12, color: 'gray' }}>
                                Obs.: {observacao}
                            </Text>
                        )}
                    </Body>
                </CardItem>
            </Touchable>
        );
    };

    render() {
        const {
            listParceiros,
            listProduct,
            cliente,
            numero,
            listItens,
            totalItens,
            qtdItens,
            nomeCliente,
            tipo,
        } = this.state;
        const nome_cliente = cliente.nome ? cliente.nome : nomeCliente;
        const active = { backgroundColor: colors.blue2, color: '#fff' };
        const colorProdut = tipo == 'Pa' ? active : {};
        const colorFavoritos = tipo == 'F' ? active : {};
        const colorClientes = tipo == 'C' ? active : {};
        const colorItens = tipo == 'I' ? active : {};

        const getParceiros = (data, index) => {
            return {
                id: `${listParceiros[index].id}`,
                name: `${listParceiros[index].name}`,
                commercial_name: `${listParceiros[index].commercial_name}`,
                cpf: `${listParceiros[index].cpf}`,
                cnpj: `${listParceiros[index].cnpj}`,
                type_pj_pf: `${listParceiros[index].type_pj_pf}`,
                city_name: `${listParceiros[index].city_name}`,
                uf: `${listParceiros[index].uf}`,
                address: `${listParceiros[index].address}`,
                address_number: `${listParceiros[index].address_number}`,
                postal_code: `${listParceiros[index].postal_code}`,
                neighborhood: `${listParceiros[index].neighborhood}`,
                phone: `${listParceiros[index].phone}`,
                insc_estadual: `${listParceiros[index].insc_estadual}`,
                rg: `${listParceiros[index].rg}`,
            }
        }

        const getParceirosCount = (data) => {
            return listParceiros.length
        }

        const ItemParceiros = ({ id, name, commercial_name, cpf, cnpj, type_pj_pf, city_name, uf, address, address_number, postal_code, neighborhood, phone, insc_estadual, rg }) => {
            let item = `{"id": ${id}, "name": "${name}", "commercial_name": "${commercial_name}", "cpf": "${cpf}", "cnpj": "${cnpj}", "type_pj_pf": "${type_pj_pf}", "city_name": "${city_name}", "uf": "${uf}", "address": "${address}", "address_number": "${address_number}", "postal_code": "${postal_code}", "neighborhood": "${neighborhood}", "phone": "${phone}", "insc_estadual": "${insc_estadual}", "rg": "${rg}"}`;
            item = JSON.parse(item)

            return (
                <CardItem
                    key={id + 'parceiro'}
                    style={{ borderRadius: 20, marginBottom: 10 }}>
                    <Body>
                        <Text style={{ color: 'gray' }}>
                            {type_pj_pf == 'PF' ?
                                <Icon
                                    style={{
                                        color: colors.blue,
                                        fontSize: 20,
                                        zIndex: 999,
                                    }}
                                    name="star"
                                />
                                : ''}
                            {name}
                        </Text>
                        <Text style={{ fontSize: 12, color: colors.blue2 }}>
                            CPF: {cpf}
                        </Text>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('detalhesParceiros', {
                            parceiro: item,
                        })}
                            style={{
                                alignSelf: 'flex-end',
                                paddingTop: 0,
                                paddingBottom: 0,
                                height: 40,
                                width: 40,
                                borderRadius: 40,
                                backgroundColor: colors.blue,
                                justifyContent: "center"
                            }}>
                            <IconA
                                style={{ marginLeft: 0, marginRight: 0, fontSize: 28 }}
                                name="arrowright"
                            />
                        </Button>
                    </Right>
                </CardItem>
            );
        }

        return (
            <Container>
                <Header
                    hasTabs
                    style={{ backgroundColor: colors.blue }}
                    androidStatusBarColor={colors.blue}
                    iosBarStyle="light-content">
                    <Left>
                        <Button transparent onPress={() => this.clearTable()}>
                            <IconA name="arrowleft" style={{ color: '#fff', fontSize: 24 }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: '#fff' }}>Gerenciar</Title>
                        <Subtitle style={{ textTransform: 'capitalize', color: '#fff' }}>
                            {nome_cliente}
                        </Subtitle>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={{ backgroundColor: '#F5F3F2' }} >
                    <View style={{ backgroundColor: colors.blue }}>
                        <ViewNavigator>
                            <NavigatorContent>
                                <ScrollNavigator
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    <NavigatorBox
                                        key="parceiros"
                                        style={colorProdut}
                                        onPress={() => this.setSeacrh('Pa')}>
                                        <Image
                                            //   source={require('../../assets/images/all_group.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignSelf: 'center',
                                                tintColor: tipo == 'Pa' ? '#fff' : colors.blue2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                color: tipo == 'Pa' ? '#fff' : colors.blue2,
                                                top: -2,
                                                fontSize: 12,
                                            }}>
                                            Parceiros
                    </Text>
                                    </NavigatorBox>
                                    <NavigatorBox
                                        key="favoritos"
                                        style={colorFavoritos}
                                        onPress={() => this.fecthFavoritos()}>
                                        {/* this.setSeacrh('F') */}
                                        <Image
                                            //   source={require('../../assets/images/favorite_group.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignSelf: 'center',
                                                tintColor: tipo == 'F' ? '#fff' : colors.blue2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                color: tipo == 'F' ? '#fff' : colors.blue2,
                                                top: -2,
                                                fontSize: 12,
                                            }}>
                                            Produtos
                    </Text>
                                    </NavigatorBox>
                                    <NavigatorBox
                                        key="cliente"
                                        style={colorClientes}
                                        onPress={() => this.setSeacrh('C')}>
                                        <Image
                                            //   source={require('../../assets/images/cliente.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignSelf: 'center',
                                                tintColor: tipo == 'C' ? '#fff' : colors.blue2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                alignText: 'center',
                                                color: tipo == 'C' ? '#fff' : colors.blue2,
                                                top: -2,
                                                fontSize: 12,
                                            }}>
                                            Vendas
                    </Text>
                                    </NavigatorBox>
                                    <NavigatorBox
                                        key="itens-lancados"
                                        style={colorItens}
                                        onPress={() => this.setSeacrh('I')}>
                                        <Image
                                            //   source={require('../../assets/images/all_group.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignSelf: 'center',
                                                tintColor: tipo == 'I' ? '#fff' : colors.blue2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                alignText: 'center',
                                                color: tipo == 'I' ? '#fff' : colors.blue2,
                                                top: -2,
                                                fontSize: 12,
                                            }}>
                                            Finanças
                    </Text>
                                    </NavigatorBox>
                                </ScrollNavigator>
                            </NavigatorContent>
                        </ViewNavigator>
                    </View>
                    <View>
                        {tipo === 'Pa' && (
                            <View>
                                <View>
                                    <Item
                                        rounded
                                        style={{ margin: 10, left: 5, backgroundColor: '#fff' }}>
                                        <Input
                                            autoFocus
                                            placeholder="Buscar parceiros..."
                                            placeholderTextColor={colors.blue}
                                            onChangeText={this.handleSearchProductChange}
                                            onSubmitEditing={() => this.fecthParceiros()}
                                            value={this.state.searchTextParceiro}
                                            style={{
                                                height: 40,
                                                fontSize: 16,
                                            }}
                                        />
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.fecthParceiros();
                                            }}>
                                            <Icon
                                                name="search"
                                                style={{ fontWeight: 'bold', color: colors.blue2, fontSize: 24, marginRight: 16 }}
                                            />
                                        </Button>
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.resetSearch('Pa');
                                            }}>
                                            <Icon
                                                name="close"
                                                style={{ fontWeight: 'bold', color: colors.blue2, fontSize: 24, marginRight: 8 }}
                                            />
                                        </Button>
                                    </Item>
                                </View>
                                <View style={{ marginLeft: 10, marginRight: 10 }}>
                                    <VirtualizedList
                                        data={listParceiros}
                                        initialNumToRender={10}
                                        maxToRenderPerBatch={5}
                                        windowSize={4}
                                        renderItem={({ item }) =>
                                            <ItemParceiros
                                                id={item.id}
                                                name={item.name}
                                                commercial_name={item.commercial_name}
                                                cpf={item.cpf}
                                                cnpj={item.cnpj}
                                                type_pj_pf={item.type_pj_pf}
                                                city_name={item.city_name}
                                                uf={item.uf}
                                                address={item.address}
                                                address_number={item.address_number}
                                                postal_code={item.postal_code}
                                                neighborhood={item.neighborhood}
                                                phone={item.phone}
                                                insc_estadual={item.insc_estadual}
                                                rg={item.rg}
                                            />}
                                        keyExtractor={item => item.key}
                                        getItemCount={getParceirosCount}
                                        getItem={getParceiros}
                                    />
                                </View>
                            </View>
                        )}
                        {tipo === 'C' && (
                            <View>
                                <View>
                                    <Item
                                        rounded
                                        style={{ margin: 10, left: 5, backgroundColor: '#fff' }}>
                                        <Input
                                            autoFocus
                                            placeholder="Buscar cliente..."
                                            placeholderTextColor={colors.blue}
                                            onChangeText={this.handleSearchPersonChange}
                                            onSubmitEditing={() => this.fecthPerson()}
                                            value={this.state.searchTextPerson}
                                            style={{
                                                height: 40,
                                                fontSize: 16,
                                            }}
                                        />
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.fecthPerson();
                                            }}>
                                            <Icon
                                                name="ios-search"
                                                style={{ fontWeight: 'bold', color: colors.blue2 }}
                                            />
                                        </Button>
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.resetSearch('C');
                                            }}>
                                            <Icon
                                                name="close"
                                                style={{ fontWeight: 'bold', color: colors.blue2 }}
                                            />
                                        </Button>
                                    </Item>
                                </View>
                                <View style={{ marginLeft: 10, marginRight: 10 }}>
                                    {listPerson.length > 0 && listPerson.map(this.renderPerson)}
                                </View>
                            </View>
                        )}
                        {tipo === 'I' && (
                            <View>
                                {listItens.length > 0 && (
                                    <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Spinner
                                            visible={this.state.spinner}
                                            textContent={'Aguarde...'}
                                            textStyle={{ color: '#fff' }}
                                        />
                                        <View>
                                            {listItens.length > 0 &&
                                                listItens.map((data, index) =>
                                                    this.renderListItem(data, index),
                                                )}
                                        </View>
                                    </ScrollView>
                                )}
                                {listItens.length == 0 && (
                                    <View style={{ height: 480 }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                paddingTop: 50,
                                                color: 'gray',
                                            }}>
                                            Não existem itens lançados.
                    </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </Content>
                <Footer style={{ backgroundColor: colors.blue }}>
                    <View style={{ right: 22, top: 8, position: 'absolute' }}>
                        <Button
                            onPress={() => this.novoParceiro()}
                            style={{
                                backgroundColor: colors.blue2,
                                height: 35,
                                borderRadius: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                }}>
                                Novo Parceiro
                            </Text>
                        </Button>
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default Home;
