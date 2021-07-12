import React from 'react'
import AltContainer from '../../components/containers/AltContainer'
import { View, Text, HStack, VStack, Stack, Pressable, Spacer, Input, Box, Square } from 'native-base'
import ControllerFormInput from '../../components/forms/Input'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '../../components/button'
import { colors } from '../../contants/colors'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function SignUpScreen () {
    const navigation = useNavigation()
    const { handleSubmit, control } = useForm()
    const { height } = Dimensions.get('screen')

    return (
        <AltContainer title="SignUp" backdropHeight={height / 6}>
            {/* SignUp area */}
            <View flexGrow={1} width="100%">
                {/* Actual form */}
                <Box bg="white" rounded="lg" padding={10} paddingBottom={12} position="relative">
                    <VStack space={4}>
                        <ControllerFormInput
                            name="phone"
                            control={control}
                            label="Enter Phone Number"
                            keyboardType="phone-pad" />
                    </VStack>
                    <Box position="absolute" paddingX={"5%"} bottom={-10}>
                        <PrimaryButton
                            text="Confirm"
                            press={() => navigation.navigate('verifyScreen')}
                        />
                    </Box>
                </Box>
            </View>

            {/* Footer view */}
            <View justifyContent="flex-start">
                <Text>
                    Already have an account
                </Text>
                <Pressable
                    onPress={() => console.log("SignUp")}
                >
                    <Text bold color={colors.primary}>
                        Sign in!
                    </Text>
                </Pressable>
            </View>
        </AltContainer>
    )
}
