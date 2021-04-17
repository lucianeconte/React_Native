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
import { createParceiro } from '../services/Parceiro';
import utils from '../services/utils';
import { color } from 'react-native-reanimated';
import session from '../session';
import { TOKEN } from '../variables';
import { server, showError, showSuccess } from '../common';
import axios from 'axios';

class novoParceiro extends Component {
    constructor(properties) {
        super(properties);
        this.state = {
            spinner: false,
            action: false,
            cpf: '',
            cnpj: '',
            rg: '',
            commercial_name: '',
            name: '',
            type_of_bp: '',
            type_pj_pf: '',
            address: '',
            address_number: '',
            neighborhood: '',
            uf: '',
            city: '',
            city_name: '',
            postal_code: '',
            phone: '',
            cell_phone: '',
            email: '',
            tipos: [
                'Cliente',
                'Fornecedor',
                'Cliente e Fornecedor',
            ],
            pfpj: [
                'Física',
                'Jurídica',
            ],
            cidades: [],
            ufs: [
                'AC',
                'AL',
                'AP',
                'AM',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MT',
                'MS',
                'MG',
                'PR',
                'PB',
                'PA',
                'PE',
                'PI',
                'RN',
                'RS',
                'RJ',
                'RO',
                'RR',
                'SC',
                'SE',
                'SP',
                'TO',
            ]
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

    handleCpf = async valor => {
        await this.setState({
            cpf: valor,
        });
    };

    handleCNPJ = async valor => {
        await this.setState({
            cnpj: valor,
        });
    };

    handleRG = async valor => {
        await this.setState({
            rg: valor,
        });
    };

    handleInscEstad = async valor => {
        await this.setState({
            insc_estadual: valor,
        });
    };

    handleName = async valor => {
        await this.setState({
            name: valor,
        });
    };

    handleComercialName = async valor => {
        await this.setState({
            commercial_name: valor,
        });
    };

    handleTypeOfBP = async valor => {
        await this.setState({
            type_of_bp: valor,
        });
    };

    handleTypePFPJ = async valor => {
        await this.setState({
            type_pj_pf: valor,
        });
    };

    handleAdrress = async valor => {
        await this.setState({
            address: valor,
        });
    };

    handleAdrressNumber = async valor => {
        await this.setState({
            address_number: valor,
        });
    };

    handleNeighborhood = async valor => {
        await this.setState({
            neighborhood: valor,
        });
    };

    handleCity = async valor => {
        await this.setState({
            city: valor,
            city_name: this.state.cidades.label,
        });
    };

    handlePostalCode = async valor => {
        await this.setState({
            postal_code: valor,
        });
    };

    handlePhone = async valor => {
        await this.setState({
            phone: valor,
        });
    };

    handleUF = async valor => {
        await this.setState({
            uf: valor,
        });

        await this.getCidade();
    };

    handleCellPhone = async valor => {
        await this.setState({
            cell_phone: valor,
        });
    };

    handleEmail = async valor => {
        await this.setState({
            email: valor,
        });
    };

    getCidade = async () => {
        const { uf } = this.state;
        let listCidades = [];

        let token = await session.get(TOKEN);
        try {
            var config = {
                method: 'get',
                url: `${server}/core/cities/uf/` + uf,
                headers: {
                    'authorization': 'token ' + token,
                    'content-type': 'application/json;charset=UTF-8'
                }
            };

            await axios(config)
                .then(function (response) {
                    listCidades = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

            this.setState({
                cidades: listCidades
            });

            return true;
        } catch (_err) {
            console.log('Erro ao buscar cidades');
            return false;
        }
    };

    salvar = async () => {
        try {
            if (this.state.name == '') {
                return Toast.show({
                    position: 'top',
                    text: 'Infome o nome/razão social!',
                    buttonText: 'Ok',
                    duration: 7000,
                });
            }

            if (this.state.address == '') {
                return Toast.show({
                    position: 'top',
                    text: 'Infome o Logradouro!',
                    buttonText: 'Ok',
                    duration: 7000,
                });
            }

            var record = {};
            this.setState({
                spinner: true,
            });

            //   {
            //     "id": 10,
            //     "uf": "SC",
            //     "city_name": "Concórdia",
            //     "name": "Victor",
            //     "commercial_name": "",
            //     "type_of_bp": "CL",
            //     "type_pj_pf": "PF",
            //     "cnpj": "",
            //     "cpf": "",
            //     "rg": "",
            //     "insc_estadual": "",
            //     "address": "Rua Cesar Fratini",
            //     "address_number": "61",
            //     "neighborhood": "Salete",
            //     "phone": "",
            //     "postal_code": "",
            //     "company": 1,
            //     "city": 4204301
            // }
            
            record.name = this.state.name;
            record.commercial_name = this.state.commercial_name;
            record.cpf = this.state.cpf.replace(/\D/g, '');
            record.cnpj = this.state.cnpj.replace(/\D/g, '');
            record.rg = this.state.rg;
            record.insc_estadual = this.state.insc_estadual;
            record.email = this.state.email;
            record.type_of_bp = this.state.type_of_bp.length > 10 ? 'CF' : this.state.type_of_bp.substring(0, 2).toUpperCase(); 
            record.type_pj_pf = this.state.type_pj_pf == 'Jurídica' ? 'PJ' : 'PF';
            record.address = this.state.address;
            record.address_number = this.state.address_number;
            record.neighborhood = this.state.neighborhood;
            record.postal_code = this.state.postal_code.replace(/\D/g, '');
            record.city = this.state.city;
            record.city_name = this.state.city_name;
            record.phone = this.state.phone.split(')')[0]
                ? this.state.phone.split(')')[0].replace('(', '') + this.state.phone.split(')')[1]
                : '';
            record.cell_phone = this.state.cell_phone.split(')')[0]
                ? this.state.cell_phone.split(')')[0].replace('(', '') + this.state.cell_phone.split(')')[1]
                : '';

            const $this = this;

            await createParceiro(record).then(function (response) {
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

    renderTipos = item => (
        <Picker.Item label={item} key={item + 'tipo'} value={item} />
    );

    renderTipoPFPJ = item => (
        <Picker.Item label={item} key={item + 'tipopfpj'} value={item} />
    );

    renderUFs = item => (
        <Picker.Item label={item} key={item + 'tipo'} value={item} />
    );

    renderCidades = item => (
        <Picker.Item
            label={item.label}
            key={item.value + 'cidade'}
            value={item.value}
        />
    );

    render() {
        const { tipos, pfpj, ufs, cidades } = this.state;
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
                        <Title style={{ color: colors.blue2 }}>Novo Parceiro</Title>
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
                                        <Label style={{ color: colors.blue2 }}>Tipo do Cadastro</Label>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            iosHeader="Tipo"
                                            headerBackButtonText="Voltar"
                                            placeholder="Escolha o tipo do cadastro"
                                            style={{ width: 340, top: 5 }}
                                            selectedValue={this.state.type_of_bp}
                                            onValueChange={this.handleTypeOfBP.bind(this)}>
                                            {tipos.length > 0 && tipos.map(this.renderTipos)}
                                        </Picker>
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Tipo pessoa</Label>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            iosHeader="TipoPF"
                                            headerBackButtonText="Voltar"
                                            placeholder="Escolha o tipo da pessoa"
                                            style={{ width: 340, top: 5 }}
                                            selectedValue={this.state.type_pj_pf}
                                            onValueChange={this.handleTypePFPJ.bind(this)}>
                                            {pfpj.length > 0 && pfpj.map(this.renderTipoPFPJ)}
                                        </Picker>
                                    </Item>
                                    {this.state.type_pj_pf == 'Jurídica' ?
                                        <Item stackedLabel>
                                            <Label style={{ color: colors.blue2 }}>CNPJ</Label>
                                            <TextInputMask
                                                placeholderTextColor={colors.color6}
                                                style={{
                                                    fontSize: 16,
                                                    color: colors.color6,
                                                    width: '100%',
                                                    height: 40
                                                }}
                                                value={this.state.cnpj}
                                                onChangeText={this.handleCNPJ}
                                                keyboardType="numeric"
                                                type={'cnpj'}
                                            />
                                        </Item>
                                        :
                                        <Item stackedLabel>
                                            <Label style={{ color: colors.blue2 }}>CPF</Label>
                                            <TextInputMask
                                                placeholderTextColor={colors.color6}
                                                style={{
                                                    fontSize: 16,
                                                    color: colors.color6,
                                                    width: '100%',
                                                    height: 40,
                                                }}
                                                value={this.state.cpf}
                                                onChangeText={this.handleCpf}
                                                keyboardType="numeric"
                                                type={'cpf'}
                                            />
                                        </Item>}
                                    {this.state.type_pj_pf == 'Jurídica' ?
                                        <Item stackedLabel>
                                            <Label style={{ color: colors.blue2 }}>IE</Label>
                                            <Input
                                                placeholderTextColor={colors.gray}
                                                style={{ fontSize: 16, color: colors.gray }}
                                                value={this.state.insc_estadual}
                                                onChangeText={this.handleInscEstad}
                                            />
                                        </Item>
                                        :
                                        <Item stackedLabel>
                                            <Label style={{ color: colors.blue2 }}>RG</Label>
                                            <Input
                                                placeholderTextColor={colors.gray}
                                                style={{ fontSize: 16, color: colors.gray }}
                                                value={this.state.rg}
                                                onChangeText={this.handleRG}
                                            />
                                        </Item>
                                    }
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>
                                            Razão Social / Nome
                    </Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.name}
                                            onChangeText={this.handleName}
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Nome Fantasia / Apelido</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.commercial_name}
                                            onChangeText={this.handleComercialName}
                                        />
                                    </Item>
                                </Form>
                            </View>
                        </Tab>
                        <Tab
                            heading="Endereço"
                            textStyle={{ color: colors.gray }}
                            style={{ backgroundColor: colors.white }}
                            activeTextStyle={{ color: colors.blue2, fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: colors.white }}
                            tabStyle={{ backgroundColor: colors.white }}>
                            <View padder>
                                <Form>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Logradouro</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.address}
                                            onChangeText={this.handleAdrress}
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Número</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.address_number}
                                            onChangeText={this.handleAdrressNumber}
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>Bairro</Label>
                                        <Input
                                            placeholderTextColor={colors.gray}
                                            style={{ fontSize: 16, color: colors.gray }}
                                            value={this.state.neighborhood}
                                            onChangeText={this.handleNeighborhood}
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>CEP</Label>
                                        <TextInputMask
                                            type={'zip-code'}
                                            placeholderTextColor={colors.color6}
                                            style={{
                                                fontSize: 16,
                                                color: colors.color6,
                                                width: '100%',
                                                height: 40,
                                            }}
                                            value={this.state.postal_code}
                                            onChangeText={this.handlePostalCode}
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel style={{ borderColor: '#fff' }}>
                                        <Label style={{ color: colors.blue2 }}>UF</Label>
                                        <Item style={{ left: -5 }}>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                iosHeader="UF"
                                                headerBackButtonText="Voltar"
                                                placeholder="UF"
                                                style={{ width: 340, top: 5 }}
                                                selectedValue={this.state.uf}
                                                onValueChange={this.handleUF.bind(this)}>
                                                {ufs.length > 0 && ufs.map(this.renderUFs)}
                                            </Picker>
                                        </Item>
                                    </Item>
                                    <Item stackedLabel style={{ borderColor: '#fff' }}>
                                        <Label style={{ color: colors.blue2 }}>Cidade</Label>
                                        <Item style={{ left: -5 }}>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                iosHeader="Cidade"
                                                headerBackButtonText="Voltar"
                                                placeholder="Cidade"
                                                style={{ width: 340, top: 5 }}
                                                selectedValue={this.state.city}
                                                onValueChange={this.handleCity.bind(this)}>
                                                {cidades.length > 0 && cidades.map(this.renderCidades)}
                                            </Picker>
                                        </Item>
                                    </Item>
                                </Form>
                            </View>
                        </Tab>
                        <Tab
                            heading="Contatos"
                            textStyle={{ color: colors.gray }}
                            style={{ backgroundColor: colors.white }}
                            activeTextStyle={{ color: colors.blue2, fontWeight: 'bold' }}
                            activeTabStyle={{ backgroundColor: colors.white }}
                            tabStyle={{ backgroundColor: colors.white }}>
                            <View padder>
                                <Form>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>
                                            Telefone
                    </Label>
                                        <TextInputMask
                                            type={'cel-phone'}
                                            options={{
                                                maskType: 'BRL',
                                                withDDD: true,
                                                dddMask: '(99) ',
                                            }}
                                            style={{ fontSize: 16, height: 40, color: 'black', width: '100%' }}
                                            value={this.state.phone}
                                            onChangeText={this.handlePhone}
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>
                                            Telefone Celular
                    </Label>
                                        <TextInputMask
                                            type={'cel-phone'}
                                            options={{
                                                maskType: 'BRL',
                                                withDDD: true,
                                                dddMask: '(99) ',
                                            }}
                                            style={{ fontSize: 16, height: 40, color: 'black', width: '100%' }}
                                            value={this.state.cell_phone}
                                            onChangeText={this.handleCellPhone}
                                            keyboardType="numeric"
                                        />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label style={{ color: colors.blue2 }}>E-mail</Label>
                                        <Input
                                            value={this.state.email}
                                            onChangeText={this.handleEmail}
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

// {"label":"Acre","value":"AC"},
// {"label":"Alagoas","value":"AL"},
// {"label":"Amap\u00e1","value":"AP"},
// {"label":"Amazonas","value":"AM"},
// {"label":"Bahia","value":"BA"},
// {"label":"Cear\u00e1","value":"CE"},
// {"label":"Distrito Federal","value":"DF"},
// {"label":"Esp\u00edrito Santo","value":"ES"},
// {"label":"Goi\u00e1s","value":"GO"},
// {"label":"Maranh\u00e3o","value":"MA"},
// {"label":"Mato Grosso","value":"MT"},
// {"label":"Mato Grosso do Sul","value":"MS"},
// {"label":"Minas Gerais","value":"MG"},
// {"label":"Paran\u00e1","value":"PR"},
// {"label":"Para\u00edba","value":"PB"},
// {"label":"Par\u00e1","value":"PA"},
// {"label":"Pernambuco","value":"PE"},
// {"label":"Piau\u00ed","value":"PI"},
// {"label":"Rio Grande do Norte","value":"RN"},
// {"label":"Rio Grande do Sul","value":"RS"},
// {"label":"Rio de Janeiro","value":"RJ"},
// {"label":"Rond\u00f4nia","value":"RO"},
// {"label":"Roraima","value":"RR"},
// {"label":"Santa Catarina","value":"SC"},
// {"label":"Sergipe","value":"SE"},
// {"label":"S\u00e3o Paulo","value":"SP"},
// {"label":"Tocantins","value":"TO"}

// [22:09, 26/10/2020] Eliézer: type_of_bp
// CL  - Cliente
// FO - Fornecedor
// CF - Cliente/Fornecedor
// [22:09, 26/10/2020] Eliézer: type_pj_pf
// PF - Pessoa Fisica
// PJ - Pessoa Juridica

export default novoParceiro;
