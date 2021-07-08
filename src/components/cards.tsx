import * as React from "react";
import {
    AspectRatio,
    Center,
    HStack,
    VStack,
    Image,
    Text,
    Heading,
    Divider,
    Circle as NativeBaseCircle,
    Box,
    Stack,
    Avatar,
    ZStack,
    Button,
} from "native-base";
import { View } from "react-native";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../contants/colors";
import { PrimaryButton } from "./button";
import { Dots } from "./dotttedLines";

import GenderIcon from "../assets/icons/Gender";
import PriceTagIcon from "../assets/icons/PriceTag";
import MessageIcon from "../assets/icons/Message"
import CakeIcon from "../assets/icons/Cake";
import ReportIcon from "../assets/icons/Report"

import BackgroundOne from "../assets/illustrations/BackgroundOne";
import { color } from "styled-system";

const NewPaperLogo = (props: SvgProps) => {
    return (
        <Svg width={50} height={49} viewBox="0 0 50 49" fill="none" {...props}>
            <Circle cx={10} cy={41} r={10} fill="#E7E5FF" />
            <Circle cx={57} cy={27} r={2} fill="#E7E5FF" />
            <Circle cx={12} cy={10} r={2} fill="#E7E5FF" />
            <Circle cx={47} cy={6} r={6} fill="#E7E5FF" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45.284 21.656h.934A4.787 4.787 0 0151 26.437v14.781A4.787 4.787 0 0146.218 46h-26.64a.586.586 0 110-1.172h26.64c1.99 0 3.61-1.62 3.61-3.61v-14.78c0-1.99-1.62-3.61-3.61-3.61H25.04a1.958 1.958 0 01-1.788-1.161l-.458-1.03a2.16 2.16 0 00-1.972-1.28H14.33a2.16 2.16 0 00-2.158 2.158v19.703c0 1.99 1.62 3.61 3.61 3.61h.978a.586.586 0 010 1.172h-.978A4.787 4.787 0 0111 41.218V21.515a3.334 3.334 0 013.33-3.33h2.386V9.619A3.623 3.623 0 0120.336 6h21.329a3.623 3.623 0 013.62 3.62v3.499a.586.586 0 01-1.173 0v-3.5a2.45 2.45 0 00-2.447-2.447h-21.33a2.45 2.45 0 00-2.447 2.447v8.566h2.934c1.314 0 2.508.775 3.042 1.975l.459 1.03a.785.785 0 00.717.466h19.072v-5.73a.586.586 0 111.172 0v5.73zm-11.565 8.17h6.049a.586.586 0 110 1.173h-6.049a.586.586 0 010-1.172zm5.642 4.588a.586.586 0 110-1.172h6.08a.586.586 0 010 1.172h-6.08zm6.08-3.415a.586.586 0 000-1.172h-2.875a.586.586 0 100 1.172h2.874zm-24.388 7.34c0 .839.683 1.522 1.523 1.522h1.757c.84 0 1.523-.683 1.523-1.523V36.23h2.109c.84 0 1.523-.684 1.523-1.523v-1.758c0-.84-.684-1.523-1.523-1.523h-2.109v-2.108c0-.84-.683-1.523-1.523-1.523h-1.757c-.84 0-1.523.683-1.523 1.523v2.108h-2.109c-.84 0-1.523.683-1.523 1.523v1.758c0 .84.684 1.523 1.523 1.523h2.109v2.108zm-2.46-3.632c0 .193.158.35.351.35h2.695c.323 0 .586.263.586.587v2.694c0 .194.157.351.35.351h1.758a.351.351 0 00.351-.35v-2.695c0-.324.263-.586.586-.586h2.695a.351.351 0 00.35-.351v-1.758a.351.351 0 00-.35-.35H25.27a.586.586 0 01-.586-.587v-2.694a.351.351 0 00-.35-.351h-1.758a.351.351 0 00-.351.35v2.695a.586.586 0 01-.586.586h-2.695a.351.351 0 00-.35.351v1.758zm7.868-22.864v-.938a.586.586 0 00-1.171 0v.938a.586.586 0 001.171 0zm6.332.379a2.378 2.378 0 01-3.586 0 .586.586 0 01.884-.77 1.206 1.206 0 001.818 0 .586.586 0 11.884.77zm4.013-.405a.586.586 0 101.172 0c0-.922-.75-1.673-1.672-1.673-.922 0-1.673.75-1.673 1.673a.586.586 0 101.172 0 .501.501 0 011.001 0zm-1.22 7.54h-9.172a.586.586 0 010-1.172h9.172a.586.586 0 110 1.172zM33.72 34.413h2.844a.586.586 0 100-1.172H33.72a.586.586 0 000 1.172zm7.094 3.415h-7.094a.586.586 0 010-1.172h7.094a.586.586 0 010 1.172z"
                fill={colors.primary}
            />
        </Svg>
    );
};

const Card1 = () => {
    return (
        <Box bg="white" shadow={2} rounded="lg" w={150} p={4}>
            <VStack justifyContent="center" alignItems="center">
                <NewPaperLogo />
                <Center _text={{ textAlign: "center" }}>
                    General Check-up
                </Center>
            </VStack>
        </Box>
    );
};

type ToBeRenamedProps = {};
const ToBeRenamed: React.FC<ToBeRenamedProps> = ({ children }) => {
    return (
        <Stack>
            <Box borderRadius={4} borderWidth={1} my={3}>
                <HStack alignItems="center" mt={-4}>
                    {children}
                </HStack>
            </Box>
        </Stack>
    );
};

type ServiceCardProps = {
    service: {
        name: string;
        description: string;
        gender: string
        age: string,
        tests: number,
        checkups: number,
        price: number
    };
};
export const ServiceCard: React.FC<ServiceCardProps> = ({
    service: { name, description,
        gender,
        age,
        tests,
        checkups,
        price },
}) => {
    return (
        <Box bg="white" shadow={2} rounded="lg">
            <VStack space={4} p={4} borderRadius={8} backgroundColor="white">
                <HStack>
                    <Image
                        size={100}
                        alt="fallback text"
                        borderRadius={6}
                        source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                        }}
                        fallbackSource={{
                            uri: "https://www.w3schools.com/css/img_lights.jpg",
                        }}
                    />
                    {/* height to be fixed to auto */}
                    <VStack style={{}} paddingX={4} flex={1}>
                        <Heading fontSize="md">{name} </Heading>
                        <Text fontSize="md" style={{ color: "#262C3D" }}>
                            {description}
                        </Text>
                    </VStack>
                </HStack>
                <HStack space={2} flexWrap="wrap">
                    <ToBeRenamed>
                        <Box borderRadius={5} backgroundColor="#E7E5FF">
                            <GenderIcon color="#7065E4" size={16} />
                        </Box>

                        <Box px={2}>
                            <Text color="#747F9E">{gender}</Text>
                        </Box>
                    </ToBeRenamed>

                    <ToBeRenamed>
                        <Box borderRadius={5} backgroundColor="#FFE2DE">
                            <CakeIcon color="#FF6F5B" size={16} />
                        </Box>

                        <Box px={2}>
                            <Text color="#747F9E">{tests} Test</Text>
                        </Box>
                    </ToBeRenamed>

                    <ToBeRenamed>
                        <Box borderRadius={5} backgroundColor="#D4FAFF">
                            <MessageIcon color="#2AD3E7" size={16} />
                        </Box>

                        <Box px={2}>
                            <Text color="#747F9E">{age}</Text>
                        </Box>
                    </ToBeRenamed>

                    <ToBeRenamed>
                        <Box borderRadius={5} backgroundColor="#E7E5FF">
                            <ReportIcon color="#7065E4" size={16} />
                        </Box>

                        <Box px={2}>
                            <Text color="#747F9E">{checkups} Categories check-up</Text>
                        </Box>
                    </ToBeRenamed>

                </HStack>
                <Stack overflow="hidden" mx={-4}>
                    <HStack
                        justifyContent="space-between"
                        overflow="hidden"
                        alignItems="center"
                        mx={-4}
                    >
                        <NativeBaseCircle
                            size={10}
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                                flex: 1,
                            }}
                        />
                        <Stack style={{ flex: 8 }}>{/* <Dots /> */}</Stack>

                        <NativeBaseCircle
                            size={10}
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                                flex: 1,
                            }}
                        />
                    </HStack>
                </Stack>

                <HStack justifyContent="space-between" alignItems="center">
                    <HStack space={2} alignItems="center">
                        <PriceTagIcon color="#7065E4" size={6} />
                        <Heading fontSize="md">Price : </Heading>
                    </HStack>
                    <Heading fontSize="md" color={colors.primary}>
                        {price}
                    </Heading>
                </HStack>
                <Box mb={-10}>
                    <Button
                        testID="button1"
                        height={50}
                        borderRadius={20}
                        _disabled={{
                            backgroundColor: "#B0B3C7",
                            color: "white",
                        }}
                        style={{ backgroundColor: colors.primary }}
                        _text={{ color: "white" }}
                    >
                        Book now
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

type Card3Props = {
    selected: boolean;
};
const Card3: React.FC<Card3Props> = ({ selected = "false" }) => {
    return (
        <Box bg="white" shadow={2} rounded="lg" maxWidth="90%">
            <VStack p={4}>
                <HStack>
                    <Image
                        size={100}
                        alt="fallback text"
                        borderRadius={6}
                        source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                        }}
                        fallbackSource={{
                            uri: "https://www.w3schools.com/css/img_lights.jpg",
                        }}
                    />
                    <VStack
                        space={4}
                        pl={4}
                        flex={1}
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Heading fontSize="md">Dr. Chikanso Chima</Heading>
                            <Text fontSize="md" style={{ color: "#262C3D" }}>
                                Angiolory
                            </Text>
                        </VStack>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <HStack>
                                <MaterialIcons
                                    name="star-rate"
                                    size={24}
                                    color="#FFC107"
                                />
                                <Text color="#747F9E">4.5 (834)</Text>
                            </HStack>
                            <HStack
                                space={4}
                                px={6}
                                py={2}
                                borderRadius={4}
                                justifyContent="center"
                                alignItems="center"
                                style={{ backgroundColor: "#D4FAFF" }}
                            >
                                <MaterialIcons
                                    name="my-location"
                                    size={24}
                                    color="#2AD3E7"
                                />
                                <Text color="#2AD3E7">2 Km</Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

const Card4 = () => {
    return (
        <Box bg="white" shadow={2} rounded="lg" maxWidth="90%">
            <VStack
                p={4}
                borderRadius={12}
                style={{ backgroundColor: "white" }}
            >
                <HStack>
                    <Image
                        size={100}
                        alt="fallback text"
                        borderRadius={6}
                        source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                        }}
                        fallbackSource={{
                            uri: "https://www.w3schools.com/css/img_lights.jpg",
                        }}
                    />
                    {/* height to be fixed to auto */}
                    <VStack style={{}} pl={4} flex={1}>
                        <HStack justifyContent="space-between">
                            <Heading fontSize="md">Dr. Chikanso Chima </Heading>
                            <HStack
                                space={2}
                                px={6}
                                py={2}
                                borderRadius={4}
                                justifyContent="center"
                                alignItems="center"
                                style={{ backgroundColor: "#D4FAFF" }}
                            >
                                <MaterialCommunityIcons
                                    name="clock-time-seven-outline"
                                    size={24}
                                    color="#2AD3E7"
                                />
                                <Text color="#2AD3E7">12:35</Text>
                            </HStack>
                        </HStack>

                        <Text fontSize="md" style={{ color: "#262C3D" }}>
                            Blood formula: Detecting anemia, blood disorders,.
                        </Text>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

type ToBeRenamed2Props = {
    label: string;
    description: string;
    icon: React.ReactNode;
    iconBackground: string;
};
const ToBeRenamed2: React.FC<ToBeRenamed2Props> = ({
    label,
    icon,
    iconBackground,
    description,
}) => {
    return (
        <Box bg="white" shadow={2} rounded="lg" maxWidth="50%">
            <VStack
                alignItems="baseline"
                borderRadius={10}
                p={4}
                space={4}
                style={{ backgroundColor: "white" }}
            >
                <VStack mt={-6}>
                    <Center
                        borderRadius={10}
                        size={100}
                        p={4}
                        mt={-8}
                        style={{ backgroundColor: iconBackground }}
                    >
                        {icon}
                    </Center>
                    <Stack>
                        <Heading fontSize="lg" style={{ color: "#747F9E" }}>
                            {label}
                        </Heading>
                        <Text fontSize="md" style={{ color: "#747F9E" }}>
                            {description}
                        </Text>
                    </Stack>
                </VStack>
            </VStack>
        </Box>
    );
};

const Card5: React.FC = ({ }) => {
    return (
        <Box bg="white" shadow={2} rounded="lg" maxWidth="90%">
            <VStack
                p={4}
                borderRadius={12}
                style={{ backgroundColor: "white" }}
            >
                <HStack>
                    <Image
                        size={100}
                        alt="fallback text"
                        borderRadius={6}
                        source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                        }}
                        fallbackSource={{
                            uri: "https://www.w3schools.com/css/img_lights.jpg",
                        }}
                    />
                    <VStack
                        space={4}
                        pl={4}
                        flex={1}
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Heading fontSize="md">
                                COVID-19 affects each
                            </Heading>
                            <Text fontSize="md" style={{ color: "#262C3D" }}>
                                The most common symptoms...
                            </Text>
                        </VStack>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <HStack>
                                <MaterialIcons
                                    name="star-rate"
                                    size={24}
                                    color={colors.primary}
                                />
                                <Text color="#747F9E">2020/09/08</Text>
                            </HStack>
                            <HStack
                                space={4}
                                px={6}
                                py={2}
                                borderRadius={4}
                                justifyContent="center"
                                alignItems="center"
                                style={{ backgroundColor: "#D4FAFF" }}
                            >
                                <MaterialIcons
                                    name="my-location"
                                    size={24}
                                    color="#2AD3E7"
                                />
                                <Text color="#2AD3E7">News</Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

const Card6 = () => {
    return (
        <Box bg="white" shadow={2} rounded="lg" maxWidth="90%">
            <VStack
                p={4}
                borderRadius={12}
                style={{ backgroundColor: "white" }}
            >
                <HStack>
                    <Avatar
                        size={100}
                        borderRadius={6}
                        source={{
                            uri: "https://alpha.nativebase.io/img/native-base-icon.png",
                        }}
                    >
                        <Avatar.Badge
                            style={{ backgroundColor: "#24D626" }}
                            borderWidth={2}
                            borderColor="white"
                            w={5}
                            h={5}
                            top={-5}
                            right={-5}
                        />
                    </Avatar>
                    {/* height to be fixed to auto */}
                    <VStack
                        style={{}}
                        pl={4}
                        flex={1}
                        justifyContent="space-between"
                    >
                        <VStack justifyContent="space-between">
                            <Heading fontSize="md">Dr. Chikanso Chima </Heading>
                            <Text fontSize="md" style={{ color: "#747F9E" }}>
                                The consultation has not yet started!
                            </Text>
                        </VStack>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <HStack>
                                <MaterialIcons
                                    name="star-rate"
                                    size={24}
                                    color={colors.primary}
                                />
                                <Text color="#747F9E">09:30 Am</Text>
                            </HStack>
                            <HStack
                                space={4}
                                px={6}
                                py={2}
                                borderRadius={4}
                                justifyContent="center"
                                alignItems="center"
                                style={{ backgroundColor: "#FFE2DE" }}
                            >
                                <MaterialIcons
                                    name="my-location"
                                    size={24}
                                    color="#FF6F5B"
                                />
                                <Text color="#FF6F5B">Finished</Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

const CardBackground = (props: SvgProps) => {
    return (
        <Svg
            width={327}
            height={208}
            viewBox="0 0 327 208"
            fill="none"
            {...props}
        >
            <Path
                d="M312.42.024H14.225C6.382.024.025 6.39.025 14.243v179.169c0 7.852 6.357 14.218 14.2 14.218H312.42c7.842 0 14.199-6.366 14.199-14.218V14.242c0-7.852-6.357-14.218-14.199-14.218z"
                fill="#FF6F5B"
            />
            <Path
                d="M-24.967 70.2l233.829.145c25.158.015 41.71 24.842 32.306 48.458l-87.4 219.488c-11.038 27.716-48.401 32.781-64.432 8.734L-57.09 127.396C-73.121 103.35-54.493 70.184-24.967 70.2z"
                fill="#FFC107"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M-79.17-4.846l234.013.147c25.178.014 41.744 24.853 32.332 48.48L99.709 263.37c-11.047 27.729-48.438 32.796-64.484 8.734L-111.318 52.372c-16.043-24.054 2.598-57.236 32.149-57.218z"
                fill="#7065E4"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.741 274.194l-97.84-146.716c-16.03-24.037 2.596-57.191 32.12-57.174l205.609.128-76.884 192.973a38.111 38.111 0 01-14.005 17.529 38.03 38.03 0 01-21.43 6.595c-10.349.001-20.588-4.302-27.57-13.335z"
                fill="#7065E4"
            />
        </Svg>
    );
};

const Card7 = () => {
    return (
        <Box shadow={2} rounded="lg" maxWidth={328} maxHeight={210}>
            <VStack position="relative">
                <ZStack
                    borderRadius={10}
                    overflow="hidden"
                    w={328}
                    height={210}
                >
                    <CardBackground />
                    <VStack p={4} space={4} w="100%">
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Heading fontSize="lg">Name</Heading>
                            <Text>Card Logo Icon</Text>
                        </HStack>
                        <VStack>
                            <Text>Amazon Platinium</Text>
                        </VStack>
                        <VStack>
                            <Text>Card Input</Text>
                        </VStack>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Heading fontSize="lg">$3.469.52</Heading>
                            <HStack>
                                <NativeBaseCircle
                                    size={10}
                                    zIndex={2}
                                    backgroundColor="#FFFFFF"
                                />
                                <NativeBaseCircle
                                    size={10}
                                    zIndex={1}
                                    ml={-5}
                                    backgroundColor="rgba(255,255,255,0.3)"
                                />
                            </HStack>
                        </HStack>
                    </VStack>
                </ZStack>
            </VStack>
        </Box>
    );
};

type specialistProps = { name: string; gender: "male" | "female" };

export const TopRatedSpecialists: React.FC<specialistProps> = ({
    name,
    gender,
}) => {
    return (
        <VStack m={2} w={176}>
            <ZStack p={5}>
                <BackgroundOne
                    size={220}
                    bgColor={gender === "male" ? "#258FBE" : colors.primary}
                />
                <VStack padding={4}>
                    <Heading fontSize="md" color="#FFFFFF">
                        {name}
                    </Heading>
                </VStack>
            </ZStack>
        </VStack>
    );
};

export default () => {
    return (
        <VStack space={12} paddingY={12}>
            <Card1 />
            {/* <ServiceCard /> */}
            <Card3 selected />
            <Card3 selected={false} />
            <Card4 />
            <Card5 />
            <Card6 />
            <Card7 />

            <ToBeRenamed2
                label="General Check-up"
                description="General Check-up"
                iconBackground="#E7E5FF"
                icon={
                    <MaterialCommunityIcons
                        name="clock-time-seven-outline"
                        size={40}
                        color={colors.primary}
                    />
                }
            />
        </VStack>
    );
};
