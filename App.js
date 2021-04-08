import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraScreeen from './DisplayScreen/Camera';
import Homescreen from './DisplayScreen/HomeScreen';
import LoginScreen from './DisplayScreen/LoginScreen';
import MainScreen from './DisplayScreen/MainScreen';
import ProfileScreen from './DisplayScreen/ProfileScreen';
import Notes from './Features.js/Notes/Notes';
import Attendence from './Features.js/Attendence/Attendence';
import Parties from './Features.js/Parties/Parties';
import Leaves from './Features.js/Leaves/Leaves';
import DailyRoute from './Features.js/Daily_Route/DailyRoute'
import Locations from './Features.js/Location/Location'
import * as Location from 'expo-location';
import { getNamePass } from './prop/props';

export default function App() {
  const [CurrentScreen, SetScreen] = useState(0);
 
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
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    if (latitudeValue != location.coords.latitude) {
      setlatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);
    }
    }
    if(CurrentScreen>1){
 setInterval(() => {

      if(latitudeValue!=0 && longitudeValue!=0){

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
              latval:latitudeValue,
              lonval:longitudeValue
          })
      }) .then(res=>res.json()) 
    
      }}, 500000);
    }
  const DisplayScreen=(Value)=>{
    SetScreen(Value);
    
  }
  const DiScreen=()=>{
    SetScreen(2)
    return true
  }

  let Display;
  if(CurrentScreen==0){
  Display =<LoginScreen OnDispaly={DisplayScreen} />
  }else if(CurrentScreen==1){
    Display=<CameraScreeen OnDispaly={DisplayScreen}/>
  }else if(CurrentScreen==2){
    Display=<MainScreen OnDispaly={DisplayScreen}/>
  }else if(CurrentScreen==3){
    Display=<View><Parties OnDispaly={DiScreen}></Parties></View>
  }else if(CurrentScreen==4){
    Display=<View><Notes OnDispaly={DiScreen}></Notes></View>
  }else if(CurrentScreen==5){
    Display=<View><Attendence OnDispaly={DiScreen}></Attendence></View>
  }else if(CurrentScreen==6){
    Display=<View><Leaves OnDispaly={DiScreen}></Leaves></View>
  }else if(CurrentScreen==7){
    Display=<View><DailyRoute OnDispaly={DiScreen}></DailyRoute></View>
  }else if(CurrentScreen==8){
    Display=<View><Locations OnDispaly={DiScreen}></Locations></View>
  }

  return (
    <View>
      {Display}
    </View>
  );
}

const styles = StyleSheet.create({

});
