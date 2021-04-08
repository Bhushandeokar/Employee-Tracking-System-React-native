import React,{useEffect} from "react";
import { Text, View, StyleSheet,BackHandler, TouchableOpacity } from 'react-native';
import {Entypo } from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import { getleaves,setleaves } from "../../prop/props";

const Leaves = (props) => {
    setleaves()
    const LeavesDate=[]
    const nextDays =getleaves()
    for(var i=0;i<nextDays.length;i++){
        var dt = new Date(nextDays[i]);
     if(dt.getDay()==0){
        LeavesDate.push({Holidays:nextDays[i].toISOString().split('T')[0]})
     }else{
        LeavesDate.push(nextDays[i].toISOString().split('T')[0])
     }
    }
    
    let newDaysObject = {};
    LeavesDate.map((item)=>(
        
        newDaysObject[item]={
            selected:true,selectedColor:'red'
        },
        newDaysObject[item.Holidays]={
            selected:true,selectedColor:'orange'
        }
    ))

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress",props.OnDispaly);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", props.OnDispaly);
      }, []);
    return (
        <View>
             <View style={styles.TopView}>
             <TouchableOpacity onPress={() =>props.OnDispaly(2)} style={{paddingRight:5}}>
                    <Entypo name="arrow-left" size={34} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 27, fontWeight: "bold" }}>Leaves</Text>
            </View>
            <View style={{height:'85%',justifyContent:'center'}}>
            <Calendar
            firstDay={1}
            markedDates={newDaysObject}
            />
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
        padding:26,
        paddingLeft:5,
        paddingBottom:5
    },
});

export default Leaves;