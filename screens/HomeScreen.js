import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar, Divider } from 'react-native-paper'
// import { auth } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { db } from '../firebase'
import { doc, onSnapshot, getDoc, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import Spinner from 'react-native-loading-spinner-overlay'
import { FlashList } from '@shopify/flash-list'

const HomeScreen = ({ navigation }) => {

  const auth = getAuth();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigation.replace("Login");
      }
      else {
        const unsubscribe = onSnapshot(
          collection(db, "chats"),
          (snapshot) => {

            console.log(snapshot.size)

            if (snapshot.size) {
              setLoading(false);
            }
            else {
              setLoading(false);
            }

            setChats(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          },
          (error) => {
            alert(error);
          });
      }
    })

    return unsubcribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} style={{marginRight:15}}>
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
  }, [navigation, auth.currentUser])

  const enterChat = (id, chatName) => {
    console.log(id)
    navigation.navigate('Chat', {
      id: id,
      chatName: chatName
    })
  }

  return (
    <SafeAreaView>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
     <View style={styles.container}>
     <FlashList
        data={chats}
        renderItem={({item})=>(
          <CustomListItem id={item.id} chatName={item.data.chatName} enterChat={enterChat} />
        )}
        keyExtractor={item => item.id}
        estimatedItemSize={84}
      />
     </View>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  spinnerTextStyle: {
    marginTop:10,
    color: '#FFF'
  },
})