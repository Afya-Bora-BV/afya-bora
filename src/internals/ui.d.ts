/**
 * Interface to render data for UI
 * -------------------------------
 */

/**
 * User object
 */
interface User {
    uid: string;
    email: string | null;
    name: string | null;
    phoneNumber: string | null;
    image: string | null;
    isNew: boolean;
}

type UserProfile = 
    |  { type: 'patient', profile?: PatientProfile }
    |  { type: 'doctor', profile?: ConsultantProfile }

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
