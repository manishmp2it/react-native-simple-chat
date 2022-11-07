import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { db } from '../firebase'
import { collection, addDoc } from "firebase/firestore";


const AddChatScreen = ({ navigation }) => {

  const [input, setInput] = useState("")
 

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    })
  }, [navigation])

  const createChat = async()=>{
  
    await addDoc(collection(db, "chats"), {
      chatName:input
    }).then(()=>{
      navigation.goBack();
    }).catch((error)=>alert(error))

  }
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.inputContainer}
        mode='flat' placeholder='Enter a chat name' value={input}
        left={<TextInput.Icon icon="chat" />}
        onSubmitEditing={createChat}
        onChangeText={(text) => setInput(text)}
      />
      <Button icon="plus-circle-outline" mode="elevated" onPress={createChat}>
        Create new Chat
      </Button>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    padding:30,
    height:"100%"
  },
  inputContainer:{
    backgroundColor:"#fff",
    marginBottom:10
  }
})