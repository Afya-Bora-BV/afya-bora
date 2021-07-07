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
import { CheckBox, FBLogo, Number, TimeSet } from "./components/bars";

const Profile = () => {
  return (
    <HStack space={4} alignItems="center">
      <MaterialIcons name="person" size={32} color={colors.primary} />
      <Text>Profile</Text>
    </HStack>
  );
};
const AllComponents: React.FC = () => {
  return (
    <ScrollView>
      <VStack space={24} paddingX={12} paddingY={10}>
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
        <Number number={10} />
        <CheckBox item={"item"} />
      </VStack>
    </ScrollView>
  );
};
export default () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AllComponents />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
