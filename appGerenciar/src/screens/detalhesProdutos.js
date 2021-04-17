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
import utils from '../services/utils';

export default class detalhesProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: this.props.navigation.getParam('produto'),
    };
  }

  render() {
    const { produto } = this.state;
    console.log(produto)

    return (
      <Container>
        <Header span style={{ backgroundColor: colors.blue2 }}>
          <StatusBar backgroundColor={colors.blue2} />
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home', {tipo: 'P'})}>
              <Icon style={{ color: '#fff', fontSize: 24 }} name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color:  '#fff'}}>{produto.name}</Title>
            <Text style={{color:  '#fff'}}>
              Unidade de Medida: {produto.unit_measure}
            </Text>
            <Text style={{color: '#fff'}}>
              Código: {produto.id}
            </Text>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor: '#d3d3d3'}} padder>
          {produto.sale_price != '' && (
            <List>
              <ListItem avatar>
                <Left>
                  <Icon
                    name="subject"
                    style={{
                      fontSize: 30,
                      color: colors.blue2,
                      width: 30,
                      height: 30,
                      top: 2,
                    }}
                  />
                </Left>
                <Body style={{flex: 3}}>
                  <Text>Preço de Venda:</Text>
                  <Text note>R$ {utils.numberToReal(produto.sale_price)}</Text>
                </Body>
              </ListItem>
            </List>
          )}
          {produto.purchase_price != '' && (
            <List>
              <ListItem avatar>
                <Left>
                  <Icon
                    name="subject"
                    style={{
                      fontSize: 30,
                      color: colors.blue2,
                      width: 30,
                      height: 30,
                      top: 2,
                    }}
                  />
                </Left>
                <Body style={{flex: 3}}>
                  <Text>Preço de Compra:</Text>
                  <Text note>R$ {utils.numberToReal(produto.purchase_price)}</Text>
                </Body>
              </ListItem>
            </List>
          )}
          {produto.quantity != '' && (
            <List>
              <ListItem avatar>
                <Left>
                  <Icon
                    name="subject"
                    style={{
                      fontSize: 30,
                      color: colors.blue2,
                      width: 30,
                      height: 30,
                      top: 2,
                    }}
                  />
                </Left>
                <Body style={{flex: 3}}>
                  <Text>Quantidade:</Text>
                  <Text note>{produto.quantity}</Text>
                </Body>
              </ListItem>
            </List>
          )}
          {produto.notes != '' && (
            <List>
              <ListItem avatar>
                <Left>
                  <Icon
                    name="subject"
                    style={{
                      fontSize: 30,
                      color: colors.blue2,
                      width: 30,
                      height: 30,
                      top: 2,
                    }}
                  />
                </Left>
                <Body style={{flex: 3}}>
                  <Text>Observações:</Text>
                  <Text note>{produto.notes}</Text>
                </Body>
              </ListItem>
            </List>
          )}
        </Content>
      </Container>
    );
  }
}