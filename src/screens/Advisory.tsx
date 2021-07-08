import React from 'react'
import { Heading, HStack, VStack, Text } from 'native-base'
import IconContainer from '../components/icon-container';
import BackIcon from "../assets/icons/BackIcon";
import { AdvisoryListItem } from "../components/cards"

const consultantsDummy = [
    {
        name: "Ally Salim",
        hospital: "Aga Khan Hospital",
        region: "Arusha, Tanzania",
        expertise: "General Practitioner",
        rating: 4,
        ratedBy: 289,
        time: "1:00"
    },
    {
        name: "Ally Salim",
        hospital: "Aga Khan Hospital",
        region: "Arusha, Tanzania",
        expertise: "General Practitioner",
        rating: 4,
        ratedBy: 289,
        time: "12:00"
    }
]
export default () => {
    return (
        <VStack p={2} space={6} paddingTop={10}>

            {/* TODO: to be moved to components folder */}
            <HStack justifyContent="space-between" alignItems="center">
                <IconContainer>
                    <BackIcon size={22} color="#7065E4" />
                </IconContainer>
                <Heading fontSize="md">Choose a Consultant</Heading>
                <HStack>
                    <Text fontSize="sm">Nearest</Text>
                </HStack>
            </HStack>

            <VStack space={2}>
                {consultantsDummy.map(consultant => (
                    <AdvisoryListItem consultant={consultant} />
                ))}

            </VStack>


        </VStack>
    )
}
