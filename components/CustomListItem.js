import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List } from 'react-native-paper'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      setChatMessages(snapshot.docs.map(doc => doc.data()))
    },
      (error) => {
        alert(error);
      });

    return unsubscribe;
  }, [])

  return (
    <View>
      {chatMessages!=null && chatMessages!=undefined && chatMessages.length>0 ? <List.Item
        onPress={() => enterChat(id, chatName)}
        key={id}
        title={chatName}

        titleStyle={{ fontWeight: "bold" }}
        descriptionNumberOfLines={1}
        style={{ backgroundColor: "#fff", }}
        description={`${chatMessages&& chatMessages[0]&&chatMessages[0].displayName}: ${chatMessages&&chatMessages[0]&&chatMessages[0].message}`}
        left={() => <Avatar.Image size={40} source={{ uri: `${chatMessages&&chatMessages[0]&&chatMessages[0].photoURL}` }} style={{ marginTop:10, marginRight:10 }} />}
      />:<View></View>}
      <Divider />
    </View>
  )
}

export default CustomListItem