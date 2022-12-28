import React, { useContext, useEffect, useReducer } from "react";
import { Consultant, PatientProfile } from "../types";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { produce } from "immer";
import { updateDeviceMessagingToken } from "../utils";

type AuthState = {
	loading: boolean;
	profile: Consultant | PatientProfile | null;
	user: FirebaseAuthTypes.User | null;
};

type Action =
	| { type: "set-user"; payload: FirebaseAuthTypes.User }
	| { type: "remove-user" }
	| { type: "set-profile"; payload: Consultant | PatientProfile }
	| { type: "remove-profile" }
	| { type: "set-loading"; payload: boolean };

const initialState: AuthState = {
	loading: true,
	profile: null,
	user: null,
};

const AuthContext = React.createContext<AuthState>(initialState);

function reducer(state: AuthState, action: Action): AuthState {
	switch (action.type) {
		case "set-loading":
			return produce(state, (draft) => {
				draft.loading = action.payload;
			});
		case "set-user":
			return produce(state, (draft) => {
				draft.user = action.payload;
			});
		case "remove-user":
			return produce(state, (draft) => {
				draft.user = null;
				draft.profile = null;
			});
		case "set-profile":
			return produce(state, (draft) => {
				draft.profile = action.payload;
			});
		case "remove-profile":
			return produce(state, (draft) => {
				draft.profile = null;
			});
		default:
			return state;
	}
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const profileListener = async (
		user: FirebaseAuthTypes.User,
		onProfileChange: (profile: Consultant | PatientProfile | null) => void
	): Promise<() => void> => {

		const userId = user.uid;
		const userEmail = user?.email
		const idTokenResult = await user?.getIdTokenResult();
		const claims = idTokenResult?.claims


		console.log("User claims")
		console.log(JSON.stringify(claims,null,3))

		const { collectionName, type } = (userEmail)
			? { collectionName: "consultants", type: "consultant" }
			: { collectionName: "patients", type: "patient" };

		const userRef = firestore().collection(collectionName).doc(userId);

		return userRef.onSnapshot((snap) => {
			if (snap.exists) {
				const profile = {
					...snap.data(),
					id: snap.id,
					pid: snap.id,
					type,
				} as unknown as Consultant | PatientProfile;
				onProfileChange(profile);
			} else {
				onProfileChange(null);
			}
		});
	};

	useEffect(() => {
		let profileSubscription: (() => void) | null = null;
		const authListener = auth().onAuthStateChanged(
			(user: FirebaseAuthTypes.User | null) => {
				dispatch({ type: "set-loading", payload: true });
				if (user) {
					dispatch({ type: "set-user", payload: user });

					// get the profile
					profileListener(user, (profile) => {
						if (profile) {
							dispatch({ type: "set-profile", payload: profile });
						} else {
							dispatch({ type: "remove-profile" });
						}
						dispatch({ type: "set-loading", payload: false });
					})
						.then((sub) => (profileSubscription = sub))
						.catch((error) => {
							console.warn(error);
							profileSubscription = null;
						});
				} else {
					profileSubscription = null;
					dispatch({ type: "remove-user" });
					dispatch({ type: "set-loading", payload: false });
				}
			}
		);

		return () => {
			authListener();
			profileSubscription && profileSubscription();
		};
	}, []);

	// Update the users device messaging context. For notifications from firebase
	// to come to the most recent device as well.
	useEffect(() => {
		if (state.user) {
			updateDeviceMessagingToken(state.user.uid);
		}
	}, [state.user]);

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

/**
 * Authentication Hook
 */
export function useAuth() {
	if (AuthContext === undefined) {
		throw new Error("Please wrap the component in AuthProvider ");
	}
	return useContext(AuthContext);
}
