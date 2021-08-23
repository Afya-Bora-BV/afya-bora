import React, { useContext } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { Profile } from "../store/slices/profile";

const AuthContext = React.createContext<{
	currentUser: FirebaseAuthTypes.User | null;
	signIn: (tel: string) => Promise<any>;
	loadingUser: boolean;
	profile: Profile | null;
	loadingProfile: boolean;
	signOut: () => Promise<any>;
}>({
	currentUser: null,
	signIn: () => Promise.resolve(),
	loadingUser: false,
	loadingProfile: false,
	profile: null,
	signOut: () => Promise.resolve(),
});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [loadingUser, setLoadingUser] = React.useState(true);
	const [currentUser, setCurrentUser] =
		React.useState<FirebaseAuthTypes.User | null>(null);

	const [loadingProfile, setLoadingProfile] = React.useState(true);
	const [profile, setProfile] = React.useState<Profile | null>(null);

	function signIn(telephone: string) {
		return auth().signInWithPhoneNumber(telephone);
	}

	function signOut() {
		return auth().signOut();
	}

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((user) => {
			// if (user) {
			// setLoadingProfile(true);
			// }
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
		console.log("Change: ", currentUser);
		if (currentUser) {
			setLoadingProfile(true);
			console.log("CurrentUser: ", currentUser);

			unsubscribe = firestore()
				.collection("patients")
				.where("uid", "==", currentUser.uid)
				.onSnapshot((snap) => {
					console.log("waiting for snaps", snap.size);

					if (snap && snap.size > 0) {
						const u1 = snap.docs[0];

						// @ts-ignore
						setProfile({ ...u1.data(), id: u1.id });
					} else {
						setProfile(null);
					}
					setLoadingProfile(false);
				});
		} else {
			setLoadingProfile(false);
		}

		return () => {
			console.log("Unhooked: ", currentUser, unsubscribe);
			if (unsubscribe) {
				unsubscribe();
			}

			setProfile(null);
		};
	}, [currentUser]);

	const value = {
		loadingUser,
		currentUser,
		loadingProfile,
		profile,
		signIn,
		signOut,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
