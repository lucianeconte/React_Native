import styled from 'styled-components';

export const ScrollNavigator = styled.ScrollView`
  height: 90;
`;

export const NavigatorContent = styled.View``;

export const ViewNavigator = styled.View`
  flex-direction: row;
  margin-left: 15px;
  margin-top: 10px;
`;

export const NavigatorBox = styled.TouchableOpacity`
  background-color: #fff;
  height: 75;
  width: 75;
  top: 1;
  margin-right: 10;
  border-radius: 15;
  border: 2px;
  text-align: center;
  border-color: rgba(150, 150, 150, 0.2);
  padding: 8px;
  justify-content: space-between;
`;

export const NavigatorBoxBorda = styled.TouchableOpacity`
  background-color: #fff;
  height: 73;
  width: 73;
  margin-right: 10;
  border-radius: 15;
  padding: 8px;
  justify-content: space-between;
  shadow-color: #000;
  shadow-offset: {
    twidth: 0,
    theight: 12,
   };
  shadow-opacity: 0.58;
  shadow-radius: 5.00;
  elevation: 6;
`;

export const Title = styled.Text`
  color: #ffaa00;
`;

export const Icon = styled.Image`
  height: ${({height}) => height};
  width: ${({width}) => width};
`;
