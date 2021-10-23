import React, { useContext } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { Profile } from "../store/slices/profile";
import { ToastAndroid } from "react-native";
import { Consultant } from "../types";

const AuthContext = React.createContext<{
	currentUser: FirebaseAuthTypes.User | null;
	signIn: (tel: string) => Promise<any>;
	loadingUser: boolean;
	profile: Profile | Consultant | null;
	loadingProfile: boolean;
	signOut: () => Promise<any>;
	setProfile: (data: Profile) => void;
}>({
	currentUser: null,
	signIn: () => Promise.resolve(),
	loadingUser: false,
	loadingProfile: false,
	profile: null,
	signOut: () => Promise.resolve(),
	setProfile: () => null,
});

export function useAuth() {
	return useContext(AuthContext);
}

// TODO: This auth context depends on the presence of internet
// 1. Store the profile to the local state
// 2. do not allow app to proceed without internet being accessible
export const AuthProvider: React.FC<{}> = ({ children }) => {
	const [loadingUser, setLoadingUser] = React.useState(true);
	const [currentUser, setCurrentUser] =
		React.useState<FirebaseAuthTypes.User | null>(null);

	const [loadingProfile, setLoadingProfile] = React.useState(true);
	const [profile, setProfile] = React.useState<Profile | null>(null);

	const [loadingConsultantProfile, setLoadingConsultantProfile] =
		React.useState(true);
	const [consultantProfile, setConsultantProfile] =
		React.useState<Consultant | null>(null);

	function signIn(telephone: string) {
		return auth().signInWithPhoneNumber(telephone);
	}

	function signOut() {
		return auth().signOut();
	}

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoadingUser(false);
		});

		return () => {
			unsubscribe();
			setCurrentUser(null);
		};
	}, []);

	useEffect(() => {
		let unsubscribe: any;
		let unsubscribeConsultant: any;
		console.log("Change: ", currentUser);
		if (currentUser) {
			const email = currentUser.email;
			const phone = currentUser.phoneNumber;

			// Load patient profile
			setLoadingProfile(true);
			unsubscribe = firestore()
				.collection("patients")
				.doc(currentUser.uid)
				.onSnapshot((snap) => {
					console.log("waiting for snaps", snap.exists);

					if (snap && snap.exists) {
						const u1 = snap;

						// @ts-ignore
						setProfile({
							...u1.data(),
							id: u1.id,
						});
					} else {
						setProfile(null);
					}
					setLoadingProfile(false);
				});

			// Load Consultant profile
			setLoadingProfile(true);

			unsubscribeConsultant = firestore()
				.collection("consultants")
				.where("uid", "==", currentUser.uid)
				.onSnapshot((snap) => {
					console.log("waiting for snaps", snap.size);

					if (snap && snap.size > 0) {
						const u1 = snap.docs[0];

						setConsultantProfile({
							...u1.data(),
							id: u1.id,
						} as unknown as Consultant);
					} else {
						setConsultantProfile(null);
					}
					setLoadingConsultantProfile(false);
				});

			// ToastAndroid.show("Unknown type of user, please contect adminstration.", ToastAndroid.LONG)
		} else {
			setLoadingProfile(false);
			setLoadingConsultantProfile(false);
		}

		return () => {
			console.log("Unhooked: ", currentUser, unsubscribe);
			if (unsubscribe) {
				unsubscribe();
				unsubscribeConsultant();
			}

			setProfile(null);
			setConsultantProfile(null);
		};
	}, [currentUser]);

	const value = {
		loadingUser,
		currentUser,
		loadingProfile,
		setProfile,
		profile,
		loadingConsultantProfile,
		consultantProfile,
		signIn,
		signOut,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
