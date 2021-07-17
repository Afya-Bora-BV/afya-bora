import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import createABSyleTabNavigator from "../../components/Tab/createNavigator";

export const Tab = createBottomTabNavigator();
// const Tab = createABSyleTabNavigator();

export const TabNavKey = {
	HomeView: "Home",
	ScheduleView: "Schedule",
	Profile: "ProfileMain",
};
