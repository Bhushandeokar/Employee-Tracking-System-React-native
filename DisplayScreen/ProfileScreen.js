import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Entypo,Ionicons,MaterialIcons,AntDesign,FontAwesome } from '@expo/vector-icons';

const ProfileScreen = (props) => {

    return (
        <View style={styles.MainView}>
            <View style={styles.TopView}>
                <TouchableOpacity onPress={() =>props.OnBack(0)}>
                    <Entypo name="arrow-left" size={34} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 26, fontWeight: "bold" }}> Profile</Text>
            </View>
            <View style={{width:"100%",height:'20%',marginTop:"12%",alignItems:'center'}}>
                <View style={{width:'25%',height:"90%",backgroundColor:'#a9bffc',borderRadius:80,alignItems:'center',justifyContent:'center'}}>
                <Ionicons name="ios-person" size={64} color="black" />
                </View>
                <Text>  </Text>
                <Text>Welcome User</Text>
            </View>
            <View style={{marginTop:'19%',paddingTop:8,alignItems:'center'}}>
            <View style={styles.eminformantion}>
            <MaterialIcons name="face" size={24} color="black" />
                <Text>  Employee name:</Text>
            </View>
            <View style={styles.eminformantion}>
            <Ionicons name="md-person" size={24} color="gray" />
                <Text>   Employee Id:</Text>
            </View>
            <View style={styles.eminformantion}>
            <AntDesign name="solution1" size={24} color="black" />
                <Text>  USer ID:</Text>
            </View>
            <View style={styles.eminformantion}>
            <FontAwesome name="building-o" size={24} color="black" />
                <Text>  Company Name:</Text>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    MainView: {
        height: '90%',
        width: "100%"
    }, TopView: {
        width: '100%',
        height: '14%',
        backgroundColor: '#5e74e0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop:20

    },
    eminformantion:{width:'95%',height:'14.5%',backgroundColor:'#a9bffc',
    marginBottom:20,elevation:7,borderRadius:10,paddingLeft:15,paddingTop:5,alignItems:'center',flexDirection:'row'}
});

export default ProfileScreen;