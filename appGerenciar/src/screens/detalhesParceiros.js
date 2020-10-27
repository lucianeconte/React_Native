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
    console.log(parceiro)

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
            <Text style={{ color: '#fff' }}>{parceiro.cpf}</Text>
            <Text style={{ color: '#fff' }}>
              RG/IE: {parceiro.rg}
            </Text>
          </Body>
          <Right />
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
                    //   source={require('../../assets/images/localization.png')}
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
          {parceiro.phone != '' && (
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
          {/* {cliente.email != '' && (
            <List>
              <TouchableNativeFeedback
                onPress={() => {
                  this.openEmail(cliente.email);
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
                    <Text>E-mail: {cliente.email}</Text>
                  </Body>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          )}  */}
        </Content>
      </Container>
    );
  }
}
