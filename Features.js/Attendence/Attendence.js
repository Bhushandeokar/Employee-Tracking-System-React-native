
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { getAttendance } from "../../prop/props";

const Attendence = (props) => {
    const Attendeance = []
    const nextDays = getAttendance()
    for (var i = 0; i < nextDays.length; i++) {
        var dt = new Date(nextDays[i].date);
        
            Attendeance.push(nextDays[i].date)
        
    }
    console.log("a", Attendeance)

    let newDaysObject = {};
    Attendeance.map((item) => (

        newDaysObject[item] = {
            selected: true, selectedColor: 'green'
        }
    ))
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", props.OnDispaly);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", props.OnDispaly);
    }, []);

    return (
        <View>
            <View style={styles.TopView}>
                <TouchableOpacity onPress={() => props.OnDispaly(2)} style={{ paddingRight: 5 }}>
                    <Entypo name="arrow-left" size={34} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 27, fontWeight: "bold" }}>Attendence</Text>
            </View>
            <View style={{ height: '85%', justifyContent: 'center' }}>
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
        padding: 26,
        paddingLeft: 5,
        paddingBottom: 5
    },
});

export default Attendence;