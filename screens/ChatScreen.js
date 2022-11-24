import { Alert, Button, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar, TouchableRipple } from 'react-native-paper'
import { Text } from 'react-native-paper';
import { Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { Camera, CameraType } from 'expo-camera';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { FlashList } from '@shopify/flash-list';



const ChatScreen = ({ navigation, route }) => {


    const auth = getAuth();

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState(null);


    const [startCamera, setStartCamera] = React.useState(false)

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerShown: startCamera ? false : true,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                >
                    <Avatar.Image size={30} source={{ uri: messages && messages[0]?.data.photoURL }} />
                    <Text variant="titleMedium" style={{ color: "black", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
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

    }, [messages, startCamera])

    const sendMessage = async () => {
        if (input != '') {
            Keyboard.dismiss();
            let mess = "";
            mess = input;
            setInput("");
            const docref = collection(db, `chats`, `${route.params.id}`, 'messages')
            await addDoc(docref, {
                timestamp: serverTimestamp(),
                message: mess,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            }
            );
        }
    }

    useLayoutEffect(() => {
        const q = query(collection(db, `chats/${route.params.id}/messages`), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {

            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        },
            (error) => {
                alert(error);
            });

        return unsubscribe;
    }, [route])

    const renderItem = ({ item }) => (
        item && item.data.email === auth.currentUser.email ? (
            <View style={styles.reciever}>
                <Avatar.Image style={styles.avatarReciever} size={25} source={{ uri: item.data.photoURL }} />
                <Text style={styles.recieverText}>{item.data.message}</Text>
            </View>

        ) : (
            <View style={styles.sender}>
                <Avatar.Image style={styles.avatarSender} size={25} source={{ uri: item.data.photoURL }} />
                <Text style={styles.senderText}>{item.data.message}</Text>
                <Text style={styles.senderName}>{item.data.displayName}</Text>
            </View>
        )
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* <StatusBar style='light' /> */}
            {startCamera ? <Camera
                style={{ flex: 1, width: "100%" }}
                ref={(r) => {
                    camera = r
                }}
            >
            </Camera> : <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
                // keyboardVerticalOffset={90}
            >
                <FlashList
                    data={messages}
                    renderItem={renderItem}
                    inverted
                    keyExtractor={item => item.id}
                    estimatedItemSize={100}
                />
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Signal message' value={input}
                        onSubmitEditing={sendMessage}
                        onChangeText={setInput}
                        selectionColor="#55565736"
                        cursorColor='black'

                    />
                    <TouchableOpacity onPress={__startCamera}>
                        {/* <Feather name="camera" size={24} color="#595959" style={styles.icon} /> */}
                        <Entypo name="attachment" size={22} color="#595959" style={styles.icon} />
                    </TouchableOpacity>
                    <MaterialCommunityIcons name="microphone-outline" size={26} color="#595959" style={styles.icon} />
                    <TouchableRipple onPress={sendMessage}
                        rippleColor="rgba(0, 0, 0, .32)">
                        <Ionicons name="send" size={24} color="#2B6BE6" />
                    </TouchableRipple>
                </View>
            </KeyboardAvoidingView>}

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarReciever: {
        position: "absolute",
        right: -5,
        bottom: -15,
    },
    avatarSender: {
        position: "absolute",
        left: -5,
        bottom: -15,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B6BE6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
        // backgroundColor: "#f2f2f2",
    },
    icon: {
        marginHorizontal: 5
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
        tintColor: "black"

    }
})