import React from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { persist } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage';

const DemoAppointment = {
    "complaint": "Hdhhd",
    "consultant": {
        "expertise": "General Practitioner",
        "hospital": "Aga Khan Hospital",
        "id": "uindlxAa",
        "name": "Ally Salim",
        "ratedBy": 289,
        "rating": 4,
        "region": "Arusha, Tanzania",
        "time": "1:00",
    },
    "dateTime": {
        "date": "2021 - 07 - 14T10: 04: 57.120Z",
        "timeSlots": [
            "08:00 AM",
            "09:30 AM",
        ],
    },
    "symptoms": [
        "Fever",
        "Skin Rash",
    ],
}

export type DemoAppointmentType = typeof DemoAppointment

interface AppointmentTempoStore {
    appointments: DemoAppointmentType[],
    setAppointment: (appointment: DemoAppointmentType) => Promise<void>
    getAppointments: () => Promise<DemoAppointmentType[]>

}

const { Provider, useStore } = createContext<AppointmentTempoStore>()

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))


const createAppointmentTempoStore = () => create<AppointmentTempoStore>(persist((set, get) => ({
    appointments: [],
    getAppointments: async function () {
        await sleep(3000)
        return get().appointments
    },
    setAppointment: async function (appointment) {
        await sleep(3000)
        set({
            appointments: [...get().appointments, appointment]
        })
    }
}), {
    name: "appointments",
    getStorage: () => AsyncStorage
}))

interface AppointmentTempoStoreProps { children?: React.ReactElement }
function AppointmentTempoStoreProvider({ children }: AppointmentTempoStoreProps) {
    return (
        <Provider createStore={createAppointmentTempoStore}>
            {children}
        </Provider>
    )
}


export {
    useStore as useAppointmentTempoStore,
    AppointmentTempoStoreProvider
}
