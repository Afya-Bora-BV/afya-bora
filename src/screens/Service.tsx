import React from "react";
import { Heading, HStack, VStack, Text } from "native-base";
import IconContainer from "../components/icon-container";
import BackIcon from "../assets/icons/BackIcon";


import { ServiceCard } from "../components/cards";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderwithBack } from "../components/header";
import { color } from "styled-system";
import { colors } from "../contants/colors";
import { useNavigation } from "@react-navigation/native";

const serviceDemoData = [
    {
        name: "Dr. Chikanso Chima",
        description: "Blood formula: Detectinganemia, blood disorders",
        gender: "Any gender",
        age: "Any age",
        tests: 12,
        checkups: 4,
        price:100,
    },
    {
        name: "Dr. Chikanso Chima",
        description: "Blood formula: Detectinganemia, blood disorders",
        gender: "Any gender",
        age: "Any age",
        tests: 12,
        checkups: 4,
        price:200
        
    },
];
const Service = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={{ padding: 20 }}>
            <VStack p={2} space={6} pb={32}>
                <HStack alignItems="center">
                    <HStack flex={1}>
                        <HeaderwithBack
                            head="Service"
                            nav={() => {
                                navigation.navigate("Home");
                            }}
                            color={"black"}
                        />
                    </HStack>
                </HStack>

                <VStack space={12}>
                    {serviceDemoData.map((service) => (
                        <ServiceCard service={service} />
                    ))}
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default Service;
