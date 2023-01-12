import React from 'react'
import { useNavigation } from "@react-navigation/core";
import {
    ArrowBackIcon,
    HStack,
    Pressable,
    VStack,
    Icon,
    Stack,
    Button,
    Box,
    View,
    Heading,
    Modal,
} from "native-base";
import { useQuery } from "react-query";
import AccountIcon from "../../assets/icons/AccountIcon";
import GenderIcon from "../../assets/icons/GenderIcon";
import PenEditIcon from "../../assets/icons/PenEditIcon";
import WhatsAppLogo from "../../assets/icons/WhatsAppLogo";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { StatusAppointmentAlert } from "../../components/core/appointment";
import { Alert, ToastAndroid } from "react-native";
import { useRoute } from "@react-navigation/native";
import { colors } from '../../constants/colors';
import { DoctorRoutes } from '../Patient';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Text } from '../../components/text';
import moment from 'moment';

type DateString = string

type PatientInfoProps = {
    name: string;
    phoneNumber: string;
    gender: "male" | "female" | "unknown";
    dob: FirebaseFirestoreTypes.Timestamp | DateString;
    weight: string,
    height: string,
    bloodGroup: string
};

const PatientInfo: React.FC<PatientInfoProps> = ({
    name,
    phoneNumber,
    gender = "unknown",
    dob,
    weight,
    height,
    bloodGroup
}) => {
    return (
        <Stack shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
            <VStack space={5}>
                <Heading fontSize="xl">Patient Information</Heading>
                <HStack space={4}>
                    <AccountIcon size={5} />
                    <Text>{name}</Text>
                </HStack>

                <HStack space={4}>
                    <WhatsAppLogo size={5} color={colors.primary} />
                    <Text>{phoneNumber}</Text>
                </HStack>

                <HStack space={4}>
                    <GenderIcon size={5} color={colors.primary} />
                    <VStack>
                        <Text>Sex: {gender}</Text>
                        <Text>Date Of Birth: {typeof dob === "string" ? moment(new Date(dob)).format("ddd, DD MMM YYYY") : moment(dob?.toDate()).format("ddd, DD MMM YYYY")}</Text>
                        <Text>Weight: {weight} kg</Text>
                        <Text>Height: {height} cm</Text>
                        <Text>Bloog Group: {bloodGroup}</Text>
                    </VStack>
                </HStack>
            </VStack>
        </Stack>
    );
};

const CancelAppointment = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: (state: boolean) => void }) => {
    return (
        <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Cancellation of appointment</Modal.Header>
                <Modal.Body >
                    <Text textAlign="center">
                        Are you sure you want to cancel this appointment?
                    </Text>


                    <HStack mt={6} justifyContent="space-between">
                        <Button
                            h={44}
                            w={144}
                            borderRadius={24}
                            variant="outline"
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >No</Button>
                        <Button
                            h={44}
                            w={144}
                            borderRadius={24}
                            onPress={() => {
                                console.log("Cancelling the appointment here ... ")
                            }}
                        >
                            Yes
                        </Button>
                    </HStack>
                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}



export default function AppointmentInfo() {
    const navigation = useNavigation();


    const route = useRoute<any>();

    const { appointment } = route?.params
    const { cid, pid } = appointment

    const [modalVisible, setModalVisible] = React.useState(false)

    const handleCancelAppointment = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <MainContainer
            title="Appointment Info"
            leftSection={
                // Go back if can go back
                navigation.canGoBack()
                    ? () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <IconContainer>
                                <ArrowBackIcon size={6} color="#561BB3" />
                            </IconContainer>
                        </Pressable>
                    )
                    : undefined
            }
        >
            <CancelAppointment modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <VStack flex={1} width="100%" paddingX={5} space={5} marginTop={5} marginBottom={10}>
                {/* NOTE: This is supposed to render.... regardless */}
                {/* <DateTimeCardRender /> */}
                <View width="100%">
                    <StatusAppointmentAlert
                        hours={appointment?.time || ""}
                        time={appointment?.utcDate || ""}
                        type={appointment?.type || "offline"}
                        status={appointment?.status}

                    />
                </View>

                <HStack justifyContent="space-between" shadow={2} borderRadius={8} backgroundColor={"#FFFFFF"} px={3} py={4}>
                    <Pressable onPress={() => {
                        ToastAndroid.show("Under development", ToastAndroid.SHORT)
                    }}>
                        <HStack space={2}
                            style={{ backgroundColor: "#FFFFFF", }}
                            borderWidth={1}
                            borderColor={colors.primary}
                            px={12} py={3}
                            alignItems="center"
                            color={colors.primary}
                            borderRadius="md"
                        >
                            <PenEditIcon size={4} color={colors.primary} />
                            <Text tx="appointmentInfo.editAppointment" fontSize="sm" color={colors.primary}>
                                Edit Appointment
                            </Text>
                        </HStack>

                    </Pressable>

                    <Pressable onPress={() => {
                        ToastAndroid.show("Under development", ToastAndroid.SHORT)
                    }}>

                        <HStack space={2}
                            style={{ backgroundColor: "#FFFFFF", }}
                            borderWidth={1}
                            borderColor={"#FF5A5B"}
                            px={12} py={3}
                            alignItems="center"
                            color={colors.primary}
                            borderRadius="md"

                        >
                            <Text tx="appointmentInfo.cancelAppointment" fontSize="sm" color={"#FF5A5B"}>
                                Cancel Appointment
                            </Text>
                        </HStack>


                    </Pressable>
                </HStack>

                {
                    appointment?.type === "online"
                    &&
                    <Button
                        borderRadius={4}
                        style={{ backgroundColor: colors.primary }}
                        _text={{ color: "white" }}
                        shadow={5}
                        onPress={() => {
                            navigation.navigate(DoctorRoutes.DoctorRemoteConsultation, {
                                roomId: appointment?.roomId
                            })

                        }}
                    >
                        Join Consultation
                    </Button>
                }


                <PatientInfo
                    name={appointment?.patient?.name || ""}
                    phoneNumber={appointment?.patient?.phoneNumber || ""}
                    gender={appointment?.patient?.gender || "unknown"}
                    dob={appointment?.patient?.dob || ""}
                    weight={appointment?.patient?.weight || ""}
                    height={appointment?.patient?.height || ""}
                    bloodGroup={appointment?.patient?.bloodGroup || ""}
                />

                {/* NOTE: Abstracting away makes difficult to deal with */}
                <VStack space={5} shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>

                    <Text bold fontSize="xl">Other Notes</Text>
                    <Text fontSize={13}>
                        {appointment?.aboutVisit?.complaint}
                    </Text>
                </VStack>
            </VStack>
        </MainContainer>
    );
};