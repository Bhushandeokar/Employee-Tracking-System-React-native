
import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity,BackHandler,ScrollView } from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { ScrollViewComponent } from "react-native";
import { Searchbar } from 'react-native-paper';
import call from 'react-native-phone-call';

const Parties = (props) => {
  const [value, onChangeText] = useState("");
  const [inputValue, setInputValue] = useState('');

    let PartiesData=[
        {PartieName:'Om sai.plt',PartiesAddress:'pune',ContactNumber:'7249869670'},
        {PartieName:'Lux ',PartiesAddress:'pune',ContactNumber:'9890488654'},
        {PartieName:' Wipro',PartiesAddress:'pune',ContactNumber:'9096999624'},
        {PartieName:'Punam',PartiesAddress:'pune',ContactNumber:'9096999324'},
         {PartieName:'Saiply',PartiesAddress:'pune',ContactNumber:'8329054808'},
        {PartieName:'Omsai',PartiesAddress:'pune',ContactNumber:'7387368166'},
        {PartieName:'Bhushan',PartiesAddress:'pune',ContactNumber:'79869670'},
        {PartieName:'Shivam',PartiesAddress:'pune',ContactNumber:'49869670'},
         {PartieName:'Quick',PartiesAddress:'pune',ContactNumber:'7899670'},
        {PartieName:'Tushar',PartiesAddress:'pune',ContactNumber:'5687670'},
        {PartieName:'Roshni',PartiesAddress:'pune',ContactNumber:'6569469670'},
        {PartieName:'Viki',PartiesAddress:'pune',ContactNumber:'7244588970'},
        {PartieName:'Poojainter',PartiesAddress:'pune',ContactNumber:'8654645814'},
         {PartieName:'Linux',PartiesAddress:'pune',ContactNumber:'1254987984'}
      
    ]
    var SearchArray=[];
    for(var i=0;i<PartiesData.length;i++){
        let Result=PartiesData[i].PartieName.includes(value)
        if(Result==true){
           SearchArray.push(PartiesData[i]) 
        }
    }
    
    
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",props.OnDispaly);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", props.OnDispaly);
  }, []);

const add=()=>{   
        if (inputValue.length != 10) {
          alert('Please insert correct contact number');
          return;
        }
        const args = {
          number: inputValue,
          prompt: true,
        };
        call(args).catch(console.error);
        setInputValue(" ")
      };

    return (
        <View >
             <View style={styles.TopView}>
             <TouchableOpacity onPress={() =>props.OnDispaly(2)} style={{paddingRight:5}}>
                    <Entypo name="arrow-left" size={34} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 27, fontWeight: "bold" ,color:'white'}}>Parties</Text>
            </View>
            <View style={{width:'90%',alignSelf:'center',marginVertical:10,elevation:5,borderWidth:1,borderRadius:5,borderColor:'white'}}>
            <Searchbar placeholder="Search Partie Name" onChangeText={text => onChangeText(text)} value={value} />
            </View>
          <ScrollView style={{height:'81.8%'}}>
    {SearchArray.map((item,index)=>(      
         <View key={index}style={{backgroundColor:'#d9dbda',width:'100%',height:80,borderBottomWidth:2,borderColor:'white',justifyContent:'center',justifyContent:'space-evenly',paddingHorizontal:10}}>
            <Text>Partie Name:{item.PartieName}</Text>
            <Text>Partie Address:{item.PartiesAddress}</Text>
          <View style={{flexDirection:'row'}}> 
          <Text>contact:</Text>
           <TouchableOpacity onPress={()=>{add(index),setInputValue(PartiesData[index].ContactNumber);}}><Text style={{color:'blue'}}>{item.ContactNumber}</Text></TouchableOpacity>
        </View>
        </View>
    ))}
    </ScrollView>
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

export default Parties;