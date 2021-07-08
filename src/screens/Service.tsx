import React from 'react'
import { Heading, HStack, VStack, Text } from 'native-base'
import IconContainer from '../components/icon-container'
import BackIcon from "../assets/icons/BackIcon"

import GenderIcon from "../assets/icons/Gender"
import CakeIcon from "../assets/icons/Cake"

import { ServiceCard } from "../components/cards"
import { ScrollView } from 'react-native-gesture-handler'

const serviceDemoData = [{
    name: "Dr. Chikanso Chima",
    description: "Blood formula: Detectinganemia, blood disorders",
    specialities: [{
        title: "Any Gender",
        Icon: <GenderIcon color="#7065E4" size={20} />
    },
    {
        title: "Any Gender",
        Icon: <CakeIcon color="#FF6F5B" size={20} />
    }]

},
{
    name: "Dr. Chikanso Chima",
    description: "Blood formula: Detectinganemia, blood disorders",
    specialities: [{
        title: "Any Gender",
        Icon: <GenderIcon color="#7065E4" size={20} />
    },
    {
        title: "Any Gender",
        Icon: <CakeIcon color="#FF6F5B" size={20} />
    }]

}]
export default () => {
    return (
        <ScrollView>
            <VStack p={2} space={6} pb={32}>
                <HStack alignItems="center">
                    <IconContainer>
                        <BackIcon color="#7065E4" />
                    </IconContainer>

                    <HStack flex={1} justifyContent="center">
                        <Heading fontSize="md" >Service</Heading>
                    </HStack>
                </HStack>

                <VStack space={12}>
                    {serviceDemoData.map(service => (
                        <ServiceCard service={service} />
                    ))}

                </VStack>
            </VStack>
        </ScrollView>
    )
}