import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
// import { auth } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {

  const auth=getAuth();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


useEffect(()=>{
   const unsubcribe= auth.onAuthStateChanged((authUser)=>{

    console.log(authUser)
      if(authUser){
        navigation.replace("Home");
      }
    })

    return unsubcribe;
},[])

const signIn=()=>{
  signInWithEmailAndPassword(auth,email,password).catch((error)=>alert(error))
}

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image source={{ uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png" }} style={{ width: 200, height: 200 }} />
      <View>
        <TextInput
        style={styles.inputContainer}
          mode="flat"
          label="Email"
          placeholder="enter email"
          value={email}
          onChangeText={(text)=>setEmail(text)}
          right={<TextInput.Icon icon="email"/>}
        />
        <TextInput
        style={styles.inputContainer}
          mode="flat"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text)=>setPassword(text)}
          placeholder="enter password"
          onSubmitEditing={signIn}
          right={<TextInput.Icon icon="lock" />}
        />
      </View>
      <Button style={styles.button} icon="login" mode='contained' buttonColor='#2C6BED' onPress={signIn}>Login</Button>
      <Button style={styles.button} icon="account" mode='contained' buttonColor='#2C6BED' onPress={()=>navigation.navigate('Register',{name:"Login"})}>Register</Button>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      padding:10,
      backgroundColor:"white"
  },
  inputContainer:{
    width:300,
    backgroundColor:"#fff"
  },
  button:{
    width:200,
    marginTop:10,
  }
})