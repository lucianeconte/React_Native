import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import Auth from './screens/Auth';
import detalhesParceiros from './screens/detalhesParceiros';
import detalhesProdutos from './screens/detalhesProdutos';
import novoParceiro from './screens/novoParceiro';
import novoProduto from './screens/novoProduto';
import novoPedido from './screens/novoPedido';
import addItem from './screens/addItem';

const DrawerRoutes = createDrawerNavigator(
  {
    Home: { screen: Home },
    Auth: { screen: Auth },
  },
  {
    initialRouteName: 'Auth',
    contentComponent: props => <Auth {...props} />,
  },
);

export const SignedOutRoutes = createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  detalhesParceiros: {
    screen: detalhesParceiros,
    navigationOptions: {
      header: null,
    },
  },
  detalhesProdutos: {
    screen: detalhesProdutos,
    navigationOptions: {
      header: null,
    },
  },
  novoParceiro: {
    screen: novoParceiro,
    navigationOptions: {
      header: null,
    },
  },
  novoProduto: {
    screen: novoProduto,
    navigationOptions: {
      header: null,
    },
  },
  novoPedido: {
    screen: novoPedido,
    navigationOptions: {
      header: null,
    },
  },
  addItem: {
    screen: addItem,
    navigationOptions: {
      header: null,
    },
  },
});

export const SignedInRoutes = createStackNavigator(
  {
    Drawer: {
      screen: DrawerRoutes,
    },
    Home: { screen: Home },
    // EditTable: {screen: EditTable},
    // AddItem: {screen: AddItem},
    // Itens: {screen: Itens},
    // BarCode: {screen: BarCode},
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
);

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: { screen: SignedInRoutes },
      SignedOut: { screen: SignedOutRoutes },
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  );
};
