import React from "react"
import { Box, NativeBaseProvider, VStack } from "native-base"
import { NavigationContainer } from '@react-navigation/native';
import Header from "./components/header"
import Cards from "./components/cards"

const AllComponents: React.FC = () => {
    return (
        <VStack paddingX={12} paddingY={10}>
            <Header/>
            <Cards/>
        </VStack>
    )
}
export default () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <AllComponents />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
