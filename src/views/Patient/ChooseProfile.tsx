import React from 'react'
import { Box, Center, Heading, HStack, Spinner, Text, VStack } from 'native-base'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { Pressable } from 'react-native';
import _ from 'lodash';
import { StackActions, useNavigation, CommonActions } from '@react-navigation/native';
import { HomeNavKey } from '.';
import { atom, useAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAppointmentInProgressAtom } from './PatientComplaint';
import { useDispatch, useSelector } from 'react-redux';
import appointment from '../../store/slices/appointment';
import { RootState } from '../../store';
import { useAuth } from '../../contexts/AuthContext';
import { Profile } from '../../store/slices/profile';

export const checkPatientProfiles = async (): Promise<Profile[]> => {
    const uid = await auth().currentUser?.uid;
    const res = await firestore().collection("patients").where("uid", "==", uid).get()
    return res.docs.map((doc) => ({ ...doc.data(), type: "patient", id: doc.id } as Profile))
};




const ChooseProfile = () => {
    const email = auth().currentUser?.email
    const phone = auth().currentUser?.phoneNumber


    const { profile, setProfile } = useAuth();

    const currentProfile = useSelector(
        ({ profile }: RootState) => profile
    );

    const navigation = useNavigation()

    const {
        status,
        data: profiles,
        error,
        isLoading,
    } = useQuery<Profile[]>(["chooseProfile", email, phone], () => {
        return checkPatientProfiles()
    });



    const updateProfileDetails = (profile: Profile) => {
        console.log("Setting profile to ", profile)
        if (phone) {
            // update patient active profile
            setProfile({
                ...profile,
                type: "patient"
            })

            // navigation.navigate(HomeNavKey.HomeScreen)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: HomeNavKey.HomeScreen }]
                }));

        }
        if (email) {
            // update doctor active profile
        }
    }
    if (error) {
        return (
            <Center flex={1}>
                <Text>Something went wrong {JSON.stringify(error)}</Text>
            </Center>
        )
    }
    if (isLoading) {
        return (
            <Center flex={1}>
                <Spinner size="lg" />
            </Center>
        )
    }

    if (_.isEmpty(profiles)) {
        console.log("What cant navigate ")
    }

    const handleCreateNewProfile = () => {
        console.log("Create Profile Page")
        // update profile and go home

        navigation.navigate(HomeNavKey.CreateProfile)
    }

    console.log("currentProfile : ")
    console.log(JSON.stringify(currentProfile, null, 3))

    return (
        <VStack p={12} flex={1}>
            <VStack space={4}>
                <Heading>Seems like you’ve been here!</Heading>
                <Text>It appears that’ve you had registered once before. Please choose a profile to proceed with:</Text>
                <HStack flexWrap="wrap">
                    {profiles?.map(profile => {
                        return (
                            <Pressable onPress={() => updateProfileDetails(profile)}>
                                <VStack h={48} w={48} p={4} shadow={4} rounded="md">
                                    <Heading>
                                        {profile.id}
                                    </Heading>
                                </VStack>
                            </Pressable>
                        )
                    })}


                </HStack>
                <Pressable onPress={() => {
                    console.log("Create Profile")
                    handleCreateNewProfile()
                }}>
                    <VStack h={48} width="100%" borderRadius={4} p={4} backgroundColor="#F0F0F0" shadow={4} rounded="md">
                        <Center flex={1}>
                            <Text>Create Profile + </Text>
                        </Center>
                    </VStack>

                </Pressable>
            </VStack>
        </VStack>
    )
}

export default ChooseProfile
