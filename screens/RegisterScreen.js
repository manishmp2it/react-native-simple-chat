import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Text, TextInput } from 'react-native-paper'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'

const RegisterScreen = ({navigation}) => {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [imageUrl,setImageUrl]=useState('');


    useLayoutEffect(()=>{

        navigation.setOptions({
            headerBackTitleVisible:true,
            headerBackTitle:"Login",
            
        });

    },[navigation])

    const register=()=>{
        createUserWithEmailAndPassword(auth,email,password).then((authUser)=>{

          updateProfile(authUser.user,{
            displayName:name,
              photoURL:imageUrl || "https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mm&r=g"
          }).then(alert("saved")).catch(error=>alert(error.message));

            // authUser.user.({
            //   displayName:name,
            //   photoURL:imageUrl || "https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mm&r=g"
            // })
        }).catch(error=>alert(error.message));
    }


    console.log(name);


  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container} >
        <StatusBar style='light'/>
      <Text variant="headlineSmall" style={{marginBottom:50}}>Create a Signal account</Text>
      <View>
      <TextInput
        style={styles.inputContainer}
          mode="flat"
          label="Full Name"
          placeholder="enter full name"
          value={name}
          onChangeText={(text)=>setName(text)}
          right={<TextInput.Icon icon="account" />}
        />
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
          placeholder="enter password"
          value={password}
          onChangeText={(text)=>setPassword(text)}
          right={<TextInput.Icon icon="lock"/>}
        />
        <TextInput
        style={styles.inputContainer}
          mode="flat"
          label="Profile Picture URL (optional)"
          placeholder="https://"
          value={imageUrl}
          onChangeText={(text)=>setImageUrl(text)}
          onSubmitEditing={register}
          right={<TextInput.Icon icon="image"/>}
        />
      </View>
      <Button style={styles.button} icon="account" mode='contained' buttonColor='#2C6BED' onPress={register}>Register</Button>
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    button:{
        width:200,
        marginTop:20
    },
    inputContainer:{
        width:300,
        backgroundColor:"#fff"
    }
})