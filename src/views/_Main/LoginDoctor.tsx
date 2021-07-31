import {
    Box,
    Center,
    HStack,
    Input,
    Pressable,
    ScrollView,
    Stack,
    Text,
    View,
    Square,
    VStack,
    Button,
    useToast,
} from "native-base";
import React, { useState, useCallback } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ToastAndroid } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { NavKey as _MainAppNavKey } from './_navigator'
import { Consultant, useAuthStore } from "../../internals/auth/context";
import AltContainer from "../../components/containers/AltContainer";
import { ControllerFormInput } from "../../components/forms/inputs";
import { useMutation } from "react-query";
import _ from "lodash";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// let render = 0

const { height } = Dimensions.get("screen");


const formEmailSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});
interface FormEmailInputs {
    email: string
    password: string
}

const fetchUserProfile = async (): Promise<Consultant | undefined> => {
    const uid = await auth().currentUser?.uid
    const profile = await firestore().collection("consultants").where("uid", "==", uid).get()
    const data = profile.docs.map(doc => ({ ...doc.data(), id: doc.id, uid: uid } as Consultant))
    return data[0]
}

const loginWithEmailAndPassword = async ({ email, password }: FormEmailInputs): Promise<undefined> => {
    await auth().signInWithEmailAndPassword(email, password)
    // const profile = await fetchUserProfile()
    // if (profile) {
    //     return profile
    // }
    return undefined
}

export default function LoginDoctor() {
    const Toast = useToast()
    const navigation = useNavigation();
    const { updateProfile } = useAuthStore((state) => ({ updateProfile: state.updateProfile }))

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormEmailInputs>({
        resolver: yupResolver(formEmailSchema),
    });

    const [visibility, setVisibility] = React.useState("eye-off-outline");


    const onLogin = (data: FormEmailInputs) => {
        console.log("Logging in ... ")
        login(data)
    }

    const { isLoading, mutate: login } = useMutation(loginWithEmailAndPassword, {
        onError: (error, variables, context) => {
            // An error happened!
            console.log(`rolling back optimistic update with id `, error)
            Toast.show({
                title: `${error}`,
            })
        },
        onSuccess: (data: Consultant | undefined, variables, context) => {
            console.log("Logged in successfully ", data)
            // if (data) {
            //     console.log("Demo doctor ")
            //     updateProfile({ ...data, type: "doctor" } as Consultant)
            // }
        },

    })
    // console.log("Confirm  : ",confirm)
    return (
        <AltContainer title="Afya Bora" backdropHeight={height / 5.5}>
            <View flexGrow={1} marginTop={10}>

                <Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} marginX={5}>
                    <VStack space={5} marginBottom={15}>
                        <ControllerFormInput
                            name="email"
                            control={control}
                            label="Email address"
                            keyboardType="email-address"
                        />
                        <ControllerFormInput
                            name="password"
                            control={control}
                            label="Enter Password"
                            keyboardType="password"
                            type={
                                visibility === "eye-outline"
                                    ? "text"
                                    : "password"
                            }
                            InputRightElement={
                                <Pressable
                                    onPress={() =>
                                        visibility ===
                                            "eye-outline"
                                            ? setVisibility(
                                                "eye-off-outline"
                                            )
                                            : setVisibility(
                                                "eye-outline"
                                            )
                                    }
                                >
                                    <MaterialCommunityIcons
                                        name={visibility}
                                        size={24}
                                        color={
                                            colors.primary
                                        }
                                        style={{
                                            paddingEnd: 10,
                                        }}
                                    />
                                </Pressable>
                            }
                        />
                    </VStack>
                    <Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>

                        <Button
                            onPress={handleSubmit(onLogin)}
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            borderRadius={20}
                            style={{ backgroundColor: colors.primary }}
                            _text={{ color: "white" }}
                            shadow={5}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>

            </View>

            <Stack alignItems="center" marginBottom={5}>
                <HStack>
                    <Text> Are you a patient ? </Text>
                    <Pressable
                        focusable

                        // TODO: detect platform and show cursor="Pointer" only in web
                        // using Platform api in RN
                        // cursor="pointer"
                        onPress={() => {
                            navigation.navigate(_MainAppNavKey.LoginScreen);
                        }}
                    >
                        <Text bold color={colors.primary}>
                            Sign in
                        </Text>
                    </Pressable>
                </HStack>
            </Stack>
        </AltContainer>
    );
};