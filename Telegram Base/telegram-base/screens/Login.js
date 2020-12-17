import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import logo from "../assets/icon.png";

import { AuthContext } from "../components/context";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (enteredText) => {
    setUsername(enteredText);
  };

  const passwordHandler = (enteredText) => {
    setPassword(enteredText);
  };

  const { signIn } = React.useContext(AuthContext);

  const loginHandler = async (username, password) => {
    try {
      let response = await fetch(
        "https://thrust-back.herokuapp.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );
      let json = await response.json();
      return signIn(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo1} source={logo} resizeMode="cover" />
      <Text style={styles.logo}>Thrust</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={emailHandler}
          value={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={passwordHandler}
          value={password}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          loginHandler(username, password);
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Go create an account you dummy"
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
