/**
 * Interface to render data for UI
 * -------------------------------
 */

/**
 * User object
 */
interface User {
    pid: string
    name: string
    gender: "male" | "female"
    dob: Date,
    height: string,
    weight: string,
    bloodGroup: string,
    residence: string,
    phoneNumber: string,
    type: "patient"
}

type UserProfile =
    | { type: 'patient', profile?: PatientProfile }
    | { type: 'doctor', profile?: ConsultantProfile }

// type UserStatus = 
//     | null      // Setting user status
//     | "new"     // user is new; doesn't have profile
interface PatientAppointment {
    consultant: {
        name: string
    }
    date: Date
    type: ConsultantionType
    symptoms: string[]
    complaint: string
}
