import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Content,
  Text,
  Body,
  Right,
  ListItem,
  List,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from './colors';
import { Image, StatusBar, Linking, TouchableNativeFeedback } from 'react-native';

export default class detalhesParceiros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parceiro: this.props.navigation.getParam('parceiro'),
    };
  }

  openPhone = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  openEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  openAdress = () => {
    const { cliente } = this.state;
    Linking.openURL(
      `geo:0,0?q=${cliente.address},${cliente.city}-${cliente.state}`,
    );
  };

  render() {
    const { parceiro } = this.state;

    function retornaDoc(tipo) {
      if (tipo == 'PF') {
        if (parceiro.cpf != '') {
          return 'CPF: ' + parceiro.cpf.substring(0, 3) + '.' + parceiro.cpf.substring(3, 6) + '.' + parceiro.cpf.substring(6, 9) + '-' + parceiro.cpf.substring(9, 11);
        } else {
          return 'CPF: ';
        }
      } else {
        if (parceiro.cnpj != '') {
          return 'CNPJ: ' + parceiro.cnpj.substring(0, 2) + '.' + parceiro.cnpj.substring(2, 5) + '.' + parceiro.cnpj.substring(5, 8) + '/' + parceiro.cnpj.substring(8, 12) + "-" + parceiro.cnpj.substring(12, 14);
        } else {
          return 'CNPJ: ';
        }
      }
    }

    return (
      <Container>
        <Header span style={{ backgroundColor: colors.blue2 }}>
          <StatusBar backgroundColor={colors.blue2} />
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{ color: '#fff', fontSize: 24 }} name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: '#fff' }}>{parceiro.name}</Title>
            <Text style={{ color: '#fff' }}>{retornaDoc(parceiro.type_pj_pf)}</Text>
            <Text style={{ color: '#fff' }}>
              RG/IE: {parceiro.rg}
            </Text>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#fff' }} padder>
          {parceiro.city_name != '' && (
            <List>
              <TouchableNativeFeedback
                onPress={() => {
                  this.openAdress();
                }}>
                <ListItem avatar>
                  <Left>
                    <Image
                      source={require('../../assets/imgs/localization.png')}
                      style={{
                        top: 10,
                        width: 30,
                        height: 30,
                        tintColor: colors.blue2,
                      }}
                    />
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Text>{parceiro.city_name + ' - ' + parceiro.uf}</Text>
                    <Text note>{parceiro.address}</Text>
                    <Text note>Cep: {parceiro.postal_code}</Text>
                  </Body>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          )}
          {parceiro.phone != '' && parceiro.phone != 'undefined' && (
            <List>
              <TouchableNativeFeedback
                onPress={() => {
                  this.openPhone(parceiro.phone);
                }}>
                <ListItem avatar>
                  <Left>
                    <Icon
                      name="smartphone"
                      style={{
                        fontSize: 30,
                        color: colors.color2,
                        width: 30,
                        height: 30,
                        top: 2,
                      }}
                    />
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Text>Telefone:</Text>
                    <Text note>{parceiro.phone}</Text>
                  </Body>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          )}
          {parceiro.cell_phone != '' && parceiro.cell_phone != 'undefined' && (
            <List>
              <TouchableNativeFeedback
                onPress={() => {
                  this.openPhone(parceiro.cell_phone);
                }}>
                <ListItem avatar>
                  <Left>
                    <Icon
                      name="smartphone"
                      style={{
                        fontSize: 30,
                        color: colors.color2,
                        width: 30,
                        height: 30,
                        top: 2,
                      }}
                    />
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Text>Celular:</Text>
                    <Text note>{parceiro.cell_phone}</Text>
                  </Body>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          )}
          {parceiro.email != '' && (
            <List>
              <TouchableNativeFeedback
                onPress={() => {
                  this.openEmail(parceiro.email);
                }}>
                <ListItem avatar>
                  <Left>
                    <Icon
                      name="mail"
                      style={{
                        fontSize: 30,
                        color: colors.color2,
                        width: 30,
                        height: 30,
                        top: 2,
                      }}
                    />
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Text>E-mail: {parceiro.email}</Text>
                  </Body>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          )}
        </Content>
      </Container>
    );
  }
}
