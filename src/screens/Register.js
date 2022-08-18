import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground, ScrollView} from "react-native";
import LogIn from "../img/LogIn.png"
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

const img = "../img/LogIn.png";
const IP = "10.144.1.13"; 

const Register = ({navigation}) => {

  
  
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [name, setName] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [cellphone, setCellphone] = useState([]);
    const [mail, setmail] = useState([]);
    const [description, setDescription] = useState([]);
    const [premium, setPremium] = useState([]);
    const [occupation, setOccupation] = useState([]);
    const [user, setUser] = useState({});

    const handleRegister = async () =>{
      if(username.length < 1 || password.length < 1 || mail.length < 1 || premium.length < 1){
        return alert('los campos username, password, mail y premium son obilgatorios, completelos')
      } else{
        console.log('holaaaa')
        setUser({
          username: username,
          password: password,
          name: name,
          lastname: lastname,
          cellphone: cellphone,
          mail: mail,
          description: description,
          premium: premium,
          occupation: occupation
        });
        console.log(user)
        register()
      }
    }

    const register = async ()=>{
      const res = await axios.post
      (
        `http://10.144.1.13:4000/usuarios/register`,
        user,
        {
          headers: {
              'Content-Type': 'application/json'
          }
        }).then(response =>{
          navigation.navigate('Login')
        })
      }

    return (
      <>
        <ImageBackground source={require('../img/LogIn.png') } resizeMode="cover" style={styles.image} >
        <ScrollView>
        <View style={styles.container}>
        <TextInput style={styles.input} placeholder="     Username" onChangeText={(value) => setUsername(value)}/>
        <TextInput style={styles.input} placeholder="     Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)}/>

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <TextInput style={styles.input2} placeholder="     Name" onChangeText={(value) => setName(value)}/>
            <TextInput style={styles.input2} placeholder="     Lastname" onChangeText={(value) => setLastname(value)}/>
        </View>
        <View>
        <TextInput style={styles.input} placeholder="     Cellphone" keyboardType="phone-pad" onChangeText={(value) => setCellphone(value)}/>
        <TextInput style={styles.input} placeholder="     Mail" keyboardType="email-address" onChangeText={(value) => setmail(value)}/>
        <TextInput style={styles.input} placeholder="     Description" onChangeText={(value) => setDescription(value)}/>
         <TextInput style={styles.input} placeholder="     Premium" onChangeText={(value) => setPremium(value)}/>
        <TextInput style={styles.input} placeholder="     Occupation" onChangeText={(value) => setOccupation(value)}/>
        </View>
        <Pressable 
            style={styles.button} title="Log in" borderRadius={30}
            onPress={handleRegister}
            >
            <Text style={{color: '#733A26', fontWeight: 'bold'}}>Registrarse</Text>
        </Pressable>
        <Pressable 
            style={styles.button} title="Log in" borderRadius={30}
            onPress={()=>navigation.navigate('Login')}
            >
            <Text style={{color: '#733A26', fontWeight: 'bold'}}>Sí tengo cuenta</Text>
        </Pressable>

        </View>
        </ScrollView>
        </ImageBackground>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      backgroundImage: "#000000",
      alignItems: "center",
      justifyContent: "center",
    },
    input:{
      backgroundColor: "#F4F3F1",
      marginRight:110,
      borderRadius:14,
     height:60,
     width: 300,
     marginLeft: 120,
     marginTop: "5%"
    },
    input2:{
        backgroundColor: "#F4F3F1",
        borderRadius:14,
        height:60,
        width: 150,
        marginTop:"5%"
    }, 
    button:{

      alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#F6E2D3',
    height: 60,
    width: 150,
    marginTop: 20
    },image: {
      height: '100%',
      width: '100%',
      flex: 1,
      justifyContent: "center"
    },  
    checkbox: {
      alignSelf: "center",
    },
    
  });

export default Register;