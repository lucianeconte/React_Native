import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class PickerExample extends Component {
   state = {user1: ''}
   updateUser1 = (user1) => {
      this.setState({ user1: user1 })
   }

//    state2 = {user2: ''}
//    updateUser2 = (user2) => {
//       this.setState({ user2: user2 })
//    }
   render() {
      return (
          <>
         <View>
            <Picker selectedValue = {this.state.user1} onValueChange = {this.updateUser1}>
               <Picker.Item label = "Steve" value = "1" />
               <Picker.Item label = "Ellen" value = "2" />
               <Picker.Item label = "Maria" value = "3" />
            </Picker>
            <Text style = {styles.text}>{this.state.user1}</Text>
        </View>
         <View>
         <Picker selectedValue = {this.state.user1} onValueChange = {this.updateUser1}>
            <Picker.Item label = "Pedro" value = "4" />
            <Picker.Item label = "Carla" value = "5" />
            <Picker.Item label = "Luana" value = "6" />
         </Picker>
         <Text style = {styles.text}>{this.state.user1}</Text>
      </View> 
      </>
      )
   }
}
export default PickerExample

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})