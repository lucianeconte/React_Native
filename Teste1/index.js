/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import Flex from './src/componentes/FletSelect';
import {name as appName} from './app.json';
import array from './src/componentes/picker';
//import Menu from './src/Menu'

AppRegistry.registerComponent(appName, () => array);
