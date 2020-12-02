import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import picture from "../assets/picture.jpg";

import { AuthContext } from "../components/context";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image1, setImage1] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailHandler = (enteredText) => {
    setEmail(enteredText);
  };

  const usernmaeHandler = (enteredText) => {
    setUsername(enteredText);
  };

  const passwordHandler = (enteredText) => {
    setPassword(enteredText);
  };

  const password2Handler = (enteredText) => {
    setPassword2(enteredText);
  };

  const showImageFunc = () => {
    setImage1(!image1);
  };

  const errorHandler = (error) => {
    setError(true);
    setErrorMessage(error);
    console.log(errorMessage);
  };

  const { signUp } = React.useContext(AuthContext);

  const signUpHandler = async (email, username, password, password2) => {
    try {
      let response = await fetch("http://127.0.0.1:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          password2: password2,
        }),
      });
      let json = await response.json();
      if (json.error != null) {
        errorHandler(json.error);
      }
      return signUp(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HeyAPP</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter email..."
          placeholderTextColor="#003f5c"
          onChangeText={emailHandler}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <Image source={picture} resizeMode="center" />
        <TextInput
          style={styles.inputText}
          placeholder="Pick your Username"
          placeholderTextColor="#003f5c"
          onChangeText={usernmaeHandler}
          value={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Create a Password"
          placeholderTextColor="#003f5c"
          onChangeText={passwordHandler}
          value={password}
        />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Re-entre you password"
          placeholderTextColor="#003f5c"
          onChangeText={password2Handler}
          value={password2}
        />
      </View>

      {error == true ? (
        <TextInput style={styles.forgot} value={errorMessage} />
      ) : (
        <Text></Text>
      )}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          signUpHandler(email, username, password, password2);
        }}
      >
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showImageFunc}>
        <Text style={styles.loginText}>Zweihander</Text>
      </TouchableOpacity>
      {image1 == false ? (
        <Text>+3</Text>
      ) : (
        <View style={styles.container1}>
          <Image style={styles.big} source={picture} resizeMode="cover" />
          <Text>si</Text>
        </View>
      )}
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

  container1: {
    paddingTop: 50,
  },
  big: {
    width: 1000,
    height: 1000,
  },
});
