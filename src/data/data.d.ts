// DB

/**
 * User object
 */
interface AuthUser {
    uid: string
    name: string
    email?: string
    phoneNumber?: string
    image?: string
}

type Location = 'Arusha' | 'dar' | 'mwanza' // Geocoordinates

interface ProfileUser {
    id: string
    uid: AuthUser['uid']
    name: string
    gender: 'male' | 'female'
    dob: Date
    height: number
    weight: number
    bloodGroup: 'A' | 'B' | 'AB' | 'O'
    location: Location
}

/**
 * 
 */
interface Consultant {
    id: string
    name: string
    image: string
    specialization: string
    rating: number
}

interface Facility {
    id: string
    image?: string
    location: Location
    consultants: Array<Consultant['id']>
}

interface Appointment {
    id: string
    pid: ProfileUser['id']
    cid: Consultant['id']
    date: Date
    type: 'online' | 'physical-visit'
    aboutVisit: {
        symptomps: string[]
        complaint: string
    }
}
