import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { getNamePass } from '../prop/props';
import * as Location from 'expo-location';

const CameraScreeen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const ref = useRef(null)
  const [cur, set] = useState('');
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitudeValue, setlatitude] = useState(0);
  const [longitudeValue, setlongitude] = useState(0);

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
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    if (latitudeValue != location.coords.latitude) {
      setlatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);

    }
    }
   

 let NamePass={};
  NamePass=getNamePass()
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const sendimg=()=>{
    fetch("http://192.168.43.234:3000/send",{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name:NamePass.name,
          password:NamePass.pass,
          date:NamePass.date,
          image:cur,
          lat:latitudeValue,
          lon:longitudeValue
      })
  })
  .then(res=>res.json()) 
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  let Display;
  if (cur.length == 0) {
    Display = <View>
      <Camera style={{ width: "100%", height: '84%' }} type={type} autoFocus={false} ratio="16:9" ref={ref}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>
        </View>
      </Camera>
      <View style={styles.captureimagestyle}>
        <TouchableOpacity style={styles.takepicstyle}
        delayPressOut={1}
         onPress={async() => {
    const photo = await ref.current.takePictureAsync()
    set(photo.uri);
    console.log(cur)}}>
          <MaterialCommunityIcons name="camera-iris" size={74} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipstyle} onPress={() => {
          setType(
            type === Camera.Constants.Type.front
              ? Camera.Constants.Type.back
              : Camera.Constants.Type.front
          );
        }}>
          <FontAwesome name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  } else {
    Display = <View>
      <Image style={{ width: '100%', height: "84%" }} source={{ uri: cur }} />
      <View style={styles.imagestyle}>
        <TouchableOpacity style={styles.RW} onPress={() => set('')}>
          <Entypo name="cross" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.RW} onPress={() => {props.OnDispaly(2),sendimg()}}>
          <AntDesign name="check" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  }
  return (
    <View style={styles.mainviewstyle}>
      {Display}

    </View>
  );
}
const styles = StyleSheet.create({
  mainviewstyle: {
    width: "100%",
    height: "100%",
  },
  RW: {
    borderRadius: 30,
    borderWidth: 1, borderColor: 'white',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagestyle: {
    width: "100%",
    height: '17.5%',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  captureimagestyle: {
    width: "100%",
    height: '18%',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flipstyle: {
    width: 50,
    height: 60,
    marginLeft: "96%",
    paddingVertical: 10
  },
  takepicstyle: {
    alignItems: "center",
    position: 'absolute',
    paddingVertical: 15
  }

});
export default CameraScreeen;
