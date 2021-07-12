import React from 'react'
import { View, Text, HStack, VStack, Stack, Spacer, Input, Box, Square } from 'native-base'
import { Pressable, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';

import { colors } from '../contants/colors'
import { CheckBox } from '../components/bars';
import { PrimaryButton } from '../components/button';
import AltContainer from '../components/containers/AltContainer';
import ControllerFormInput from '../components/forms/Input';


export default function Login () {
    const { handleSubmit, control } = useForm()
    const { height } = Dimensions.get('screen')

    return (
        <AltContainer title="Login" backdropHeight={height / 2.5}>
            {/* Login area */}
            <View flexGrow={1} width="100%">
                {/* Actual form */}
                <Box bg="white" rounded="lg" padding={10} paddingBottom={20}>
                    <VStack space={4}>
                        <ControllerFormInput
                            name="email"
                            control={control}
                            label="Email or phone number"
                            keyboardType="email-address" />
                        <ControllerFormInput
                            name="password"
                            control={control}
                            label="Password"
                            keyboardType="password" 
                        />
                        {/* Remeber me + Forgot Password */}
                        <HStack justifyContent="space-between">
                            <CheckBox item={"Remember me"} />

                            <Stack justifyContent="center">
                                <Pressable>
                                    <Text color={"#2AD3E7"}>
                                        Forgot Password
                                    </Text>
                                </Pressable>
                            </Stack>
                        </HStack>
                        <Box mb={-6} paddingX={"5%"}>
                            <PrimaryButton
                                text={"Login"}
                                press={() => console.log("Login")}
                            />
                        </Box>
                    </VStack>
                </Box>
            </View>

            {/* Footer view */}
            <View justifyContent="flex-start">
                <Text>
                    Don't have any account? 
                </Text>
                <Pressable
                    onPress={() => console.log("SignUp")}
                >
                    <Text bold color={colors.primary}>
                        Sign up now!
                    </Text>
                </Pressable>
            </View>
        </AltContainer>
    )
}