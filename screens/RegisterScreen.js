import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Avatar, Button, IconButton, MD3Colors, Text, TextInput } from 'react-native-paper'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }) => {

  const auth = getAuth();

  // const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.uri)
      setImageUrl(result.uri);
    }
  };

  useLayoutEffect(() => {

  }, [navigation])

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password).then((authUser) => {

      updateProfile(authUser.user, {
        displayName: name,
        photoURL: imageUrl || "https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mm&r=g"
      }).then(alert("saved")).catch(error => alert(error.message));

      // authUser.user.({
      //   displayName:name,
      //   photoURL:imageUrl || "https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mm&r=g"
      // })
    }).catch(error => alert(error.message));
  }


  console.log(name);


  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container} >
      <StatusBar style='auto' />
      <Text variant="headlineMedium" style={{ marginBottom: 40, textAlign: "left",color:"#2C6BED",fontWeight:"500" }}>Create new account</Text>
      <View style={styles.avtarmain}>
        <Avatar.Image size={120} source={{ uri: imageUrl }} style />
        <IconButton
          icon="camera"
          iconColor={MD3Colors.neutral99}
          mode="contained-tonal"
          size={17}
          style={styles.avatarbutton}
          onPress={pickImage}
        />
      </View>
      <View>
        <TextInput
          style={styles.inputContainer}
          mode="flat"
          label="Full Name"
          placeholder="enter full name"
          value={name}
          onChangeText={(text) => setName(text)}
          right={<TextInput.Icon icon="account" />}
        />
        <TextInput
          style={styles.inputContainer}
          mode="flat"
          label="Email"
          placeholder="enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon icon="email" />}
        />
        <TextInput
          style={styles.inputContainer}
          mode="flat"
          label="Password"
          placeholder="enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon icon="lock" />}
        />
        
      </View>
      <Button style={styles.button} icon="account" mode='contained' buttonColor='#2C6BED' onPress={register}>Register</Button>
      <View style={{ height: 80 }} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  button: {
    width: 200,
    marginTop: 20
  },
  inputContainer: {
    width: 300,
    backgroundColor: "#fff"
  },
  avatarbutton: {
    position: "absolute",
    right: 5,
    bottom: -15,
    backgroundColor:"#83858969"
},
avtarmain:{
  marginBottom:20

}
})