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
import axios from 'axios'
import { TOKEN } from '../variables';
import { server, showError, showSuccess } from '../common'
import session from '../session';
import {
    NavigatorBox,
    NavigatorContent,
    ScrollNavigator,
    ViewNavigator,
} from '../components/BottomNavigator/styled';

import Icon from 'react-native-vector-icons/MaterialIcons'
import IconA from 'react-native-vector-icons/AntDesign'

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
            searchTextParceiro: '',
            searchTextPedido: '',
            listParceiros: [],
            listProduct: [],
            listPedidos: [],
            cliente: {},
            totalItens: 0,
            qtdItens: 0,
            spinner: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log('componentDidMount')

        var tipoMenu = this.props.navigation.getParam('tipo');
        console.log(tipoMenu)
        if (tipoMenu != undefined) {
            console.log('entrou')
            this.setState({ tipo: tipoMenu });
            if (tipoMenu == 'P') {
                this.fecthProduct();
            }
        }

        // this.focusListener = navigation.addListener('didFocus', async () => {
        //     this.fecthItens();
        // });
    }

    resetSearch = tipo => {
        if (tipo == 'Pa') {
            this.setState({
                searchTextParceiro: [],
                listParceiros: '',
            });
        }

        if (tipo == 'P') {
            this.setState({
                searchTextProduct: [],
                listProduct: '',
            });
        }

        if (tipo == 'V') {
            this.setState({
                searchTextPedido: [],
                listPedidos: '',
            });
        }

        return true;
    };

    handleSearchParceiroChange = string => {
        this.setState({ searchTextParceiro: string });
    };

    handleSearchProductChange = string => {
        this.setState({ searchTextProduct: string });
    };

    handleSearchPedidoChange = string => {
        this.setState({ searchTextPedido: string });
    };

    fecthParceiros = async () => {
        let string = this.state.searchTextParceiro;

        let token = await session.get(TOKEN);

        try {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `token ${token}`

                const headers = {
                    'Authorization': 'token ' + token
                }

                const res = await axios.get(`${server}/core/businessparters/?search=` + string, {
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

    novoProduto = async item => {
        try {

            await this.props.navigation.navigate('novoProduto');

            return true;
        } catch (_err) {
            return false;
        }
    };

    novoPedido = async item => {
        try {

            await this.props.navigation.navigate('novoPedido');

            return true;
        } catch (_err) {
            return false;
        }
    };

    fecthProduct = async () => {
        const string = await this.state.searchTextProduct;

        let token = await session.get(TOKEN);

        try {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `token ${token}`

                const headers = {
                    'Authorization': 'token ' + token
                }

                const res = await axios.get(`${server}/core/products/`, {
                    headers: headers
                });

                await this.setState({
                    listProduct: res.data
                });
            } else {
                console.log('Token inválido')
            }

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
    };

    fecthPedidos = async () => {
        const string = await this.state.searchTextPedido;

        let token = await session.get(TOKEN);

        try {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `token ${token}`

                const headers = {
                    'Authorization': 'token ' + token
                }

                const res = await axios.get(`${server}/sale/salesorder/`, {
                    headers: headers
                });

                console.log(res.data)
                await this.setState({
                    listPedidos: res.data
                });
            } else {
                console.log('Token inválido')
            }

            return true;
        } catch (_err) {
            Toast.show({
                position: 'top',
                text: 'Nenhum pedido encontrado!',
                buttonText: 'Ok',
                duration: 7000,
            });
            return false;
        }
    };

    formataDoc(Doc) {
        if (Doc.length == 0) {
            return '';
        } else if (Doc.length == 11) {
            return Doc.substring(0, 3) + '.' + Doc.substring(3, 6) + '.' + Doc.substring(6, 9) + '-' + Doc.substring(9, 11);
        } else {
            return Doc.substring(0, 2) + '.' + Doc.substring(2, 5) + '.' + Doc.substring(5, 8) + '/' + Doc.substring(8, 12) + "-" + Doc.substring(12, 14);
        }
    }

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
            listItens,
            listPedidos,
            nomeCliente,
            tipo,
        } = this.state;
        const nome_cliente = cliente.nome ? cliente.nome : nomeCliente;
        const active = { backgroundColor: colors.blue2, color: '#fff' };
        const colorParceiros = tipo == 'Pa' ? active : {};
        const colorProdutos = tipo == 'P' ? active : {};
        const colorVendas = tipo == 'V' ? active : {};
        const colorFinancas = tipo == 'F' ? active : {};

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
                cell_phone: `${listParceiros[index].cell_phone}`,
                insc_estadual: `${listParceiros[index].insc_estadual}`,
                rg: `${listParceiros[index].rg}`,
                email: `${listParceiros[index].email}`,
            }
        }

        const getParceirosCount = (data) => {
            return listParceiros.length
        }

        const ItemParceiros = ({ id, name, commercial_name, cpf, cnpj, type_pj_pf, city_name, uf, address, address_number, postal_code, neighborhood, phone, cell_phone, insc_estadual, rg, email }) => {
            let item = `{"id": ${id}, "name": "${name}", "commercial_name": "${commercial_name}", "cpf": "${cpf}", "cnpj": "${cnpj}", "type_pj_pf": "${type_pj_pf}", "city_name": "${city_name}", "uf": "${uf}", "address": "${address}", "address_number": "${address_number}", "postal_code": "${postal_code}", "neighborhood": "${neighborhood}", "phone": "${phone}", "cell_phone": "${cell_phone}", "insc_estadual": "${insc_estadual}", "rg": "${rg}", "email": "${email}"}`;
            item = JSON.parse(item)

            return (
                <CardItem
                    key={item.id + 'parceiro'}
                    style={{ borderRadius: 20, marginBottom: 10 }}>
                    <Body>
                        <Text style={{ color: 'gray' }}>
                            {item.name}
                        </Text>
                        <Text style={{ fontSize: 12, color: colors.blue2 }}>
                            {item.type_pj_pf == 'PF' ? `CPF : ${this.formataDoc(item.cpf)}` : `CNPJ : ${this.formataDoc(item.cnpj)}`}
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
                                backgroundColor: colors.blue2,
                                justifyContent: "center"
                            }}>
                            <IconA
                                style={{ marginLeft: 0, marginRight: 0, fontSize: 28, color: '#fff' }}
                                name="arrowright"
                            />
                        </Button>
                    </Right>
                </CardItem>
            );
        }

        const getProdutos = (data, index) => {
            return {
                id: `${listProduct[index].id}`,
                name: `${listProduct[index].name}`,
                active: `${listProduct[index].active}`,
                company: `${listProduct[index].company}`,
                notes: `${listProduct[index].notes}`,
                purchase_price: `${listProduct[index].purchase_price}`,
                quantity: `${listProduct[index].quantity}`,
                sale_price: `${listProduct[index].sale_price}`,
                unit_measure: `${listProduct[index].unit_measure}`,
            }
        }

        const getProdutosCount = (data) => {
            return listProduct.length
        }

        const ItemProdutos = ({ id, name, active, company, notes, purchase_price, quantity, sale_price, unit_measure }) => {
            let item = `{"id": ${id}, "name": "${name}", "active": ${active}, "company": "${company}", "notes": "${notes}", "purchase_price": "${purchase_price}", "quantity": "${quantity}", "sale_price": "${sale_price}", "unit_measure": "${unit_measure}"}`;
            item = JSON.parse(item)

            return (
                <CardItem
                    key={item.id + 'produto'}
                    style={{ borderRadius: 20, marginBottom: 10 }}>
                    <Body>
                        <Text style={{ color: 'gray' }}>
                            {item.name}
                        </Text>
                        <Text style={{ fontSize: 12, color: colors.blue2 }}>
                            Qtd: {utils.numberToReal(item.quantity, this.state.casasDecimaisQuantidade)}{' '} |
                    R$:{' '}
                            {utils.numberToReal(item.sale_price, this.state.casasDecimaisPreco)}{' '} | {item.unit_measure}
                        </Text>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('detalhesProdutos', {
                            produto: item,
                        })}
                            style={{
                                alignSelf: 'flex-end',
                                paddingTop: 0,
                                paddingBottom: 0,
                                height: 40,
                                width: 40,
                                borderRadius: 40,
                                backgroundColor: colors.blue2,
                                justifyContent: "center"
                            }}>
                            <IconA
                                style={{ marginLeft: 0, marginRight: 0, fontSize: 28, color: '#fff' }}
                                name="arrowright"
                            />
                        </Button>
                    </Right>
                </CardItem>
            );
        }

        const getPedidos = (data, index) => {
            return {
                id: `${listPedidos[index].id}`,
                company: `${listPedidos[index].company}`,
                customer: `${listPedidos[index].customer}`,
                customer_name: `${listPedidos[index].customer_name}`,
                date: `${listPedidos[index].date}`,
                number: `${listPedidos[index].number}`,
                status: `${listPedidos[index].status}`,
                status_description: `${listPedidos[index].status_description}`,
                notes: `${listPedidos[index].notes}`,
                total_value: `${listPedidos[index].total_value}`,
            }
        }

        const getPedidosCount = (data) => {
            return listPedidos.length
        }

        const ItemPedidos = ({ id, company, customer, customer_name, date, number, status, status_description, notes, total_value }) => {
            let item = `{"id": ${id}, "company": "${company}", "customer": ${customer}, "customer_name": "${customer_name}", "date": "${date}", "number": "${number}", "status": "${status}", "status_description": "${status_description}", "notes": "${notes}", "total_value": "${total_value}"}`;
            item = JSON.parse(item)

            return (
                <CardItem
                    key={item.id + 'pedido'}
                    style={{ borderRadius: 20, marginBottom: 10 }}>
                    <Body>
                        <Text style={{ color: 'gray' }}>
                            {("0000000000" + item.number).slice(-10)}
                        </Text>
                        <Text style={{ fontSize: 12, color: colors.blue2 }}>
                            Cliente: {item.customer_name}{' '} |
                     R$:{' '}
                            {utils.numberToReal(item.total_value, this.state.casasDecimaisPreco)}
                        </Text>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('detalhesPedido', {
                            pedido: item,
                        })}
                            style={{
                                alignSelf: 'flex-end',
                                paddingTop: 0,
                                paddingBottom: 0,
                                height: 40,
                                width: 40,
                                borderRadius: 40,
                                backgroundColor: colors.blue2,
                                justifyContent: "center"
                            }}>
                            <IconA
                                style={{ marginLeft: 0, marginRight: 0, fontSize: 28, color: '#fff' }}
                                name="arrowright"
                            />
                        </Button>
                    </Right>
                </CardItem>
            );
        }

        let botaoNovo;
        if (tipo == 'Pa') {
            botaoNovo =
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
        }
        if (tipo == 'P') {
            botaoNovo =
                <Button
                    onPress={() => this.novoProduto()}
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
                        Novo Produto
                        </Text>
                </Button>
        }
        if (tipo == 'V') {
            botaoNovo =
                <Button
                    onPress={() => this.novoPedido()}
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
                        Novo Pedido de Venda
                            </Text>
                </Button>
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
                            {/* Buscar nomo do usuário logado */}
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
                                        style={colorParceiros}
                                        onPress={() => this.setSeacrh('Pa')}>
                                        <Image
                                            source={require('../../assets/imgs/parceiros.png')}
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
                                        key="produtos"
                                        style={colorProdutos}
                                        onPress={() => this.setSeacrh('P')}>
                                        <Image
                                            source={require('../../assets/imgs/estoque.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignSelf: 'center',
                                                tintColor: tipo == 'P' ? '#fff' : colors.blue2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                color: tipo == 'P' ? '#fff' : colors.blue2,
                                                top: -2,
                                                fontSize: 12,
                                            }}>
                                            Produtos
                    </Text>
                                    </NavigatorBox>
                                    <NavigatorBox
                                        key="Vendas"
                                        style={colorVendas}
                                        onPress={() => this.setSeacrh('V')}>
                                        <Image
                                            source={require('../../assets/imgs/vendas.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                alignSelf: 'center',
                                                tintColor: tipo == 'V' ? '#fff' : colors.blue2,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                alignText: 'center',
                                                color: tipo == 'V' ? '#fff' : colors.blue2,
                                                top: -2,
                                                fontSize: 12,
                                            }}>
                                            Vendas
                    </Text>
                                    </NavigatorBox>
                                    <NavigatorBox
                                        key="financass"
                                        style={colorFinancas}
                                        onPress={() => this.setSeacrh('F')}>
                                        <Image
                                            source={require('../../assets/imgs/financas.png')}
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
                                                alignItems: 'center',
                                                alignText: 'center',
                                                color: tipo == 'F' ? '#fff' : colors.blue2,
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
                                            onChangeText={this.handleSearchParceiroChange}
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
                                                cell_phone={item.cell_phone}
                                                insc_estadual={item.insc_estadual}
                                                rg={item.rg}
                                                email={item.email}
                                            />}
                                        keyExtractor={item => item.key}
                                        getItemCount={getParceirosCount}
                                        getItem={getParceiros}
                                    />
                                </View>
                            </View>
                        )}
                        {tipo === 'P' && (
                            <View>
                                <View>
                                    <Item
                                        rounded
                                        style={{ margin: 10, left: 5, backgroundColor: '#fff' }}>
                                        <Input
                                            autoFocus
                                            placeholder="Buscar produtos..."
                                            placeholderTextColor={colors.blue}
                                            onChangeText={this.handleSearchProductChange}
                                            onSubmitEditing={() => this.fecthProduct()}
                                            value={this.state.searchTextProduct}
                                            style={{
                                                height: 40,
                                                fontSize: 16,
                                            }}
                                        />
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.fecthProduct();
                                            }}>
                                            <Icon
                                                name="search"
                                                style={{ fontWeight: 'bold', color: colors.blue2, fontSize: 24, marginRight: 16 }}
                                            />
                                        </Button>
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.resetSearch('P');
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
                                        data={listProduct}
                                        initialNumToRender={10}
                                        maxToRenderPerBatch={5}
                                        windowSize={4}
                                        renderItem={({ item }) =>
                                            <ItemProdutos
                                                id={item.id}
                                                name={item.name}
                                                active={item.active}
                                                company={item.company}
                                                notes={item.notes}
                                                purchase_price={item.purchase_price}
                                                quantity={item.quantity}
                                                sale_price={item.sale_price}
                                                unit_measure={item.unit_measure}
                                            />}
                                        keyExtractor={item => item.key}
                                        getItemCount={getProdutosCount}
                                        getItem={getProdutos}
                                    />
                                </View>
                            </View>
                        )}
                        {tipo === 'V' && (
                            <View>
                                <View>
                                    <Item
                                        rounded
                                        style={{ margin: 10, left: 5, backgroundColor: '#fff' }}>
                                        <Input
                                            autoFocus
                                            placeholder="Buscar pedidos..."
                                            placeholderTextColor={colors.blue}
                                            onChangeText={this.handleSearchPedidoChange}
                                            onSubmitEditing={() => this.fecthPedidos()}
                                            value={this.state.searchTextPedido}
                                            style={{
                                                height: 40,
                                                fontSize: 16,
                                            }}
                                        />
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.fecthPedidos();
                                            }}>
                                            <Icon
                                                name="search"
                                                style={{ fontWeight: 'bold', color: colors.blue2, fontSize: 24, marginRight: 16 }}
                                            />
                                        </Button>
                                        <Button
                                            transparent
                                            onPress={() => {
                                                this.resetSearch('V');
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
                                        data={listPedidos}
                                        initialNumToRender={10}
                                        maxToRenderPerBatch={5}
                                        windowSize={4}
                                        renderItem={({ item }) =>
                                            <ItemPedidos
                                                id={item.id}
                                                company={item.company}
                                                customer={item.customer}
                                                customer_name={item.customer_name}
                                                date={item.date}
                                                number={item.number}
                                                status={item.status}
                                                status_description={item.status_description}
                                                notes={item.notes}
                                                total_value={item.total_value}
                                            />}
                                        keyExtractor={item => item.key}
                                        getItemCount={getPedidosCount}
                                        getItem={getPedidos}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </Content>
                <Footer style={{ backgroundColor: colors.blue }}>
                    <View style={{ right: 22, top: 8, position: 'absolute' }}>
                        {botaoNovo}
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default Home;
