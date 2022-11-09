import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar, Divider } from 'react-native-paper'
// import { auth } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { db } from '../firebase'
import { doc, onSnapshot, getDoc, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const HomeScreen = ({ navigation }) => {

  const auth=getAuth();

  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "chats"),
      (snapshot) => {
        setChats(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      },
      (error) => {
        alert(error);
      });

    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar.Image size={30} source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      </View>,
      headerRight: () => <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 20,
      }}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="camerao" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
          <SimpleLineIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
    })
  }, [navigation])

  const enterChat=(id,chatName)=>{
    navigation.navigate('Chat',{
      id:id,
      chatName:chatName
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats!=undefined && chats!=null && chats.length>0 ?  chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        )):<View></View>}

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
  container:{
    height:"100%"
  }
})