import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "./themes/ThemeProvider";
import Dashboard from "./screens/Dahsboard";
import Login from "./screens/Login";
import { AuthContext } from "./components/context";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  //const [isLoading, setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const LoginReducer = (prevState, action) => {
    switch (action.type) {
      case "TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    LoginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (json) => {
        let userToken = null;
        userToken = json.token;
        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        console.log(json);
        dispatch({ type: "LOGIN", id: json.body.email, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        //setUserToken("kasldfsl");
        //setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <AppearanceProvider>
        <ThemeProvider>
          <NavigationContainer>
            {loginState.userToken != null ? (
              <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={Dashboard} />
              </Drawer.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </AuthContext.Provider>
  );
}
