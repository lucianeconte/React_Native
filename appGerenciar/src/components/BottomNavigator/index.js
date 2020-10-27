import React, {Component} from 'react';
import {
  ScrollNavigator,
  NavigatorContent,
  NavigatorBox,
  Title,
  ViewNavigator,
} from './styled';
import {Icon} from 'native-base';

class BottomNavigator extends Component {
  state = {
    menuItems: this.props.routes,
  };

  renderMenusItems = ({name, route, icon}, index) => (
    <NavigatorBox
      key={`${name}-${index}`}
      onPress={() => this.props.navigation.navigate(route)}>
      <Icon
        name={icon}
        height={40}
        width={40}
        style={{alignSelf: 'center', color: '#FFAA00', fontWeight: 'bold'}}
      />
      <Title style={{alignSelf: 'center', color: '#FFAA00', top: -10}}>{name}</Title>
    </NavigatorBox>
  );

  render() {
    const {menuItems} = this.state;

    return (
      <NavigatorContent>
        <ScrollNavigator horizontal showsHorizontalScrollIndicator={false}>
          <ViewNavigator>{menuItems.map(this.renderMenusItems)}</ViewNavigator>
        </ScrollNavigator>
      </NavigatorContent>
    );
  }
}

export default BottomNavigator;
