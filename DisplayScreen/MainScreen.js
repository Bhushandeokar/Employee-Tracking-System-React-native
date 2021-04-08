import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Homescreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
const MainScreen = (props) => {
  const [a, b] = useState(0)
  let ScreenDispaly;
  const Back = (Value) => {
    b(Value);
    props.OnDispaly(Value)

  }
  if (a == 0) {
    ScreenDispaly = <View><Homescreen OnBack={Back}></Homescreen></View>
  } else if (a == 1) {
    ScreenDispaly = <View><ProfileScreen OnBack={Back} /></View>
  }
  return (
    <View style={styles.mainviewstyle}>
      {ScreenDispaly}
      <View style={styles.BottomView}>
        <TouchableOpacity style={styles.HPbutton} onPress={() => { b(0) }} >
          <AntDesign name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <View style={styles.symbolview}>
          <Text style={{ color: 'white' }}>symbol</Text>
        </View>
        <TouchableOpacity onPress={() => { b(1) }} style={styles.HPbutton}>
          <Ionicons name="ios-person" size={24} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainviewstyle: {
    height: "100%"
  },

  BottomView: {
    width: '100%',
    height: 70,
    borderTopColor: '#bfbfbf',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  HPbutton: {
    width: '36%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  symbolview: {
    width: '28%',
    height: '150%',
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 80
  },

});
export default MainScreen;
