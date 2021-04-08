
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, TouchableOpacity, Dimensions } from 'react-native';
import {  Entypo } from '@expo/vector-icons';
import MapView  from 'react-native-maps';
import * as Location from 'expo-location';
import {getNamePass} from '../../prop/props';

const Locations = (props) => {

  useEffect(() => {

    BackHandler.addEventListener("hardwareBackPress", props.OnDispaly);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", props.OnDispaly);
  }, []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitudeValue, setlatitude] = useState(0);
  const [longitudeValue, setlongitude] = useState(0);

  let NamePass={};
  NamePass=getNamePass()

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
  let al;
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
  
  return (
    <View>
      <View style={styles.TopView}>
        <TouchableOpacity onPress={() => props.OnDispaly(2)} style={{ paddingRight: 5 }}>
          <Entypo name="arrow-left" size={34} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 27, fontWeight: "bold" }}>Location</Text>
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
            showsMyLocationButton={true}
            zoomEnabled={true}
            pitchEnabled={true}
            showsUserLocation={true}
            followsUserLocation={true}
            showsCompass={true}
            showsBuildings={true}
            showsTraffic={true}
            showsIndoors={true}
            cacheEnabled={true}
          >
           
            <MapView.Marker 
              coordinate={{
                latitude: latitudeValue,
                longitude: longitudeValue
              }}
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
  },
});

export default Locations;