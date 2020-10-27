import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import Auth from './screens/Auth';
import detalhesParceiros from './screens/detalhesParceiros';
import novoParceiro from './screens/novoParceiro';

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
  novoParceiro: {
    screen: novoParceiro,
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
