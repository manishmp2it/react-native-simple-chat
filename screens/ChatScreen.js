import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar, TouchableRipple } from 'react-native-paper'
import { Text } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';



const ChatScreen = ({ navigation, route }) => {

    const auth=getAuth();

    const [input, setInput] = useState('');
  const [messages,setMessages]=useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                >
                    <Avatar.Image size={30} source={{ uri:messages&& messages[0]?.data.photoURL }} />
                    <Text variant="titleMedium" style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            // headerLeft:()=>(
            //     <TouchableRipple>
            //           <Text>hello</Text>
            //     </TouchableRipple>
            // ),
            headerRight: () => (
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}
                >
                    <TouchableRipple>
                        <FontAwesome name="video-camera" size={24} color="#fff" />
                    </TouchableRipple>
                    <TouchableRipple>
                        <Ionicons name="md-call" size={24} color="#fff" />
                    </TouchableRipple>

                </View>
            )
        })

    }, [messages])

    const sendMessage = async () => {
        Keyboard.dismiss();
        const docref=collection(db,`chats`,`${route.params.id}`,'messages')
        await addDoc(docref, {
                    timestamp:serverTimestamp(),
                    message:input,
                    displayName:auth.currentUser.displayName,
                    email:auth.currentUser.email,
                    photoURL:auth.currentUser.photoURL
                  }
            );

        setInput("");
      }

      useLayoutEffect(()=>{
        const q = query(collection(db, `chats/${route.params.id}/messages`),orderBy("timestamp","desc"));
        const unsubscribe = onSnapshot(q,(snapshot) => {

              setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
            },
            (error) => {
              alert(error);
            });  

        return unsubscribe;
      },[route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

               
                <>
                    <ScrollView contentContainerStyle={{padding:15}}>
                    {messages.map(({id,data})=>(
                        data.email===auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                               <Avatar.Image style={styles.avatarReciever} size={25} source={{ uri: data.photoURL }} />
                               <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                            
                        ):(
                            <View key={id} style={styles.sender}>
                                <Avatar.Image style={styles.avatarSender} size={25} source={{ uri: data.photoURL }} />
                               <Text style={styles.senderText}>{data.message}</Text>
                               <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        )
                    ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Signal message' value={input}

                            // left={<TextInput.Icon icon="chat" />}
                            onSubmitEditing={sendMessage}
                            onChangeText={(text) => setInput(text)}
                        />
                        <TouchableRipple onPress={sendMessage}
                            rippleColor="rgba(0, 0, 0, .32)">
                            <Ionicons name="send" size={24} color="#2B6BE6" />
                        </TouchableRipple>
                    </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarReciever:{
        position:"absolute",
        right:-5,
        bottom:-15,
    },
    avatarSender:{
        position:"absolute",
        left:-5,
        bottom:-15,
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf: "flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:"#2B6BE6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative"
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})