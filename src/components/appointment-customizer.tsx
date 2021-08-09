import React from 'react'
import { atom, useAtom } from 'jotai'
import { TouchableOpacity } from 'react-native';
import { CheckIcon, HStack, Select, Spacer, Stack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from './button';
import { colors } from '../constants/colors';
// these attoms to be moved since the state might be needed somewhere

const specialities: { name: string }[] = [
    "Specialities",
    "Dentist",
    "Dermatologist",
].map((speciality) => ({ name: speciality }));

const regions: { name: string }[] = [
    "Residency Location",
    "Arusha",
    "Dar es Salaam",
    "Dodoma",
    "Geita",
    "Iringa",
    "Kagera",
    "Katavi",
    "Kigoma",
    "Kilimanjaro",
    "Lindi",
    "Manyara",
    "Mara",
    "Mbeya",
    "Morogoro",
    "Mtwara",
    "Mwanza",
    "Njombe",
    "Pemba North",
    "Pemba South",
    "Pwani",
    "Rukwa",
    "Ruvuma",
    "Shinyanga",
    "Simiyu",
    "Singida",
    "Tabora",
    "Tanga",
    "Zanzibar North",
    "Zanzibar South and Central",
    "Zanzibar West",
].map((region) => ({ name: region }));


const appointmentTypeAtom = atom<"offline" | "online" | "">("");
const locationAtom = atom<string>("");
const specialityAtom = atom<string>("");
const scheduleAtom = atom<string>("");

const setAppointmentTypeAtom = atom(
    (get) => {
        return get(appointmentTypeAtom);
    },
    (get, set, update: "offline" | "online") => {
        // you can do more logic here for the state
        set(appointmentTypeAtom, update);
    }
);

const setLocationAtom = atom(
    (get) => {
        return get(locationAtom);
    },
    (get, set, update: string) => {
        set(locationAtom, update);
    }
);

const setSpecialityAtom = atom(
    (get) => {
        return get(specialityAtom);
    },
    (get, set, update: string) => {
        set(specialityAtom, update);
    }
);

export const completeScheduleAtom = atom(
    (get) => {
        // you can do more logic to check
        return {
            type: get(appointmentTypeAtom),
            location: get(locationAtom),
            speciality: get(specialityAtom),
        };
    },
    (get, set) => { }
);
type AppointmentType = { title: string; value: "online" | "offline" };
const appointmentTypes: AppointmentType[] = [
    {
        title: "At Facility",
        value: "offline",
    },
    {
        title: "Online (Virtual)",
        value: "online",
    },
];

const AppointmentTypeButton: React.FC<AppointmentType> = ({ title, value }) => {
    const [type, setType] = useAtom(setAppointmentTypeAtom);
    return (
        <TouchableOpacity
            onPress={() => {
                setType(value);
            }}
            style={{
                backgroundColor: type === value ? colors.primary : "white",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderColor: type === value ? colors.primary : "grey",
                borderWidth: 1,
                paddingVertical: 16,
            }}
        >
            <Text
                style={{
                    color: type === value ? "white" : "grey",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const AppointmentLocation = () => {
    const [location, setLocation] = useAtom(setLocationAtom);
    return (
        <Select
            variant="rounded"
            selectedValue={location}
            minWidth={200}
            accessibilityLabel="Location"
            placeholder="Location"
            onValueChange={(itemValue) => {
                setLocation(itemValue);
            }}
            _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
            }}
        >
            {regions.map((region) => (
                <Select.Item label={region.name} value={region.name} />
            ))}
        </Select>
    );
};

const SelectSpeciality = () => {
    const [speciality, setSpeciality] = useAtom(setSpecialityAtom);
    return (
        <Select
            variant="rounded"
            selectedValue={speciality}
            minWidth={200}
            accessibilityLabel="Speciality"
            placeholder="Speciality"
            onValueChange={(itemValue) => setSpeciality(itemValue)}
            _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
            }}
        >
            {specialities.map((speciality) => (
                <Select.Item label={speciality.name} value={speciality.name} />
            ))}
        </Select>
    );
};

const AppointmentCustomizer: React.FC = () => {
    return (
        <Stack>
            <Stack>
                <Text>Choose Type of Appointment</Text>

                <Spacer size={10} />

                <HStack space={2}>
                    {appointmentTypes.map((appointmentType) => (
                        <AppointmentTypeButton
                            title={appointmentType.title}
                            value={appointmentType.value}
                        />
                    ))}
                </HStack>
            </Stack>

            <Stack>
                <Text>Choose Location</Text>
                <Spacer size={10} />
                <AppointmentLocation />
            </Stack>

            <Stack>
                <Text>Choose Speciality</Text>
                <Spacer size={10} />
                <SelectSpeciality />
            </Stack>
        </Stack>
    )
}

export default AppointmentCustomizer