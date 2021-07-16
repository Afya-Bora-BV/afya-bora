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

// type UserStatus = 
//     | null      // Setting user status
//     | "new"     // user is new; doesn't have profile
