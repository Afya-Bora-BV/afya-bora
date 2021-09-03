import React from 'react'
import { useNavigation } from "@react-navigation/core";
import {
    ArrowBackIcon,
    HStack,
    Pressable,
    VStack,
    Text,
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

type PatientInfoProps = {
    name: string;
    phoneNumber: string;
    gender: "male" | "female" | "unknown";
    dob: string;
};

const PatientInfo: React.FC<PatientInfoProps> = ({
    name,
    phoneNumber,
    gender = "unknown",
    dob = "",
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
                    <WhatsAppLogo size={5} />
                    <Text>{phoneNumber}</Text>
                </HStack>

                <HStack space={4}>
                    <GenderIcon size={5} />
                    <VStack>
                        <Text>Sex: {gender}</Text>
                        <Text>DOB: {dob}</Text>
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
                    <StatusAppointmentAlert time={appointment?.date} />
                </View>

                <HStack justifyContent="space-between">
                    <Pressable onPress={() => {
                        ToastAndroid.show("Under development", ToastAndroid.SHORT)
                    }}>
                        <HStack space={2}>
                            <PenEditIcon size={4} />
                            <Text fontSize="sm">Edit Appointment</Text>
                        </HStack>
                    </Pressable>

                    <Pressable onPress={() => {
                        ToastAndroid.show("Under development", ToastAndroid.SHORT)
                    }}>
                        <Text style={{ color: "red" }} fontSize="sm">
                            Cancel Appointment
                        </Text>
                    </Pressable>
                </HStack>

                <Button
                    bgColor={colors.primary}
                    borderRadius={20}
                    onPress={() => {
                        navigation.navigate(DoctorRoutes.DoctorRemoteConsultation, {
                            roomId: appointment?.roomId
                        })

                    }}
                >
                    Join Consultation
                </Button>

                <PatientInfo
                    name={appointment?.patient.name || ""}
                    phoneNumber={appointment?.patient.phoneNumber || ""}
                    gender={appointment?.patient.gender || "unknown"}
                    dob={appointment?.patient.dob || ""}
                />

                {/* NOTE: Abstracting away makes difficult to deal with */}
                <VStack space={5} shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
                    <Text bold fontSize="xl">Symptoms</Text>
                    <HStack space={4}>

                        {appointment?.aboutVisit.symptoms.map((symptom: any) => (
                            <Box
                                rounded="xl"
                                bg={"#B0B3C7"}
                                flex={1}
                                alignItems="center"
                                paddingY={2}
                            >
                                <Text color={"white"}>{symptom}</Text>
                            </Box>
                        ))}


                    </HStack>

                    <Text bold fontSize="lg">Other Notes</Text>
                    <Text fontSize={13}>
                        {appointment?.aboutVisit.complaint}
                    </Text>
                </VStack>
            </VStack>
        </MainContainer>
    );
};