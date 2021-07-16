// User identifying number
type Uid = string
type GenderType = 'male' | 'female'
type LocationOption = 'Arusha' | 'dar' | 'mwanza' // Geocoordinates

/**
 * Store
 * ---------------------
 */
interface ClinicianType {
    id: string
    name: string
}

interface Speciality {
    id: string
    name: string
}
// --------------------

interface PatientProfile {
    id: string
    uid: Uid
    name: string
    gender: GenderType
    dob: Date
    height: number
    weight: number
    bloodGroup: 'A' | 'B' | 'AB' | 'O'
    location: LocationOption
}

interface ConsultantProfile {
    id: string
    uid: Uid
    facilityId: Facility['id']
    name: string
    gender: GenderType
    phoneNumber: string
    email: string
    rating: number
    locationOfResidence: string
    clinicalType: ClinicianType['id']
    areaOfSpeciality: Array<Speciality["id"]>
    calendarSlots?: Array<ConsultantionSlot>
}

type DateString = string
type TimeString = string

type ConsultantionType = 'online' | 'offline'

interface ConsultantionSlot {
    type: ConsultantionType
    date: DateString
    timeSlots: Array<TimeString>
}

interface Appointment {
    id: string
    pid: PatientProfile['id']
    cid: ConsultantProfile['id']
    date: Date
    type: ConsultantionType
    aboutVisit: {
        symptomps: string[]
        complaint: string
    }
}


/**
 * 
 */
interface Facility {
    id: string
    name: string
    location: LocationOption
    users: Array<ConsultantProfile['id']>
}
