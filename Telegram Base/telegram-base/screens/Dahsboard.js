import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Chat from "../components/chat/Chat";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

import { AuthContext } from "../components/context";

export default function Dashboard() {
  const { signOut } = React.useContext(AuthContext);

  var socket = socketClient(SERVER, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  const TESTDB = async () => {
    try {
      let response = await fetch("http://127.0.0.1:5000/test");
      let json = await response.json();
      console.log(json);
      return json.message;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Text goes here</Text>
        <Chat />
      </View>

      <Button
        title="LOG OUT"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    //fontFamily: "Bahnschrift",
    fontSize: 50,
    color: "#2B4570",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    borderBottomColor: "#2B4570",
    borderBottomWidth: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 70,
    fontSize: 20,
    color: "#003f5c",
  },
  forgot: {
    color: "#003f5c",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "#003f5c",
  },
  logo1: {
    width: 200,
    height: 200,
    resizeMode: "center",
  },
});
