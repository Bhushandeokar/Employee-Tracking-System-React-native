import React, { useState ,useEffect} from 'react';
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { setAttendance,setleaves,setNamePass } from '../prop/props';
import Moment from 'moment';

const LoginScreen = (props) => {
    const [CurrUserName, SetUserName] = useState('');
    const [CurrentPass, SetUserPass] = useState('');
    const [value, onChangeText] = useState(true);
    const [a, b] = useState(1)
    let eye;
  ;
  
  

    const Login = () => {
    fetch("http://192.168.43.234:3000/send",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:CurrUserName,
                password:CurrentPass,
             
            })
        })
        .then(res=>res.json()) 
        .catch(function(error) {
            console.log('Request failed', error);
        })
        .then((data)=>{
            if(data!=null){
            if (CurrUserName == data.name && CurrentPass == data.password && CurrentPass.length != 0 && CurrUserName.length != 0) {
                props.OnDispaly(1) 
                setAttendance(data.information)
            }}
            else {
                Alert.alert("Alert", "Invalid information", [{ text: "Cancel" }, { text: "Ok" }])

            }
        });
    }
    const Pass = () => {
        if (a % 2 != 0) {
            onChangeText(false);
        } else {
            onChangeText(true);
        }
    }
    if (a % 2 != 0) {
        eye = <AntDesign name="eye" size={24} color="black" style={{ marginTop: 3 }} />
    } else {
        eye =<Ionicons name="ios-eye-off" size={24} color="black" style={{ marginTop: 3 }} />
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.mainView}>
                <View style={styles.inputView}>
                    <Text style={{ fontSize: 55, color: 'white' }}>ET</Text>
                </View>
                <View style={styles.TextInput}>
                    <TextInput placeholder='Enter Your UserName...' style={styles.Input} autoCapitalize='none' onChangeText={text => SetUserName(text)} value={CurrUserName} />

                    <View style={styles.Input2}>
                    <TextInput style={{ width: "90%" }} placeholder='Password' autoCapitalize="none" secureTextEntry={value} onChangeText={text => SetUserPass(text)} value={CurrentPass} /><TouchableOpacity onPress={() =>( Pass(),b(a+1))}>{eye}</TouchableOpacity>
                    </View>

                    <View style={styles.loginView}>
                        <TouchableOpacity style={styles.LoginButton} title='Login' onPress={() =>{ Login(),setleaves(),setNamePass({name:CurrUserName,pass:CurrentPass,date:Moment().format("YYYY-MM-DD")})}} ><Text style={{ fontSize: 18, color: 'white' }}>Login</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    
}

const styles = StyleSheet.create({
    Input: {
        width: "100%",
        borderWidth: 2,
        height: 40,
        justifyContent: 'center',
        borderRadius: 15,
        height: 40,
        elevation: 8,
        backgroundColor: 'white',
        paddingLeft: 15,
        marginVertical: 15,
        fontWeight: '900',
        backgroundColor:'#a9bffc'

    }, Input2: {
        width: "100%",
        borderWidth: 2,
        height: 40,
        justifyContent: 'center',
        borderRadius: 15,
        height: 40,
        elevation: 8,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 15,
        flexDirection: 'row',
        backgroundColor:'#a9bffc'

    },
    LoginButton: {
        width: "100%",
        height: 35,
        borderRadius: 20,
        backgroundColor: "#5e74e0",
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 7
    },
    loginView: {
        marginTop: 15,
        width: '80%',
        alignSelf: 'center'
    },
    TextInput: {
        width: "75%",
        marginTop: "30%",
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputView: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginLeft: '37%',
        backgroundColor: '#5e74e0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainView: {
        width: "100%",
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#a9bffc'
    }

})
export default LoginScreen;
