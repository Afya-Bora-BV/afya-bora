import React from 'react'
import { Box, Center, Heading, HStack, Spinner, Text, VStack } from 'native-base'
import auth from '@react-native-firebase/auth';
import { Consultant, Patient, useAuthStore } from '../../internals/auth/context'
import { API_ROOT } from "../../api";
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { Pressable } from 'react-native';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { HomeNavKey } from '.';
import { atom, useAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAppointmentInProgressAtom } from './PatientComplaint';

export const checkPatientProfiles = async (): Promise<Patient[]> => {
    const uid = await auth().currentUser?.uid;
    console.log("Checking user profile data");
    console.log(`${API_ROOT}/v0/user/${uid}/profile/patients`);
    const profiles = await axios.get(
        `${API_ROOT}/v0/user/${uid}/profile/patients`
    );
    return profiles.data.data;
};

const checkConsultantProfiles = async (): Promise<Consultant[]> => {
    const uid = await auth().currentUser?.uid;
    const profile = await firestore()
        .collection("consultants")
        .where("uid", "==", uid)
        .get();
    const data = profile.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id, uid: uid } as Consultant)
    );
    return data;
};

type Profile = {
    name: string
}
// type Unsubscribe = () => void

// type Storage<Value> = {
//     getItem: (key: string) => Value | Promise<Value>
//     setItem: (key: string, newValue: Value) => void | Promise<void>
//     delayInit?: boolean
//     subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe
// }

// const profileStorage = createJSONStorage(() => AsyncStorage) as Storage<Profile>
// const profileAtom = atomWithStorage<Profile>("profile", {
//     name: ""
// }, profileStorage)


// TODOS
// 1. to update profile info for more data
// 2. to persist the store in async storage

const profileAtom = atom<Profile | null>(null)

export const updateProfileAtom = atom((get) => {
    return get(profileAtom)
}, (get, set, update: Profile) => {
    set(profileAtom, update)
})

export const clearProfileAtom = atom(null, (get, set) => {
    set(profileAtom, null)
})


const ChooseProfile = () => {
    const email = auth().currentUser?.email
    const phone = auth().currentUser?.phoneNumber
    const [, updateProfile] = useAtom(updateProfileAtom)
    const [isAppointmentInProgress, setIsAppointmentInProgress] = useAtom(updateAppointmentInProgressAtom)

    const navigation = useNavigation()

    const {
        status,
        data: profiles,
        error,
        isLoading,
    } = useQuery<Consultant[] | Patient[] | undefined>(["chooseProfile", email, phone], () => {
        if (phone) return checkPatientProfiles()
        if (email) return checkConsultantProfiles()

    });


    console.log("Email : ", email, " Phone : ", phone)

    console.log("User profiles : ", profiles)

    const updateProfileDetails = (profile: { name: string }) => {
        console.log("Setting profile to ", profile)
        if (phone) {
            // update patient active profile
            updateProfile({
                name: profile.name
            })
            if (isAppointmentInProgress) {
                navigation.navigate(HomeNavKey.AppointmentInvoice)
            } else {
                navigation.navigate(HomeNavKey.HomeScreen)
            }

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
