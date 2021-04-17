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
    Footer,
    Form,
    Item,
    Label,
    View,
    Input,
    Toast,
    ActionSheet,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from './colors';
//import Spinner from 'react-native-loading-spinner-overlay';
import { TextInputMask } from 'react-native-masked-text';
import { BackHandler, StatusBar } from 'react-native';
import { createProduto } from '../services/Produto';
import utils from '../services/utils';
import { color } from 'react-native-reanimated';
import session from '../session';
import { TOKEN } from '../variables';
import { server, showError, showSuccess } from '../common';
import axios from 'axios';

class novoProduto extends Component {
    constructor(properties) {
        super(properties);
        this.state = {
            spinner: false,
            action: false,
            name: '',
            unit_measure: '',
            sale_price: '',
            purchase_price: '',
            quantity: '',
            notes: '',
        };
    }

    async componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPressNovoParceiro',
            this.onBackPress,
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPressNovoPeiddo',
            this.onBackPress,
        );
    }

    onBackPress = () => {
        var BUTTONS = ['Não', 'Sim'];
        var DESTRUCTIVE_INDEX = 1;
        var CANCEL_INDEX = 1;

        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: 'Deseja sair sem salvar as alterações?',
            },
            buttonIndex => {
                if (buttonIndex == 1) {
                    return this.props.navigation.navigate('Home');
                }
            },
        );

        if (this.props.navigation && this.props.navigation.goBack) {
            return true;
        }
        return false;
    };

    handleName = async valor => {
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

    salvar = async () => {
        try {
            if (this.state.name == '') {
                return Toast.show({
                    position: 'top',
                    text: 'Infome a descrição do produto!',
                    buttonText: 'Ok',
                    duration: 7000,
                });
            }

            var record = {};
            this.setState({
                spinner: true,
            });
            
            record.name = this.state.name;
            record.unit_measure = this.state.unit_measure;
            record.sale_price = this.state.sale_price;
            record.purchase_price = this.state.purchase_price;
            record.quantity = this.state.quantity;
            record.notes = this.state.notes;

            const $this = this;

            await createProduto(record).then(function (response) {
                $this.setState({
                    spinner: false,
                });

                if (response) {
                    Toast.show({
                        position: 'top',
                        text: 'Salvo com sucesso!',
                        buttonText: 'Ok',
                        duration: 7000,
                    });
                    return $this.props.navigation.navigate('Home');
                }

                Toast.show({
                    position: 'top',
                    text: 'Ocorreu um erro ao salvar, tente novamente!',
                    buttonText: 'Ok',
                    duration: 7000,
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
                duration: 7000,
            });
        }
    };

    render() {
        // const { tipos, pfpj, ufs, cidades } = this.state;
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
                        <Title style={{ color: colors.blue2 }}>Novo Produto</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.blue2 }}>
                        <Tab
                            heading="Dados"
                            textStyle={{ color: colors.gray }}
                            style={{ backgroundColor: colors.white }}
                            activeTextStyle={{ color: colors.blue2, fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: colors.white }}
                            tabStyle={{ backgroundColor: '#fff' }}>
                            <View padder>
                                <Form>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Descrição</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.name}
                                            onChangeText={this.handleName}
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Unidade de Medida</Label> 
                                        {/* Ver se tem que criar combo pra escolher */}
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.unit_measure}
                                            onChangeText={this.handleUnitMeasure}
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Preço de Venda</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.sale_price}
                                            onChangeText={this.handleSalePrice}
                                            keyboardType="numeric"
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Preço de Custo</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.purchase_price}
                                            onChangeText={this.handlePurchasePrice}
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Quantidade</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.quantity}
                                            onChangeText={this.handleQuantity}
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel>
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
                    </Tabs>
                </Content>
                <Footer style={{ backgroundColor: colors.white }}>
                    <Button
                        onPress={() => {
                            this.salvar();
                        }}
                        block
                        rounded
                        style={{ backgroundColor: colors.blue2, width: 150 }}>
                        <Text style={{ textTransform: 'capitalize', color: '#fff' }}>
                            Salvar
            </Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

export default novoProduto;
