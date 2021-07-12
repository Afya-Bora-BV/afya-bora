import React from 'react'
import { Container, ScrollView, StatusBar, View, Text, HStack, VStack, Stack, Spacer, Input, Box, Square } from 'native-base'
import { colors } from '../contants/colors'
import { Pressable, Dimensions } from 'react-native';
import { useForm, useController, Controller } from 'react-hook-form';
import { CheckBox } from '../components/bars';
import { PrimaryButton } from '../components/button';
import { Circle } from 'react-native-maps';

function MainContainer ({ children, title }: any) {
	const { height } = Dimensions.get("screen");
    return (
        <Container flex={1} position="relative">
			<StatusBar translucent backgroundColor={colors.primary} />
            {/* Background image */}
            <Stack
                backgroundColor={colors.primary}
                borderBottomRadius={36}
                height={height / 3.5}
                position="absolute"
                top={0}
                left={0}
                right={0}
            />
            <View position="relative" width="100%" paddingX={5}>
                {/* Placeholder for icon */}
                <Square size="sm" rounded="lg" bg="primary.400">
                    <Box
                        _text={{
                            fontWeight: "bold",
                            fontSize: "lg",
                            color: "white",
                        }}
                        >
                    20
                    </Box>
                </Square>
                <Box position="absolute" alignSelf="center" alignItems="center" justifyContent="center">
                    <Text color="white">{title}</Text>
                </Box>
            </View>
            <View flex={1} padding={4}>
                {children}
            </View>
        </Container>
    );
}

const FormInput = ({ label, keyboardType, control, name }: any) =>  {
    // console.log({ others })
    const { formState: { errors }, } =  useController({ name, control });

    return (
        <Stack>
            <Text>{label}</Text>
            <Spacer size={2} />
            <Controller
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                }) => (
                    <Input
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        outlineColor={
                            errors[name] ? "red" : ""
                        }
                        variant="rounded"
                        placeholder={label}
                        keyboardType={keyboardType}
                        autoCapitalize={"none"}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
            />
        </Stack>
    )
}

export default function Login () {
    const { register, handleSubmit, control } = useForm()
    return (
        <MainContainer title="Login">
            {/* Login area */}
            <View flexGrow={1} width="100%">
                {/* Actual form */}
                <Box bg="white" rounded="lg" padding={10} paddingBottom={20}>
                    <VStack space={4}>
                        <FormInput
                            name="email"
                            control={control}
                            label="Email or phone number"
                            keyboardType="email-address" />
                        <FormInput
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
                                shadow={5}
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
        </MainContainer>
    )
}