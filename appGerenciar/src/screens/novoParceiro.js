import React, {Component} from 'react';
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
import {TextInputMask} from 'react-native-masked-text';
//import {create as createCliente} from '../../services/Clientes';
import {BackHandler, StatusBar} from 'react-native';
import utils from '../services/utils';
import { color } from 'react-native-reanimated';
//import session from '../../session';
//import { IDUSER } from '../../variables';

class novoParceiro extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      spinner: false,
      action: false,
      cpf: '',
      cnpj: '',
      ierg: '',
      razao: '',
      nome: '',
      tipo: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      contato: '',
      cidade: '',
      cep: '',
      foneResidencial: '',
      foneCelular: '',
      email: '',
      tipos: [
        'Cliente',
        'Fornecedor',
        'Cliente e Fornecedor',
      ],
      cidades: [],
      buscaCidades: false,
      idCidade: null,
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

  handleIeRg = async valor => {
    await this.setState({
      ierg: valor,
    });
  };

  handleRazao = async valor => {
    await this.setState({
      razao: valor,
    });
  };

  handleNome = async valor => {
    await this.setState({
      nome: valor,
    });
  };

  handleTipo = async valor => {
    await this.setState({
      tipo: valor,
    });
  };

  handleLogradouro = async valor => {
    await this.setState({
      logradouro: valor,
    });
  };

  handleNumero = async valor => {
    await this.setState({
      numero: valor,
    });
  };

  handleBairro = async valor => {
    await this.setState({
      bairro: valor,
    });
  };

  handleCidade = async valor => {
    await this.setState({
      cidade: valor,
    });
  };

  handleIdCidade = async valor => {
    await this.setState({
      idCidade: valor,
    });
  };

  handleCep = async valor => {
    await this.setState({
      cep: valor,
    });
  };

  handeFone = async valor => {
    await this.setState({
      foneResidencial: valor,
    });
  };

  handeFoneCelular = async valor => {
    await this.setState({
      foneCelular: valor,
    });
  };

  handeEmail = async valor => {
    await this.setState({
      email: valor,
    });
  };

  getCidade = async () => {
    const {cidade} = this.state;
    const $this = this;

    if (cidade == '' || cidade == null) {
      return Toast.show({
        position: 'top',
        text: 'Infome o que deseja filtrar',
        buttonText: 'Ok',
        duration: 7000,
      });
    }
    await getByName(cidade).then(function(response) {
      $this.setState({
        cidades: response,
        buscaCidades: true,
      });
    });
  };

  salvar = async () => {
    var idUser = await session.get(IDUSER);

    try {
      if (this.state.razao == '') {
        return Toast.show({
          position: 'top',
          text: 'Infome o nome/razão social!',
          buttonText: 'Ok',
          duration: 7000,
        });
      }

      var record = {};
      this.setState({
        spinner: true,
      });

      record.name = this.state.razao;
      record.trade = this.state.nome;
      record.document = this.state.cpf != '' ? this.state.cpf : this.state.cnpj;
      record.ierg = this.state.ierg;
      record.email = this.state.email;
      record.contact = this.state.contato;
      record.addressType = this.state.tipo;
      record.addressPlace = this.state.logradouro;
      record.addressNumber = this.state.numero;
      record.addressNeighborhood = this.state.bairro;
      record.addressComplement = this.state.complemento;
      record.addressZipCode = this.state.cep;
      record.addressCityId =
        this.state.idCidade == null ? '' : this.state.idCidade;
      record.phoneResidentialDdd = this.state.foneResidencial.split(')')[0]
        ? this.state.foneResidencial.split(')')[0].replace('(', '')
        : '';
      record.phoneResidentialPhone = this.state.foneResidencial.split(')')[1]
        ? this.state.foneResidencial.split(')')[1]
        : '';
      record.phoneCommercialDdd = this.state.foneComercial.split(')')[0]
        ? this.state.foneComercial.split(')')[0].replace('(', '')
        : '';
      record.phoneCommercialPhone = this.state.foneComercial.split(')')[1]
        ? this.state.foneComercial.split(')')[1]
        : '';
      record.phoneCelularDdd = this.state.foneComercial.split(')')[0]
        ? this.state.foneComercial.split(')')[0].replace('(', '')
        : '';
      record.phoneCelularPhone = record.phoneCelularPhone = this.state.foneCelular.split(
        ')',
      )[1]
        ? this.state.foneCelular.split(')')[1]
        : '';
      record.phoneFaxDdd = record.phoneFaxDdd = this.state.foneFax.split(')')[0]
        ? this.state.foneFax.split(')')[0].replace('(', '')
        : '';
      record.phoneFaxPhone = this.state.foneFax.split(')')[1]
        ? this.state.foneFax.split(')')[1]
        : '';
      record.uuid = await utils.randomUUID();
      record.idSalesman = parseInt(idUser);
 
      const $this = this;

      await createCliente(record).then(function(response) {
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

  renderCidades = item => (
    <Picker.Item
      label={item.name + ' - ' + item.state}
      key={item.idCity + 'cidade'}
      value={item.idCity}
    />
  );

  render() {
    const {tipos, cidades, buscaCidades} = this.state;
    return (
      <Container style={{backgroundColor: colors.white}}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={'Aguarde...'}
          textStyle={{color: colors.color2}}
        /> */}
        <Header
          hasTabs
          style={{backgroundColor: colors.white, borderBottomWidth: 0}}
          androidStatusBarColor={colors.blue2}>
          <StatusBar backgroundColor={colors.blue2}  />
          <Left>
            <Button transparent onPress={() => this.onBackPress()}>
              <Icon name="arrow-back" style={{color: colors.blue2, fontSize: 24}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: colors.blue2}}>Novo Parceiro</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Tabs tabBarUnderlineStyle={{backgroundColor: colors.blue2}}>
            <Tab
              heading="Dados"
              textStyle={{color: colors.gray}}
              style={{backgroundColor: colors.white}}
              activeTextStyle={{color: colors.blue2, fontWeight: 'bold'}}
              activeTabStyle={{backgroundColor: colors.white}}
              tabStyle={{backgroundColor: '#fff'}}>
              <View padder>
                <Form>
                <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>Tipo do Cadastro</Label>
                    <Picker
                      note
                      mode="dropdown"
                      iosHeader="Tipo"
                      headerBackButtonText="Voltar"
                      placeholder="Escolha o tipo do cadastro"
                      style={{width: 340, top: 5}}
                      selectedValue={this.state.tipo}
                      onValueChange={this.handleTipo.bind(this)}>
                      {tipos.length > 0 && tipos.map(this.renderTipos)}
                    </Picker>
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>CPF</Label>
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
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>CNPJ</Label>
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
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>IE/RG</Label>
                    <Input
                      placeholderTextColor={colors.gray}
                      style={{fontSize: 16, color: colors.gray}}
                      value={this.state.ierg}
                      onChangeText={this.handleIeRg}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>
                      Razão Social / Nome
                    </Label>
                    <Input
                      placeholderTextColor={colors.gray}
                      style={{fontSize: 16, color: colors.gray}}
                      value={this.state.razao}
                      onChangeText={this.handleRazao}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>Nome Fantasia</Label>
                    <Input
                      placeholderTextColor={colors.gray}
                      style={{fontSize: 16, color: colors.gray}}
                      value={this.state.nome}
                      onChangeText={this.handleNome}
                    />
                  </Item>
                </Form>
              </View>
            </Tab>
            <Tab
              heading="Endereço"
              textStyle={{color: colors.gray}}
              style={{backgroundColor: colors.white}}
              activeTextStyle={{color: colors.blue2, fontWeight: 'bold'}}
              activeTabStyle={{backgroundColor: colors.white}}
              tabStyle={{backgroundColor: colors.white}}>
              <View padder>
                <Form>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>Logradouro</Label>
                    <Input
                      placeholderTextColor={colors.gray}
                      style={{fontSize: 16, color: colors.gray}}
                      value={this.state.logradouro}
                      onChangeText={this.handleLogradouro}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>Número</Label>
                    <Input
                      placeholderTextColor={colors.gray}
                      style={{fontSize: 16, color: colors.gray}}
                      value={this.state.numero}
                      onChangeText={this.handleNumero}
                      keyboardType="numeric"
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>Bairro</Label>
                    <Input
                      placeholderTextColor={colors.gray}
                      style={{fontSize: 16, color: colors.gray}}
                      value={this.state.bairro}
                      onChangeText={this.handleBairro}
                    />
                  </Item>
                  {buscaCidades == true && (
                    <Item stackedLabel style={{borderColor: '#fff'}}>
                      <Label style={{color: colors.blue2}}>Cidade</Label>
                      <Item style={{left: -5}}>
                        <Button
                          transparent
                          onPress={() => {
                            this.setState({
                              buscaCidades: false,
                            });
                          }}>
                          <Icon style={{color: 'gray', fontSize: 24}} name="close" />
                        </Button>
                        <Picker
                          note
                          mode="dropdown"
                          iosHeader="Cidade"
                          headerBackButtonText="Voltar"
                          placeholder="Selecione uma cidade"
                          style={{width: 320, top: 5}}
                          selectedValue={this.state.idCidade}
                          onValueChange={this.handleIdCidade.bind(this)}>
                          {cidades.map(this.renderCidades)}
                        </Picker>
                  
                      </Item>
                    </Item>
                  )}
                  {buscaCidades == false && (
                    <Item stackedLabel style={{borderColor: '#fff'}}>
                      <Label style={{color: colors.blue2}}>Cidade</Label>
                      <Item style={{left: -5}}>
                        <Input
                          placeholderTextColor={colors.gray}
                          style={{fontSize: 16, color: colors.gray}}
                          value={this.state.cidade}
                          onSubmitEditing={() => this.getCidade()}
                          onChangeText={this.handleCidade}
                        />
                        <Button
                          transparent
                          onPress={() => {
                            this.getCidade();
                          }}>
                          <Icon style={{color: colors.blue2, fontSize: 24}} name="search" />
                        </Button>
                      </Item>
                    </Item>
                  )}
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>CEP</Label>
                    <TextInputMask
                      type={'zip-code'}
                      placeholderTextColor={colors.color6}
                      style={{
                        fontSize: 16,
                        color: colors.color6,
                        width: '100%',
                        height: 40,
                      }}
                      value={this.state.cep}
                      onChangeText={this.handleCep}
                      keyboardType="numeric"
                    />
                  </Item>
                </Form>
              </View>
            </Tab>
            <Tab
              heading="Contatos"
              textStyle={{color: colors.gray}}
              style={{backgroundColor: colors.white}}
              activeTextStyle={{color: colors.blue2, fontWeight: 'bold'}}
              activeTabStyle={{backgroundColor: colors.white}}
              tabStyle={{backgroundColor: colors.white}}>
              <View padder>
                <Form>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>
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
                      value={this.state.foneResidencial}
                      onChangeText={this.handeFone}
                      keyboardType="numeric"
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>
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
                      value={this.state.foneCelular}
                      onChangeText={this.handeFoneCelular}
                      keyboardType="numeric"
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{color: colors.blue2}}>E-mail</Label>
                    <Input
                      value={this.state.email}
                      onChangeText={this.handeEmail}
                    />
                  </Item>
                </Form>
              </View>
            </Tab>
          </Tabs>
        </Content>
        <Footer style={{backgroundColor: colors.white}}>
          <Button
            onPress={() => {
              this.salvar();
            }}
            block
            rounded
            style={{backgroundColor: colors.blue2, width: 150}}>
            <Text style={{textTransform: 'capitalize', color: '#fff'}}>
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

export default novoParceiro;
