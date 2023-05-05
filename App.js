import React, { useState } from "react";
import "react-native-gesture-handler";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import ExerciseSetScreen from "./app/screens/ExerciseSetScreen";
import SharedVariableContext from "./SharedVariableContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SetData from "./app/screens/SetData";
import SetDataTable from "./app/screens/SetDataTable";

import ProgressData from "./app/screens/ProgressData";
import ProgressGraph from "./app/screens/ProgressGraph";

const HomeStack = createStackNavigator();
const SetDataStack = createStackNavigator();
const ProgressStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	const [exercises, setExercise] = useState([
		{
			id: 1,
			name: "Push ups",
			set: [
				{ id: 1, weight: 35, reps: 12, date: "2023-05-02" },
				{ id: 2, weight: 45, reps: 10, date: "2023-05-02" },
				{ id: 3, weight: 55, reps: 8, date: "2023-05-02" },
			],
			volume: [{ id: 1, volume: 330, date: "2023-05-02" }],
		},
		{ id: 2, name: "Sit ups", set: [], volume: [] },
		{ id: 3, name: "Bench Press", set: [], volume: [] },
		{ id: 4, name: "Squat", set: [], volume: [] },
		{ id: 5, name: "Deadlift", set: [], volume: [] },
		{ id: 6, name: "Pull ups", set: [], volume: [] },
		{ id: 7, name: "Lat Pulldown", set: [], volume: [] },
		{ id: 8, name: "Cable Rows", set: [], volume: [] },
		{ id: 9, name: "Bicep Curl", set: [], volume: [] },
		{ id: 10, name: "Tricep Extenstion", set: [], volume: [] },
		{ id: 11, name: "Dips", set: [], volume: [] },
		{ id: 12, name: "Plank", set: [], volume: [] },
		{ id: 13, name: "Lunge", set: [], volume: [] },
		{ id: 14, name: "Leg Extention", set: [], volume: [] },
		{ id: 15, name: "Leg Curl", set: [], volume: [] },
		{ id: 16, name: "Romanian Deadlift", set: [], volume: [] },
		{ id: 17, name: "Calf Rais", set: [], volume: [] },
		{ id: 18, name: "Leg press", set: [], volume: [] },
		{ id: 19, name: "Incline Bench Press", set: [], volume: [] },
		{ id: 20, name: "Cable crossovers", set: [], volume: [] },
		{ id: 21, name: "Cable Fly", set: [], volume: [] },
		{ id: 22, name: "Face Pull", set: [], volume: [] },
		{ id: 23, name: "Rear Delt Fly", set: [], volume: [] },
		{ id: 24, name: "Shoulder Press", set: [], volume: [] },
		{ id: 25, name: "Lateral Raises", set: [], volume: [] },
		{ id: 26, name: "Back Extension", set: [], volume: [] },
		{ id: 27, name: "Hip Thrust", set: [], volume: [] },
		{ id: 28, name: "Glute Kickbak", set: [], volume: [] },
		{ id: 29, name: "Split Squat", set: [], volume: [] },
		{ id: 30, name: "Hammer Curl", set: [], volume: [] },
		{ id: 31, name: "Overhead Tricep Extention", set: [], volume: [] },
	]);
	const addSetToExercise = (exercises, exerciseId, newSet) => {
		// Find the index of the exercise with the given ID
		const exerciseIndex = exercises.findIndex(
			(exercise) => exercise.id === exerciseId
		);
		// If the exercise is not found, return the original exercises array
		if (exerciseIndex === -1) return exercises;
		// Get the last set's ID
		const lastSetId =
			exercises[exerciseIndex].set.length > 0
				? exercises[exerciseIndex].set[exercises[exerciseIndex].set.length - 1]
						.id
				: 0;
		// Update the new set's IDs
		const updatedNewSet = newSet.map((set, index) => ({
			...set,
			id: lastSetId + index + 1,
		}));

		// Create a new exercises array with the updated set
		const updatedExercises = exercises.map((exercise, index) =>
			index === exerciseIndex
				? { ...exercise, set: [...exercise.set, ...updatedNewSet] }
				: exercise
		);

		return setExercise(updatedExercises);
	};

	const addVolume = (exercises, exerciseId, newVolume) => {
		const volumeIndex = exercises.findIndex(
			(exercise) => exerciseId === exercise.id
		);

		if (volumeIndex === -1) return -1;

		const lastVolumeID =
			exercises[volumeIndex].volume.length > 0
				? exercises[volumeIndex].volume[
						exercises[volumeIndex].volume.length - 1
				  ].id
				: 0;
		const updatedVolume = newVolume.map((volume, index) => ({
			...volume,
			id: lastVolumeID + index + 1,
		}));

		const updatedVolumeArray = exercises.map((exercise, index) =>
			index === volumeIndex
				? { ...exercise, volume: [...exercise.volume, ...updatedVolume] }
				: exercise
		);

		return setExercise(updatedVolumeArray);
	};

	const sharedVariable = {
		exercises: exercises,
		setExercise: setExercise,
		addSetToExercise: addSetToExercise,
		addVolume: addVolume,
		// You can add more variables or functions here
	};
	function HomeStackScreen() {
		return (
			<HomeStack.Navigator>
				<HomeStack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						headerShown: false,
					}}
				/>
				<HomeStack.Screen name="SetList" component={ExerciseSetScreen} />
			</HomeStack.Navigator>
		);
	}
	function SetDataStackScreen() {
		return (
			<SetDataStack.Navigator>
				<SetDataStack.Screen
					name="Set Data"
					component={SetData}
					options={{
						headerShown: false,
					}}
				/>
				<SetDataStack.Screen
					name="SetDataTable"
					component={SetDataTable}
				></SetDataStack.Screen>
			</SetDataStack.Navigator>
		);
	}
	function ProgressDataScreen() {
		return (
			<ProgressStack.Navigator>
				<ProgressStack.Screen
					name="Progress Chart"
					component={ProgressData}
					options={{
						headerShown: false,
					}}
				></ProgressStack.Screen>
				<ProgressStack.Screen
					name="Progress Graph"
					component={ProgressGraph}
				></ProgressStack.Screen>
			</ProgressStack.Navigator>
		);
	}

	return (
		<SharedVariableContext.Provider value={sharedVariable}>
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen
						name="Home"
						component={HomeStackScreen}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<MaterialIcons name="home" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Set Data"
						component={SetDataStackScreen}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<MaterialIcons name="list" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Progress Chart"
						component={ProgressDataScreen}
						options={{
							headerShown: false,
							tabBarIcon: ({ color, size }) => (
								<AntDesign name="areachart" color={color} size={size} />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</SharedVariableContext.Provider>
	);
}
