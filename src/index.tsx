import React from "react";
import { HStack, NativeBaseProvider, VStack, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Button from "./components/button";
import Header from "./components/header";
import Cards from "./components/cards";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "./contants/colors";
import {
  TextInput,
  SearchBar,
  DropDown,
  Location,
} from "./components/textFields";
import { CheckBox, FBLogo, TimeSet } from "./components/bars";
import { PicAvatar } from "./components/avatar";
import { createStackNavigator } from "@react-navigation/stack";


import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp";
import VerifyScreen from "./screens/Verify";
import ServiceScreen from "./screens/Service";
import AdvisoryScreen from "./screens/Advisory";

const Profile = () => {
  return (
    <HStack space={4} alignItems="center">
      <MaterialIcons name="person" size={32} color={colors.primary} />
      <Text>Profile</Text>
    </HStack>
  );
};

const Stack = createStackNavigator();

const AllComponents: React.FC = () => {
  return (
    <ScrollView>
      <VStack
        space={24}
        paddingX={12}
        paddingY={10}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
      >
        <Profile />
        <Header />
        <Button />
        <Cards />
        <TextInput holderText={"First Name and Last Name"} />
        <SearchBar />
        <DropDown holderText={"First Name and Last Name"} />
        <Location holderText={"London"} />
        <TimeSet time={"6:00 AM"} />
        <FBLogo />
        {/* <Number number={10} /> */}
        <CheckBox item={"item"} />
        <PicAvatar />
      </VStack>
    </ScrollView>
  );
};
export default () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Advisory"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Verify" component={VerifyScreen} />
          <Stack.Screen name="Service" component={ServiceScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Advisory" component={AdvisoryScreen} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
