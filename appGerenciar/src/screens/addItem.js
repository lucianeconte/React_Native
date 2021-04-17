import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  //Icon,
  Left,
  Body,
  View,
  Content,
  Subtitle,
  Text,
  Form,
  Item,
  Input,
  Toast,
  Label,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text';
import colors from './colors';
import styles from '../styles';
// import Spinner from 'react-native-loading-spinner-overlay';
import utils from '../services/utils';
import { BackHandler } from 'react-native';
import session from '../session';
import { color } from 'react-native-reanimated';
import novoPedido from './novoPedido';
import { addProcut } from '../services/Vendas'

class addItem extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      casasDecimaisQuantidade: 2,
      casasDecimaisPreco: 2,
      item: this.props.navigation.getParam('produto'),
      total: 0,
      qtd: 1,
      valor: 0,
      valorItem: 0,
      obs: '',
      spinner: false,
      action: false,
      salesorder: this.props.navigation.getParam('salesorder'),
      company: this.props.navigation.getParam('company'),
    };
  }

  async componentDidMount() {
    const { item, casasDecimaisPreco } = await this.state;

    console.log(item)

    await this.setState({
      valor: item.sale_price,//this.valorItem,
      casasDecimaisQuantidade: 2,
      casasDecimaisPreco: 2,
      item: this.props.navigation.getParam('produto'),
      total: 0,
      qtd: 1,
    });

    this.total();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate(this.state.rota, {
      item: null,
      indice: null,
    });
  };

  removeItem = async () => {
    var qtd = parseFloat(this.state.qtd).toFixed(
      this.state.casasDecimaisQuantidade,
    );
    qtd = await (parseFloat(qtd) - parseFloat(1));
    qtd = parseFloat(qtd) <= 0 ? '0,00' : utils.numberToReal(qtd);
    return this.handleQtd(qtd);
  };

  addItem = async () => {
    var qtd = await parseFloat(this.state.qtd).toFixed(
      this.state.casasDecimaisQuantidade,
    );
    qtd = await (parseFloat(qtd) + parseFloat(1));
    qtd = await utils.numberToReal(qtd);
    return await this.handleQtd(qtd);
  };

  total = () => {
    var { qtd, item, valor } = this.state;

    qtd = parseFloat(qtd).toFixed(this.state.casasDecimaisQuantidade);
    var total = parseFloat(valor * qtd).toFixed(this.state.casasDecimaisPreco);

    if (total < 0) {
      total = 0;
    }

    this.setState({
      total: parseFloat(total, this.state.casasDecimaisPreco),
    });
  };

  addProcut = async () => {
    const { total, qtd, valor, item, tipoDesc } = this.state;
    item.qtd_venda = qtd;
    item.valor = valor;
    item.total = total;

    this.props.navigation.navigate(this.state.rota, {
      item: item,
      indice: null,
    });
  };

  handleQtd = async indice => {
    var qtd = utils.convertFloat(indice, this.state.casasDecimaisQuantidade);
    var item = this.state.item;

    await this.setState({
      qtd: qtd,
    });
    this.total();
  };

  handleValor = async indice => {
    var valor = await utils.convertFloat(indice, this.state.casasDecimaisPreco);

    await this.setState({
      valor: valor,
    });
    this.total();
  };

  addItemBD = async () => {
    const { total, qtd, valor, item, salesorder, company } = await this.state;
    item.qtd_venda = qtd;
    item.valor = valor;

    try {
      let jsonItem = '{"quantity":"' + qtd + '", "unit_value":"' + valor + '", "discount":"0.00", "increase":"0.00", "total_value":"' + total + '", ' +
                      '"company":' + company + ',"salesorder":' + salesorder + ',"product":' + item.id + '}';
      console.log(jsonItem)
      await addProcut(jsonItem);

      Toast.show({
        position: 'top',
        text: 'Produto adicionado com sucesso!',
        buttonText: 'Ok',
        duration: 3000,
      });

      return this.props.navigation.navigate('novoPedido', {
        item: null,
        //item: item,
       //ou
       // numero: numero,
       /// pedido_id: pedido_id,
      });
    } catch (e) {
      console.log(e)
      Toast.show({
        position: 'top',
        type: 'danger',
        text: 'Ocorreu um erro, tente novamente!',
        buttonText: 'Ok',
        duration: 6000,
      });
      return false;
    }
  };

  render() {
    const { numero, pedido_id, item, total } = this.state;

    let totalItem = parseFloat(total);

    return (
      <Container style={{ backgroundColor: '#fff' }}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={'Aguarde...'}
          textStyle={{ color: colors.color2 }}
        /> */}
        <Header
          hasTabs
          style={{ backgroundColor: colors.blue }}
          androidStatusBarColor={colors.blue2}
          iosBarStyle="light-content">
          <Left>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('novoPedido', {
                  produto: null,
                })
              }>
              <Icon name="arrow-back" style={{ color: '#fff', fontSize: 24 }} />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: '#fff' }}>{item.name}</Title> 
            <Subtitle style={{ color: '#fff' }}>
              Id: {item.id}
            </Subtitle>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#fff' }}>
          <View style={{ width: '90%', paddingLeft: '10%', paddingTop: 22 }}>
            <Form>
              <Item rounded last style={styles.itemNormal}>
                <Label style={{ color: colors.blue2 }}>Quantidade</Label>
                <TextInputMask
                  style={{ fontSize: 16 }}
                  value={this.state.qtd}
                  options={{
                    precision: this.state.casasDecimaisQuantidade,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: '',
                  }}
                  onChangeText={this.handleQtd}
                  keyboardType="numeric"
                  type={'money'}
                />
                <View style={{ position: 'absolute', right: 45 }}>
                  <Button
                    onPress={() => {
                      this.removeItem();
                    }}
                    style={{
                      backgroundColor: colors.blue2,
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                    }}>
                    <Icon
                      name="remove"
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 7,
                        position: 'absolute',
                        color: '#fff'
                      }}
                    />
                  </Button>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                  <Button
                    onPress={() => {
                      this.addItem();
                    }}
                    style={{
                      backgroundColor: colors.blue2,
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                    }}>
                    <Icon
                      name="add"
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginLeft: 7,
                        position: 'absolute',
                        color: '#fff'
                      }}
                    />
                  </Button>
                </View>
              </Item>
              <Item rounded last style={styles.itemNormal}>
                <Label style={{ color: colors.blue2 }}>Vlr. Uni. R$</Label>
                <TextInputMask
                  style={{ fontSize: 16 }}
                  value={this.state.valor}
                  options={{
                    precision: this.state.casasDecimaisQuantidade,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: '',
                  }}
                  onChangeText={this.handleValor}
                  keyboardType="numeric"
                  type={'money'}
                />
              </Item>
              {/* {bloqDesc == false || bloqDesc == 'false' && (
                <Item rounded last style={styles.itemNormal}>
                  <Label style={{ color: colors.color2 }}>Desconto {this.state.tipoDesc == 'V' ? 'R$' : '%'}</Label>
                  <TextInputMask
                    value={desconto}
                    options={{
                      precision: this.state.casasDecimaisQuantidade,
                      separator: ',',
                      delimiter: '.',
                      unit: '',
                      suffixUnit: '',
                    }}
                    style={{ fontSize: 16 }}
                    onChangeText={this.handleDesconto}
                    keyboardType="numeric"
                    type={'money'}
                  /> 
                  <View style={{ position: 'absolute', right: 10 }}>
                    <Button
                      onPress={() => {
                        this.alternaDesconto('R$');
                      }}
                      style={{
                        backgroundColor: colors.color2,
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                      }}>
                      {iconeDesc}
                    </Button>
                  </View>
                </Item>
              )} */}
              <Item style={{ borderColor: 'transparent' }}>
                <Text
                  style={{
                    color: colors.blue2,
                    fontWeight: 'bold',
                    paddingTop: 25,
                    fontSize: 18,
                  }}>
                  Total R$ {utils.numberToReal(totalItem)}
                </Text>
              </Item>
              <Button
                rounded
                disaled={totalItem == 0}
                block
                onPress={() => {
                  this.addItemBD();
                }}
                style={{
                  backgroundColor: colors.blue2,
                  marginTop: 25,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  Salvar
                </Text>
              </Button>
              <Button
                transparent
                rounded
                block
                style={{
                  borderColor: colors.blue2,
                  borderWidth: 1,
                  marginTop: 25,
                }}
                onPress={() =>
                  this.props.navigation.navigate(this.state.rota, {
                    item: null,
                    indice: null,
                  })
                }>
                <Text
                  style={{
                    color: colors.blue2,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  Cancelar
                </Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default addItem;