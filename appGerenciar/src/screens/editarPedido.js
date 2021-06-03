import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Body,
    Text,
    Tabs,
    Tab,
    Right,
    Picker,
    Content,
    CardItem,
    Footer,
    Form,
    Item,
    Label,
    View,
    Input,
    Toast,
    ActionSheet,
} from 'native-base';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from './colors';
import { BackHandler, StatusBar, Touchable } from 'react-native';
import utils from '../services/utils';
import session from '../session';
import { TOKEN } from '../variables';
import { server, showError, showSuccess } from '../common';
import axios from 'axios';
import { createPedido, itensOrder } from '../services/Vendas';

class editarPedido extends Component {
    constructor(properties) {
        super(properties);
        this.state = {
            spinner: false,
            action: false,
            name: '',
            id_cliente: 0,
            nameCliente: this.props.navigation.getParam('nameCliente'),
            unit_measure: '',
            sale_price: '',
            purchase_price: '',
            quantity: '',
            notes: this.props.navigation.getParam('notes'),
            listProduct: [],
            listClientes: [],
            listItens: [],
            salesorder: this.props.navigation.getParam('salesorder'),
            company: 0,
        };
    }

    componentDidMount() {
        console.log('editar')
        this.fecthItensOrder();
        console.log('depios')
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPressNovoPedido',
            this.onBackPress,
        );
    }

    componentDidUpdate() {
        if (this.state.salesorder > 0) {
            console.log('componentDidUpdate')
            this.fecthItensOrder(); // ver outra forma, não é correto aqui, toda hora executa
        }
    }

    onBackPress = () => {
        this.setState({ listProduct: [],  listItens: [], salesorder: 0, id_cliente: 0 });
        return this.props.navigation.navigate('Home', {tipo: 'V'}); //verificar se lançou itens, informar
    };

    handleCliente = async valor => {
        await this.setState({
            name: valor,
        });
    };

    handleUnitMeasure = async valor => {
        await this.setState({
            unit_measure: valor,
        });
    };

    handleSalePrice = async valor => {
        await this.setState({
            sale_price: valor,
        });
    };

    handlePurchasePrice = async valor => {
        await this.setState({
            purchase_price: valor,
        });
    };

    handleQuantity = async valor => {
        await this.setState({
            quantity: valor,
        });
    };

    handleNotes = async valor => {
        await this.setState({
            notes: valor,
        });
    };

    fecthClientes = async () => {
        let string = this.state.searchTextCliente;

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
                    listClientes: res.data
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

    fecthItensOrder = async () => {
        const $this = this;
        try {
            await itensOrder(this.state.salesorder).then(function (response) {

                if (response) {
                    $this.setState({ listItens: response });
                    return true;
                }

                Toast.show({
                    position: 'top',
                    text: 'Ocorreu um erro ao listar os itens do pedido, tente novamente!',
                    buttonText: 'Ok',
                    duration: 5000,
                });
            });
        } catch (e) {
            this.setState({
                spinner: false,
            });
            Toast.show({
                position: 'top',
                text: 'Ocorreu um erro tente novamente!',
                buttonText: 'Ok',
                duration: 5000,
            });
        }
    };

    salvar = async () => {
        try {

            var record = {};
            // this.setState({
            //     spinner: true,
            // });

            record.customer = this.state.id_cliente;
            record.status = 'E';
            record.notes = this.state.notes;

            const $this = this;

            await createPedido(record).then(function (response) {
                // $this.setState({
                //     spinner: false,
                // });

                //retorno:
                //{"id":17,"customer_name":"Luciane Amelia Conte Bourchardt","ordered_date":"16/04/2021","status_description":"Editando","block_edit":false,"block_delete":false,
                //"number":17,"date":"2021-04-16T21:45:09.877876-03:00","notes":"Hgg","status":"E","total_value":"0.00","company":1,"customer":7}

                console.log(response)
                if (response) {
                    Toast.show({
                        position: 'top',
                        text: 'Pedido criado com sucesso! Lançe os itens.',
                        buttonText: 'Ok',
                        duration: 5000,
                    });
                    $this.setState({ salesorder: response.id });
                    $this.setState({ company: response.company });
                    //return $this.props.navigation.navigate('Home'); //ver se consegue selecionar a aba Produtos
                    return true;
                }

                Toast.show({
                    position: 'top',
                    text: 'Ocorreu um erro ao criar o pedido, tente novamente!',
                    buttonText: 'Ok',
                    duration: 5000,
                });
            });
        } catch (e) {
            this.setState({
                spinner: false,
            });
            Toast.show({
                position: 'top',
                text: 'Ocorreu um erro tente novamente!',
                buttonText: 'Ok',
                duration: 5000,
            });
        }
    };

    confirmaCliente = (id, name) => {
        this.setState({ id_cliente: id });
        this.setState({ nameCliente: name })
        this.setState({ listClientes: '' });
        Toast.show({
            position: 'top',
            text: 'Cliente atribuído ao pedido!',
            buttonText: 'Ok',
            duration: 3000,
        });
    }

    renderClientes = item => {
        return (
            <CardItem
                key={item.id + 'cliente'}
                style={{ borderRadius: 20, marginBottom: 10 }}>
                <Body>
                    <Text style={{ color: 'gray' }}>
                        {item.name}
                    </Text>
                </Body>
                <Right>
                    <Button onPress={() => this.confirmaCliente(item.id, item.name)}
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
                        <Icon
                            style={{ marginLeft: 0, marginRight: 0, fontSize: 28, color: '#fff' }}
                            name="done"
                        />
                    </Button>
                </Right>
            </CardItem>
        );
    };

    renderProdutos = item => {
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
                    <Button onPress={() => this.props.navigation.navigate('addItem', {
                        produto: item,
                        salesorder: this.state.salesorder,
                        company: this.state.company,
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
                        <Icon
                            style={{ marginLeft: 0, marginRight: 0, fontSize: 28, color: '#fff' }}
                            name="add"
                        />
                    </Button>
                </Right>
            </CardItem>
        );
    };

    resetSearch = tipo => {
        if (tipo == 'Pa') {
            this.setState({
                searchTextParceiro: [],
                listClientes: '',
            });
        }

        if (tipo == 'P') {
            this.setState({
                searchTextProduct: [],
                listProduct: '',
            });
        }

        return true;
    };

    renderListItem = (item, index) => {

        const total = this.state.listItens.length;
        console.log('Total = ' + total)

        return (
            // <Touchable onPress={() => this.showAction(item)}></Touchable> 
            <View>
                <CardItem
                    key={item.id + 'listitem'}
                    style={{ borderRadius: 20, marginTop: 10 }}>
                    <Text style={{ color: 'gray' }}>{parseInt(total - index)}</Text>
                    <Body style={{ marginLeft: 10 }}>
                        <Text>{item.product_name}</Text>
                        <Text note numberOfLines={1} style={{ fontSize: 12 }}>
                            Qtd.{' '}
                            {utils.numberToReal(item.quantity, this.state.casasDecimaisQuantidade)}{' '}
                            {item.unit_measure} | R${' '}
                            {utils.numberToReal(item.total_value, this.state.casasDecimaisPreco)}
                        </Text>
                    </Body>
                </CardItem>
            </View>
            // </Touchable>
        );
    };

    render() {
        const { listProduct, listClientes, listItens } = this.state;

        return (
            <Container style={{ backgroundColor: colors.white }}>
                {/* <Spinner
          visible={this.state.spinner}
          textContent={'Aguarde...'}
          textStyle={{color: colors.color2}}
        /> */}
                <Header
                    hasTabs
                    style={{ backgroundColor: colors.white, borderBottomWidth: 0 }}
                    androidStatusBarColor={colors.blue2}>
                    <StatusBar backgroundColor={colors.blue2} />
                    <Left>
                        <Button transparent onPress={() => this.onBackPress()}>
                            <Icon name="arrow-back" style={{ color: colors.blue2, fontSize: 24 }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                        <Title style={{ color: colors.blue2 }}>Editar Pedido {this.state.salesorder}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.blue2 }}>
                        <Tab
                            heading="Cliente / Obs"
                            textStyle={{ color: colors.gray }}
                            style={{ backgroundColor: colors.white }}
                            activeTextStyle={{ color: colors.blue2, fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: colors.white }}
                            tabStyle={{ backgroundColor: '#fff' }}>
                            <View padder>
                                <Form>
                                    {/* <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Cliente</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.name}
                                            onChangeText={this.handleCliente}
                                        />
                                    </Item> */}
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Cliente</Label>
                                        <Label style={{ color: colors.gray }}>{this.state.nameCliente}</Label>
                                        <Label style={{ color: colors.blue2 }}>Observações</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.notes}
                                            onChangeText={this.handleNotes}
                                        />
                                    </Item>
                                </Form>
                            </View>
                        </Tab>
                        {/* deixar essa tab desativada, só ativar depois de definir cliente */}
                        <Tab
                            heading="Produtos"
                            textStyle={{ color: colors.gray }}
                            style={{ backgroundColor: colors.white }}
                            activeTextStyle={{ color: colors.blue2, fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: colors.white }}
                            tabStyle={{ backgroundColor: '#fff' }}>
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
                                {listProduct.length > 0 && listProduct.map(this.renderProdutos)}
                            </View>
                        </Tab>
                        <Tab
                            heading="Itens Lançados"
                            textStyle={{ color: colors.gray }}
                            style={{ backgroundColor: colors.white }}
                            activeTextStyle={{ color: colors.blue2, fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: colors.white }}
                            tabStyle={{ backgroundColor: '#fff' }}>
                            <View padder>
                                <View>
                                    <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
                                        {listItens.length > 0 &&
                                            listItens.map((data, index) =>
                                                this.renderListItem(data, index),
                                            )}
                                    </ScrollView>
                                </View>
                            </View>
                        </Tab>
                    </Tabs>
                </Content>
                <Footer style={{ backgroundColor: colors.white }}>
                    {this.state.salesorder == 0 ?
                        <Button
                            onPress={() => {
                                this.salvar();
                            }}
                            block
                            rounded
                            style={{ backgroundColor: colors.blue2, width: 150 }}>
                            <Text style={{ textTransform: 'capitalize', color: '#fff' }}>
                                Criar pedido
                        </Text>
                        </Button>
                        :
                        <Text style={{ color: colors.gray, marginLeft: -170, marginTop: 12 }}>{this.state.listItens.length} Iten(s) Lançado(s)</Text>
                    }
                </Footer>
            </Container>
        );
    }
}

export default editarPedido;
