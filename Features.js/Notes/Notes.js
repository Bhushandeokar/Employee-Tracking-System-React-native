
import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, ScrollView, _ScrollView } from 'react-native';
import { Ionicons, AntDesign, Entypo,MaterialIcons } from '@expo/vector-icons';
import { setMain, getmain, SetDiscription ,DeletNotes} from "../../prop/props";

const Notes = (props) => {
    var NotesArray = [];
    let al, listScreen;
    const [Title, SetTitle] = useState('NO Note Name');
    const [Descri, SetDescrip] = useState('');
    const [Screen, SetScreen] = useState(0);
    const [a, b] = useState();

    NotesArray = getmain();

    if (NotesArray.length != 0) {
        listScreen = NotesArray.map((item, index) => (
            <View key={index} style={{ alignItems: 'center', }}>
                <TouchableOpacity style={styles.stylenofn} onLongPress={()=>{DeletNotes(index)}} onPress={() => { b(index), SetScreen(2) }}>
                    <Text style={{ marginLeft: 20 }}>{index + 1} : {item.title}</Text>
                </TouchableOpacity>
            </View>

        ))
    } else {
        listScreen = <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
            <Text style={{ color: 'red', fontSize: 28 }}>No Any Note</Text>
        </View>
    }

    if (Screen == 0) {
        al = <View >
            <View style={styles.TopView}>
                <TouchableOpacity
                    onPress={() => props.OnDispaly(2)}
                    style={{ paddingRight: 5 }}>
                    <Entypo name="arrow-left" size={34} color="white" />
                </TouchableOpacity>
                <Text style={styles.nevigation}>Notes</Text>
            </View>

            <View style={{ height: '81.5%' }}>
                <ScrollView>
                    {listScreen}

                </ScrollView>
            </View>
            <View style={styles.plusebutton}>
                <TouchableOpacity
                    style={styles.Addbutton}
                    onPress={() => { SetScreen(1) }}>
                    <AntDesign name="plus" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    }
    else if (Screen == 1) {
        al = <View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.TopView}>
                    <TouchableOpacity
                        onPress={() => { SetScreen(0) }}
                        style={{ paddingRight: 5 }}>
                        <Entypo name="arrow-left" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.nevigation}>Write A Note</Text>
                </View>

                <View style={styles.noteName}>
                    <TextInput placeholder="Note Name"
                        style={{ marginHorizontal: 10 }}
                        onChangeText={text => SetTitle(text)}
                        Value={Title}>
                    </TextInput>
                </View>

                <View style={styles.Discription}>
                        <TextInput style={{ fontSize: 18 }} placeholder={'Discription'}
                            onChangeText={text => SetDescrip(text)}
                            multiline={true}
                            Value={Descri}
                         />
                
                </View>
            </View>


            <View style={{ alignItems: 'flex-end', marginRight: 20, }}>
                <TouchableOpacity
                    style={styles.Addbutton}
                    onPress={() => { SetScreen(0), setMain({ title: Title, Discription: Descri }), SetTitle('No Note Name') }}>
                    <AntDesign name="check" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>

    } else if (Screen == 2) {
        al = <View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.TopView}>
                    <View style={{flexDirection:'row',flex:1}}>
                    <TouchableOpacity
                        onPress={() => { SetScreen(0) }}
                        style={{ paddingRight: 5 }}>
                        <Entypo name="arrow-left" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.nevigation}>Write A Note</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {DeletNotes(a),SetScreen(0)  }}>
                        <MaterialIcons name="delete" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.noteName}>
                    <Text style={{ marginHorizontal: 10 }}>Note Name : {NotesArray[a].title}</Text>
                </View>

                <View style={styles.Discription}>
            
                        <TextInput style={{ fontSize: 18,height:'100%',textAlignVertical:'top' }} placeholder={'Discription'}
                            Value={NotesArray[a].Discription}
                            onChangeText={text => SetDescrip(text)}
                            multiline={true}
                            >
                            {NotesArray[a].Discription}
                        </TextInput>
                </View>
                
            </View>


            <View style={{ alignItems: 'flex-end', marginRight: 20, }}>
                <TouchableOpacity
                    style={styles.Addbutton}
                    onPress={() => { SetScreen(0), SetDiscription(a, Descri) }}>
                    <AntDesign name="check" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>

    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", props.OnDispaly);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", props.OnDispaly);
    }, []);

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {al}
            </TouchableWithoutFeedback>
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
        paddingBottom: 5,
    },
    Addbutton:
    {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stylenofn: { width: "90%", height: 55, borderWidth: 1, justifyContent: 'center', borderRadius: 15, marginVertical: 10 },
    noteName: { marginTop: 5, height: 50, width: "96%", borderWidth: 1, justifyContent: 'center', borderRadius: 15 },
    Discription: { width: '96%', height: "68%", marginTop: 10, borderWidth: 1, borderRadius: 15, padding: 15 },
    nevigation: { fontSize: 27, fontWeight: "bold", color: 'white' },
    plusebutton: { alignItems: 'flex-end', marginRight: 20, bottom: 1 },
});

export default Notes;