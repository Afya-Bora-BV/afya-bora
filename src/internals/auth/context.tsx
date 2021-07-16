import React from "react";
import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import auth from "@react-native-firebase/auth";

/**
 * User object
 */
interface User {
	uid: string;
	name: string;
	phone: string;
	gender: "male" | "female";
	dob: string; //change to date
	height: number;
	weight: number;
	bloodGroup: string;
	residence: string;
	type: "doctor" | "patient" | "admin";
}

/**
 * Authentication store
 */

const demoUsers = [
	{
		uid: "ASa",
		name: "George Millanzi",
		phone: "+255712088775",
		gender: "Male",
		dob: "12/12/2001",
		height: 12,
		weight: 12,
		bloodGroup: "0",
		residence: "Arusha",
		type: "doctor",
	},
];

interface AuthStore {
	user:
		| undefined // User doesn't exist yet
		| User // user exist and logged in
		| null; // user logged out
	userExists: true | false;
	confirm: any;
	phone: string;
	demoUsers: User[];
	signInWithEmailAndPassword: (phone: string) => Promise<void>;
	signInWithPhoneNumber: (phoneNumber: string) => Promise<void>;
	confirmPhoneCode: (code: string) => Promise<void>;
	signOut: () => Promise<void>;
	registerUser: (data: any) => Promise<void>;
	isNewUser: (phone: string) => boolean;
	getUserDetails: (phone: string) => User | undefined;
}

const { Provider, useStore } = createContext<AuthStore>();

// method to check if the user exists in database
// the user dont login untill we make sure his details exist

const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));

const createAuthStore = () =>
	create<AuthStore>(
		persist(
			(set, get) => ({
				user: null,
				userExists: false,
				confirm: null,
				phone: "",
				demoUsers: demoUsers as User[],
				isNewUser: (phone: string) => {
					const user = get().demoUsers.filter(
						(user) => user.phone === phone
					);
					console.log("User  : ", phone);
					return Boolean(user[0]);
				},
				getUserDetails: (phone: string) => {
					const user = get().demoUsers.filter(
						(user) => user.phone === phone
					);
					console.log("User  : ", phone);
					return user[0];
				},
				registerUser: async ({ phone }) => {
					try {
						const confirmation = await auth().signInWithPhoneNumber(
							phone
						);
						set(confirmation);
					} catch (error) {
						console.log("Invalid code.");
						ToastAndroid.show(
							"Invalid confirmation code",
							ToastAndroid.LONG
						);
					}
				},

				// THINK: appropriate might be `setUser`
				signInWithEmailAndPassword: async function (phone: string) {},

				// demo signout
				signOut: async () => {
					// await auth().signOut()
					// await sleep(3000)
					set({ user: null, confirm: null, phone: "" });
				},
				// Signing in for user
				signInWithPhoneNumber: async function (phone) {
					await sleep(2000);
					// TODO: fetch name and other related information
					// create the fake user
					console.log("Phone ", phone);
					const isRegistered = get().isNewUser(phone);
					if (isRegistered) {
						// send verification code
						// const confirmation = await auth().signInWithPhoneNumber(phone);
						set({
							confirm: "1234",
							phone: phone,
						});
					} else {
						ToastAndroid.show(
							"Phone number is not registered",
							ToastAndroid.LONG
						);
					}
				},

				// confirming code
				confirmPhoneCode: async function (code) {
					// create fake person after 2 seconds
					await sleep(3000);
					try {
						if (get().confirm === code) {
							const user = get().getUserDetails(get().phone);
							set({
								user: user,
								confirm: null,
							});
						} else {
							ToastAndroid.show(
								"Invalid confirmation code",
								ToastAndroid.LONG
							);
						}

						// assuming everything went right
						// get the user with given phone number
					} catch (error) {
						console.log("Invalid code.");
						ToastAndroid.show(
							"Invalid confirmation code",
							ToastAndroid.LONG
						);
					}
				},
			}),
			{
				name: "authState",
				getStorage: () => AsyncStorage,
			}
		)
	);

interface AuthProviderProps {
	children?: React.ReactElement;
}
function AuthProvider({ children }: AuthProviderProps) {
	return <Provider createStore={createAuthStore}>{children}</Provider>;
}

export { useStore as useAuthStore, AuthProvider };
