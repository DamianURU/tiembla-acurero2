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

import { AuthContext } from "../components/context";

export default function Dashboard() {
  const { signOut } = React.useContext(AuthContext);

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
      <Text style={styles.logo}>HeyAPP</Text>
      <Text>Hello you are on the Dashboard</Text>
      <Button
        title="test database"
        onPress={() => {
          TESTDB();
        }}
      />
      <Button
        title="LOG OUT BITCH"
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
});
