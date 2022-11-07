import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List } from 'react-native-paper'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({id,chatName,enterChat}) => {

  const [chatMessages,setChatMessages]=useState([]);

  useEffect(()=>{
    const q = query(collection(db, `chats/${id}/messages`),orderBy("timestamp","desc"));
    const unsubscribe = onSnapshot(q,(snapshot) => {

          setChatMessages(snapshot.docs.map(doc => doc.data()))
        },
        (error) => {
          alert(error);
        });  

        return unsubscribe;
  },[])

  return (
    <>
    <List.Item
    onPress={()=>enterChat(id,chatName)}
    key={id}
    title={chatName}
    
    titleStyle={{fontWeight:"bold"}}
    descriptionNumberOfLines={1}
    style={{backgroundColor:"#fff",}}
    description={`${chatMessages?.[0]?.displayName}: ${chatMessages?.[0]?.message}`}
    left={()=> <Avatar.Image size={40} source={{uri: chatMessages?.[0]?.photoURL || "https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mm&r=g"}} style={{marginTop:"10px",marginRight:"10px"}}/>}
  />
  <Divider/>
  </>
  )
}

export default CustomListItem