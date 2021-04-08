import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import MapView, { AnimatedRegion, Marker, Animated } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";


const DailyRoute = (props) => {  useEffect(() => {

  BackHandler.addEventListener("hardwareBackPress", props.OnDispaly);

  return () =>
    BackHandler.removeEventListener("hardwareBackPress", props.OnDispaly);
}, []);

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [latitudeValue, setlatitude] = useState(19.5801197);
const [longitudeValue, setlongitude] = useState(74.1979383);
useEffect(() => {
  (async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
}, []);
var al;
const region = {};
let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
  al = JSON.parse(text);
  if (latitudeValue != al.coords.latitude) {
    setlatitude(al.coords.latitude);
    setlongitude(al.coords.longitude);
  }
}

const route=[
  {
    latitude: 19.8480,
    longitude: 73.9890,
  },
  {
    latitude: 19.8440,
    longitude: 73.8890,
  },
  {
    latitude: 19.8980,
    longitude: 73.9840,
  },
  {
    latitude: 19.9975,
    longitude: 73.7898,
  },

]
const GOOGLE_MAPS_APIKEY='AIzaSyDApSQX7P9vkVF-DBXKItMzUzXjWMxz9Jg';
return (
  <View>
    <View style={styles.TopView}>
      <TouchableOpacity onPress={() => props.OnDispaly(2)} style={{ paddingRight: 5 }}>
        <Entypo name="arrow-left" size={34} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 27, fontWeight: "bold" }}>Daily Route</Text>
    </View>
    <View style={{ height: '100 %' }}>
      <View style={styles.container}>
        <MapView style={styles.map}
          region={
            {
              latitude: latitudeValue,
              longitude: longitudeValue,
              latitudeDelta:  0.00922*1.5,
              longitudeDelta: 0.00421*1.5
            }
          } 
          mapType="standard"
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          showsMyLocationButton={true}
          toolbarEnabled={true}
        
          >
           {route.map((item,index)=>(
            <MapView.Marker 
              coordinate={route[index]}
             />

            
           ))
             }
            <MapViewDirections 
            origin={route[0]}
            destination={route[2]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor='pink'
            strokeWidth={3}
            />

        </MapView>
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
TopView: {
  width: '100%',
  height: 75,
  backgroundColor: '#5e74e0',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 26,
  paddingLeft: 5,
  paddingBottom: 5
},

map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  padding:50
},
});

export default DailyRoute;