import React,{useState} from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ScrollViewComponent } from 'react-native';
import { Ionicons, AntDesign, Entypo,Foundation,FontAwesome ,MaterialCommunityIcons,FontAwesome5} from '@expo/vector-icons';


const Homescreen = (props) => {
  const [a,b]= useState(0)
  let ScreenDispaly;
      
    return (
        <View>
            <View style={styles.TopView}>
                <Text style={{ fontSize: 27, fontWeight: "bold" ,color:'white'}}>Home</Text>
                <View style={{ flexDirection: 'row',paddingTop:8}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' ,color:'white'}}>Log-out  </Text>
                    <TouchableOpacity onPress={() => props.OnBack(0)}>
                        <Entypo name="log-out" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.ScrollViewstyle}>

                <View style={styles.HomescreenView}>

                <TouchableOpacity style={styles.Features} onPress={()=>{props.OnBack(3)}} >
                        <View style={styles.border}>
                        <Ionicons name="md-contacts" size={54} color="black" />
                            <Text  >Parties</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Features} onPress={()=>{props.OnBack(4)}}>
                        <View style={styles.border}>
                        <Foundation name="clipboard-notes" size={44} color="black"style={{paddingBottom:8}} />
                            <Text  >Notes</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Features} onPress={()=>{props.OnBack(5)}}>
                        <View style={styles.border}>
                        <FontAwesome name="calendar" size={44} color="black" style={{paddingBottom:8}}/>
                            <Text  >Attendance</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Features} onPress={()=>{props.OnBack(6)}}>
                        <View style={styles.border}>
                        <MaterialCommunityIcons name="calendar-multiselect" size={54} color="black" />
                            <Text  >Leaves</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Features} onPress={()=>{props.OnBack(7)}}>
                        <View style={styles.border}>
                        <FontAwesome5 name="telegram-plane" size={48} color="black" />
                            <Text  >Daily Route</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Features} onPress={()=>{props.OnBack(8)}}>
                        <View style={styles.border}>
                        <Ionicons name="md-locate" size={54} color="black" />
                            <Text  >Your Location</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
{ScreenDispaly}
        </View>
    );
};

const styles = StyleSheet.create({
    TopView: {
        width: '100%',
        height: 75,
        backgroundColor: '#5e74e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:20,
        paddingBottom:5
    },
    HomescreenView: {
        height: "100%",
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 1,
        marginBottom: 15,
    },
    Features: {
        backgroundColor: '#a9bffc',
        width: "40%",
        height: 150,
        marginTop: 25,
        marginLeft: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: "center"
    },
    ScrollViewstyle: {
        height: '87%',
        marginBottom: -56,
        paddingBottom: 300,
    },
    border: { borderWidth: 1, width: '90%', height: '90%', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }
});

export default Homescreen;