import React from "react"
import { Box, NativeBaseProvider } from "native-base"
import { NavigationContainer } from '@react-navigation/native';
import Button from "./components/button"

const AllComponents: React.FC = () => {
    return (
        <Box>
            <Button />
        </Box>
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
